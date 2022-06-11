import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: `http://168.138.143.251:3333/api`
})
api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  if(error.response.status === 401){
    AsyncStorage.clear()
  }
  if(error.response.status === 403){
    //ADMIN ONLY
  }
  return Promise.reject(error);
});

export async function signIn ({email , password} : {email: string, password: string}) {
  try{
    const { data } = await api.post('/login', {
      email,
      password
    })
    return data;
  }catch(e){
    console.log(e)
  }

}

export async function signUp(data:any) {
  try{
    const { data: res } = await api.post('/register', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return res;
  }catch(e : any){
    console.log(e.response)
  }
}

export async function signOut() {
  try{
    await api.post('/logout')
  }catch(e){
    console.log(e);
  }
}

export async function getOccupations() {
  try{
    const { data } = await api.get('/occupation')
    return data;
  }catch(e){
    console.log(e)
  }
}

export async function getOccupation(id:number) {
  try {
    const { data } = await api.get(`/occupation/${id}`)
    console.log(data)
    return data;
  } catch (e) {
    
  }
}

export async function getMe() {
  try {
    const { data } = await api.get(`/me`)
    console.log(data)
    return data;
  } catch (e) {
    console.log(e)
  }
}

export default api;