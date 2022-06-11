import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as api from "../services/api";

const Home : React.FC = ({ navigation } : any) => {
  const [occupations, setOccupations] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  useEffect(()=>{
    api.getOccupations().then((data)=>setOccupations(data))
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.serachContainer}>
        <Text style={styles.searchText}> PESQUISAR </Text>
        <TextInput style={styles.searchInput} value={searchValue} onChangeText={setSearchValue}/>
      </View>
      <View style={styles.occupationsContainer}>
        {
          occupations.filter(({name}: {name: string})  => name.match(new RegExp(searchValue, "i"))).map((v : any, i) => (
            <TouchableOpacity
            onPress={()=>navigation.navigate('Occupation', {id: v.id, name: v.name})}
            style={styles.occupation} key={v.id}>
              <Image source={require('../assets/placeholder.png')} style={styles.occupationImg} resizeMethod='resize'/>
              <Text style={styles.occupationText}>{v.name}</Text>
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
    fontSize: 16
  },
  serachContainer: {
    marginTop: 10,
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
  occupationsContainer: {
    marginTop: 30,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  occupation:{
    width: '29%',
    marginBottom: 20,
    height: 100
  },
  occupationImg: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',

  },
  occupationText: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  }
});
export default Home