import { View, Text,Image } from 'react-native'
import React from 'react'

const Card = (props) => {
    console.log(props.image)
  return (
    <View style={{display:'flex',flexDirection:'row'}}>
     <Image source={{uri:props.image}}/>
      <Text>19F-0154</Text>
    </View>
  )
}

export default Card