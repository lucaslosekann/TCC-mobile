import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from './components/AuthContext'

import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import UnloggedProfile from "./screens/UnloggedProfile";
import Service from "./screens/Service";
import Chat from "./screens/Chat";
import Occupation from "./screens/Occupation";


        
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const Routes = () => {

  const { loading } = useAuth();
  if(loading){
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={"large"} color="#666"/>
      </View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = "person";

              if (route.name === 'HomeTab') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'ProfileTab') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName as 'person'} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#e3e3e3',
            tabBarActiveBackgroundColor: '#FA9032',
            tabBarInactiveBackgroundColor: '#FA9032',
            
          })}
        >
          <Tabs.Screen name="HomeTab" component={HomeTab} options={{headerShown: false, title: "Inicial"}}/>
          <Tabs.Screen name="ProfileTab" component={ProfileTab} options={{headerShown: false, title: "Perfil"}}/>
        </Tabs.Navigator>
        <StatusBar style="auto"/>
      </NavigationContainer>
    </View>
  );
};



const HomeTab : React.FC = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#303030'}}>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#262626',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Service" component={Service} options={{headerShown: false}}/>
        <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
        <Stack.Screen name="Occupation" component={Occupation} options={({ route } : any) => ({ title: route.params.name })}/>
      </Stack.Navigator>
    </View>
  )
}

const ProfileTab : React.FC = () => {
    const { user } = useAuth();
    return (
      <View style={{flex: 1, backgroundColor: '#303030'}}>
        <Stack.Navigator initialRouteName="Profile"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#262626',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            animation:"default"
          }}
        >
          <Stack.Screen name="UnloggedProfile" component={UnloggedProfile} options={{headerShown: false}}/>
          <Stack.Screen name="Profile" component={!!user ? Profile : UnloggedProfile} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} options={{title: 'Entrar'}}/>
          <Stack.Screen name="Register" component={Register} options={{title: 'Registro'}}/>
        </Stack.Navigator>
      </View>
  )
}

export default Routes;