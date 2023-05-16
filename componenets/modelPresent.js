import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import Card from './card'
import { ScrollView } from 'react-native-gesture-handler'

const ModelPresent = () => 
{
  let array=useRoute()
  console.log(array.params.present)
  return 
  (
    <>
      <View style={styles.header}>
      <Text style={styles.title}>Students</Text>
    </View>
      {
        <ScrollView>
          {
  array.params.users.map((user)=>{
    if(array.params.present.length>0){
      const index = array.params.present.findIndex(
        (pUser) => user?.rollNumber == pUser.rollNumber
      );
      if(index!=-1){
        return(
          <View style={{backgroundColor:"green"}}>
              <Card name={user.name} image={user.image} RollNo={user.rollNumber} />
            </View>
        )
      }
      else{
        return(
          <View style={{backgroundColor:"red"}}>
          <Card name={user.name} image={user.image} RollNo={user.rollNumber} />
        </View>
        )
      }
    }
    else{
      return(
        <Card name={user.name} image={user.image} RollNo={user.rollNumber} />
      )
    }
})
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
