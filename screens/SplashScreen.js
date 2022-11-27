import { View, Text,Image } from 'react-native'
import React from 'react'
import {useEffect } from 'react';
import {useNavigation} from "@react-navigation/native"
const SplashScreen = () => {
  const navigation=useNavigation()
  useEffect(()=>{
    console.log("hello")
    setTimeout(()=>{
      navigation.navigate('Home')
  },5000)
  },[])
  return (
    <View>
      <Image
      source={require("../assets/images/WTLogo.png")}
      style={{height:"100%",width:"100%",resizeMode:"contain"}}></Image>
    </View>
  )
}

export default SplashScreen