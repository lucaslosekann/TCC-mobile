import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yupResolver } from "@hookform/resolvers/yup";

import fieldValidationSchema from '../schemas/login'
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../components/AuthContext";

type FormData = {
  email: string;
  password: string;
};


const Login : React.FC = ({navigation} : any) => {
  const { handleSubmit, register, setValue, formState: { errors } } = useForm<FormData>({resolver: yupResolver(fieldValidationSchema)});
  const secInput = useRef<any>();
  const { signIn } = useAuth()

  const onSubmit = (data: FormData) => {
    signIn(data, navigation)
  };

  useEffect(()=>{
    register('password')
    register('email')
  },[register])

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView style={styles.formContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Olá,</Text>
          <Text style={styles.welcomeText}>Bem vindo(a) de volta</Text>
        </View>
        <View style={styles.inputsContainer}>

          <Input         
            label={'Email'}
            autoCapitalize='none'
            placeholder={'Digite seu email'}
            error={errors?.email}
            onChangeText={(text: string) => setValue('email', text)}
            containerStyle={{marginBottom: 70}}
            blurOnSubmit={false}
            onSubmitEditing={() => { if(secInput) secInput?.current?.focus() }}
            returnKeyType="next"
          />
            <Input        
            secureTextEntry
            label={'Senha'}
            blurOnSubmit={false}
            error={errors?.password}
            placeholder={'Digite sua senha'}
            onSubmitEditing={handleSubmit(onSubmit)}
            onChangeText={(text: string) => setValue('password', text)}
            returnKeyType="send"
            ref={secInput as any}
          />
            <TouchableOpacity style={{width:'80%'}}><Text style={{textAlign:'right', color:'#ccc'}}>Esqueceu a senha?</Text></TouchableOpacity>
        </View>

          
          
        <Button title="Enviar" onPress={handleSubmit(onSubmit)} style={{width: '80%', marginTop: 0}}/>
        <TouchableOpacity onPress={()=>{navigation.replace('Register')}} style={{width:'80%', marginTop: 20}}><Text style={{textAlign:'center', color:'#ccc'}}>Criar Conta</Text></TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    textDecorationColor: '#fff'
  },
  welcomeContainer:{
    width: '80%',
    paddingBottom: 12,
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Nunito_800ExtraBold'
  },
  formContainer: {
    alignItems: 'center',
    marginTop: 0
  },
  inputsContainer: {
    marginTop: 30,
    width: '100%',
    height:'58%',
    alignItems: 'center',
  }
});
export default Login
