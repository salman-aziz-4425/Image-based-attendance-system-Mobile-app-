import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import Card from './card'
import { ScrollView } from 'react-native-gesture-handler'

const ModelPresent = () => {
  let array=useRoute()
  console.log(array)
  return (
    <>
      <View style={styles.header}>
      <Text style={styles.title}>Students</Text>
    </View>
      {
        <ScrollView>
          {
  array.params.map((user)=>(
    <Card name={user.name} image={user.image} RollNo={user.rollNumber} />
  ))
          }
        </ScrollView>
      
      }
    </>
  )
}

export default ModelPresent

const styles = StyleSheet.create({
  
  header: {
    backgroundColor: '#f2f2f2',
    padding:10,
    borderBottomWidth: 1,
    marginTop:20,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});
