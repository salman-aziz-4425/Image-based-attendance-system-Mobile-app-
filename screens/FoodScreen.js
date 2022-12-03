import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet,Text, TouchableOpacity } from 'react-native';
import {  View } from 'react-native';
import FoodSearch from '../componenets/FoodSearch'
import BarSearch from '../componenets/BarcodeScreen'
import { useState } from 'react';
export default function App() {
  const [flag,setflag]=useState(false)
    return (
      <>
      <View style={styles.container}>
      <View style={styles.nav}>
          <ButtonText flag={true} text="By Search" colorFlag={flag} activeFlag={setflag}/>
          <ButtonText flag={false} text="By Barcode" colorFlag={!flag} activeFlag={setflag}/>
        </View>
        {flag?<FoodSearch/>:<BarSearch/>}
      </View>
      </>
    )
}
const ButtonText=(props)=>{
  return(
  <TouchableOpacity style={{
    backgroundColor:props.colorFlag?"black":"white",
    borderRadius:20,
    padding:10,
  }} onPress={()=>props.activeFlag(props.flag)}>
       <Text style={{color:props.colorFlag?"white":"black"}}>{props.text}</Text>
  </TouchableOpacity>)
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav:{
    backgroundColor: '#fff',
    marginTop:60,
    display:"flex",
    flexDirection:"row",

  }
})