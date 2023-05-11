import { View, Text,Image } from 'react-native'
import React from 'react'

const Card = (props) => {
  return (
    <View style={{display:'flex',flex:1,flexDirection:'row',justifyContent:"space-between",width:400,alignItems:"center",backgroundColor:"white",height:150,padding:4,borderRadius:10,marginBottom:10}}>
     <Image source={{uri:props.image}} style={{width:150, height:130,borderRadius:10}} resizeMode="contain"/>
     <Text style={{flex:1,marginLeft:100,fontWeight:"bold"}}>19F-0154</Text>
    </View>
  )
}

export default Card