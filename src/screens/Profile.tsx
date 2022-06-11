import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../components/AuthContext";
import * as api from '../services/api'

const Profile : React.FC = () => {
  const { signOut, user } = useAuth()
  const [usera, setUser] = useState({});
  useEffect(()=>{
    async function fetchMe() {
      const res = await api.getMe();
      setUser(res)
      console.log('user',user?.email)
    }
    fetchMe()
  },[user])
  return (
    <SafeAreaView>
      <Button
        title="Logout"
        onPress={() => signOut()}
      />
    </SafeAreaView>
  );

}
export default Profile