import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Platform } from "react-native";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from 'expo-image-picker';

import fieldValidationSchema from '../schemas/register'
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../components/AuthContext";

type FormDataType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
};


const Register : React.FC = ({navigation} : any) => {
  const { handleSubmit, register, setValue, formState: { errors } } = useForm<FormDataType>({resolver: yupResolver(fieldValidationSchema)});
  const emailInput = useRef<any>();
  const passwordInput = useRef<any>();
  const password_confirmationInput = useRef<any>();
  const phoneInput = useRef<any>();
  const [image, setImage] = useState({} as any);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1,1],
    });
    if (!result.cancelled) {
      setImage(result);
    }
  }
  const { signUp } = useAuth()

  const onSubmit = async (object: FormDataType) => {
    if(image){
      const data = getFormData(object)
      let uriParts = image.uri.split('.');
      let fileType = uriParts[uriParts.length - 1];
      data.append('photo', {uri: image.uri, name: `image.${fileType}`, type: `image/${fileType}` } as any)
      signUp(data, navigation)
    }

  };

  useEffect(()=>{
    register('password')
    register('email')
    register('password_confirmation')
    register('name')
    register('phone')
  },[register])

  return (
    <ScrollView style={[styles.container]} >
      <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView style={styles.formContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Crie sua conta</Text>
        </View>
        <View style={styles.inputsContainer}>
        <Input         
            label={'Nome Completo'}
            autoCapitalize='words'
            placeholder={'Digite seu nome completo'}
            error={errors?.name}
            onChangeText={(text: string) => setValue('name', text)}
            containerStyle={{marginBottom: 40}}
            blurOnSubmit={false}
            onSubmitEditing={() => { if(emailInput) emailInput?.current?.focus() }}
            returnKeyType="next"
          />
          <Input         
            label={'Email'}
            autoCapitalize='none'
            placeholder={'Digite seu email'}
            error={errors?.email}
            onChangeText={(text: string) => setValue('email', text)}
            containerStyle={{marginBottom: 40}}
            blurOnSubmit={false}
            onSubmitEditing={() => { if(passwordInput) passwordInput?.current?.focus() }}
            ref={emailInput as any}
            returnKeyType="next"
          />
          <Input         
            label={'Senha'}
            secureTextEntry
            autoCapitalize='none'
            placeholder={'Digite seu sua senha'}
            error={errors?.password}
            onChangeText={(text: string) => setValue('password', text)}
            containerStyle={{marginBottom: 40}}
            blurOnSubmit={false}
            onSubmitEditing={() => { if(password_confirmationInput) password_confirmationInput?.current?.focus() }}
            ref={passwordInput as any}
            returnKeyType="next"
          />
          <Input         
            secureTextEntry
            label={'Confirme sua senha'}
            autoCapitalize='none'
            placeholder={'Digite sua senha novamente'}
            onChangeText={(text: string) => setValue('password_confirmation', text)}
            containerStyle={{marginBottom: 40}}
            blurOnSubmit={false}
            onSubmitEditing={() => { if(phoneInput) phoneInput?.current?.focus() }}
            ref={password_confirmationInput as any}
            returnKeyType="next"
          />
            <Input        
            label={'Telefone'}
            blurOnSubmit={false}
            error={errors?.phone}
            placeholder={'Digite seu numero de telefone'}
            onSubmitEditing={handleSubmit(onSubmit)}
            onChangeText={(text: string) => setValue('phone', text)}
            returnKeyType="send"
            ref={phoneInput as any}
          />
          <Button
            title="Selecione sua foto"
            onPress={pickImage}
            style={{marginBottom: 20}}
          />
          {image ?
            <Image source={{ uri: image.uri }} style={{ width: 200, height: 200, borderRadius: 100 }} /> : <></>}
        </View>

        
      </KeyboardAvoidingView>
      
      </SafeAreaView>
      <View style={{marginTop: 20, width:'100%', alignItems: 'center', marginBottom: 30}}>
        <Button title="Enviar" onPress={handleSubmit(onSubmit)} style={{width: '80%', marginTop: 0}}/>
        <TouchableOpacity onPress={()=>{navigation.replace('Login')}} style={{width:'80%', marginTop: 20}}><Text style={{textAlign:'center', color:'#ccc'}}>Já tenho uma conta</Text></TouchableOpacity>
      </View>
    </ScrollView>
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
export default Register

function getFormData(object: any) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}