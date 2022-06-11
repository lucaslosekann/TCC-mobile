import React from "react";
import { useContext } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../components/AuthContext";

const UnloggedProfile : React.FC = ({navigation} : any) => {
  const { signIn } = useAuth()
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/logo.png')} style={{width: '100%', marginTop: '60%', marginBottom: 50}}/>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>ENTRE EM SUA CONTA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>CRIE SUA CONTA</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#FA9032',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    width: '80%',
    borderRadius: 6,
    marginTop: 26
  },
  buttonText: {
    color: "#fff",
    fontFamily: 'Nunito_700Bold',
    letterSpacing: 1
  },
  buttonsContainer: {
    flex: 1
  }
});
export default UnloggedProfile