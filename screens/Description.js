import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import {useRoute} from "@react-navigation/native"
const Description = () => {
  const {
    params:{
     nutrientName,
     nutrientNumber,
     unitName
    }
  }=useRoute()
  return (
    <View style={styles.container}>
      <Text>{nutrientName}</Text>
      <Text>{nutrientNumber}{unitName}</Text>
    </View>
  )
}

export default Description

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
