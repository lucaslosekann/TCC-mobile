import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as api from "../services/api";

const Occupation : React.FC = ({ route, navigation } : any) => {
  const { id } = route.params;
  const [services, setServices] = useState([]);
  const [occupation, setOccupation] = useState({} as any);
  useEffect(()=>{
    const fetchOccupation = async () => {
      const { services, ...occupation} = await api.getOccupation(id)
      setServices(services)
      setOccupation(occupation)
    } 
    fetchOccupation()
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.serachContainer}>
        <Text style={styles.searchText}> PESQUISAR </Text>
        <TextInput style={styles.searchInput}/>
      </View>
      <View style={styles.servicesContainer}>
        {
          services.map((v : any, i) => (
            <TouchableOpacity
            onPress={()=>navigation.navigate('Service', {id: v.id})}
            style={styles.service} key={v.id}>
              <Image source={v.worker.user.userPhoto?.signed_url ? {uri: v.worker.user.userPhoto?.signed_url} : require('../assets/placeholder.png')} style={styles.workerImg} resizeMethod='resize'/>
              <Text style={styles.serviceText}>{v.worker.user.name}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
  },
  searchText:{
    fontFamily: 'Nunito_600SemiBold',
    color: '#fff',
    fontSize: 18
  },
  serachContainer: {
    marginTop: -10,
    alignItems: 'center'
  },
  searchInput: {
    width:'90%',
    height: 30,
    borderRadius: 6,
    marginTop: 10,
    backgroundColor: '#e3e3e3',
    paddingHorizontal: 5
  },
  servicesContainer: {
    marginTop: 30,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  service:{
    width: '29%',
    marginBottom: 20,
    height: 100
  },
  workerImg: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',

  },
  serviceText: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  }
});
export default Occupation