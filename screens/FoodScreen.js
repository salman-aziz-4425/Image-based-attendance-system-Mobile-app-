import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native';
import { useState,useEffect } from 'react';
import {useNavigation} from "@react-navigation/native"
import axios from 'axios';
export default function App() {
  const navigation=useNavigation()
  const [Alergy,setAlergy]=useState("")
  const [Food,setFood]=useState("")
  const submitHandler=()=>{
    let ObjInfo=[]
    const Url="https://api.nal.usda.gov/fdc/v1/foods/search?query="+Food.trim()+"&api_key=8G7WyBMHZdVwcbCb4QACt4dyFUZdAFrtmfO0wDhf"
    axios.get(Url).then((result)=>{
        ObjInfo=result.data.foods[0].foodNutrients
        ObjInfo=ObjInfo.filter((obj)=>{
            return obj.nutrientName.includes(Alergy.trim())
        })
        navigation.navigate('Description',ObjInfo[0])
    }).catch((error)=>{
        console.log(error)
    })
  }
  const alergyHandler=(props)=>{
    setAlergy(props)
  }
  const foodHandler=(props)=>{
    setFood(props)
  }
  return (

    <View style={styles.container}>
      <Text>By Searching</Text>
      <TextInput
        style={styles.input}
        onChangeText={(Text)=>alergyHandler(Text)}
        placeholder="Enter Alergy"
        keyboardType="text"
      />
        <TextInput
        style={styles.input}
        onChangeText={(Text)=>foodHandler(Text)}
        placeholder="Enter Food name"
        keyboardType="text"
      />
      <TouchableOpacity style={styles.button} onPress={submitHandler}>
        <Text style={{color:"white",fontWeight:"bold"}}>Find</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button:{
    backgroundColor:"black",
    color:"white",
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:20
  }
});
