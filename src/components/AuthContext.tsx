import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../services/api';

interface User {
  name: string,
  id: number, 
  email: string,
  phone: string,
  remember_me_token: string | null,
  is_admin: boolean,
  created_at: string,
  updated_at: string,
  is_worker: boolean
}

interface AuthContextData {
  signed: boolean,
  user: User | null,
  loading: boolean,
  signIn(data: {email: string, password: string}, navigation: any): Promise<void>,
  signUp(data: any, navigation: any): Promise<void>,
  signOut(): Promise<void>
}


const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider : React.FC = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    async function loadStorageData() {
      const [storagedUser, storagedToken] = await AsyncStorage.multiGet(['@Jubhub:user', '@Jubhub:token'])
      console.log(storagedUser[1], storagedToken[1])
      if(storagedUser[1] && storagedToken[1]){
        setUser(JSON.parse(storagedUser[1]))
        api.default.defaults.headers.common['Authorization'] = `Bearer ${storagedToken[1]}`
      }
      setLoading(false);
    }
    loadStorageData();
  },[])

  async function signIn(data : {email: string, password: string}, navigation : any) {
    const response = await api.signIn(data);
    setUser(response.user);
    console.log('USER', response.user)
    api.default.defaults.headers.common['Authorization'] = `Bearer ${response.token}`
    try{
      await AsyncStorage.setItem('@Jubhub:user', JSON.stringify(response.user))
      await AsyncStorage.setItem('@Jubhub:token', response.token)
    }catch(e){
      console.log(e);
    }
    navigation.goBack();
  }
  async function signUp(data:any, navigation: any) {
    const response = await api.signUp(data);
    setUser(response.user);
    api.default.defaults.headers.common['Authorization'] = `Bearer ${response.token}`
    await AsyncStorage.setItem('@Jubhub:user', JSON.stringify(response.user))
    await AsyncStorage.setItem('@Jubhub:token', JSON.stringify(response.token))
    navigation.goBack();
  }

  async function signOut() {
    await api.signOut();
    AsyncStorage.clear().then(()=>{
      setUser(null);
    })
  }

  return (
    <AuthContext.Provider value={
      {
        signed: !!user, 
        user,
        signIn,
        signUp,
        signOut,
        loading
      }
    }>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth(){
  const context = useContext(AuthContext);
  return context;
};