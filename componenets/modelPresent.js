import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import Card from './card'

const ModelPresent = () => {
  let array=useRoute()
  return (
    <>
      {
        array.params.map((user)=>(
          <Card image={user.image} RollNo={user.rollNumber}/>
        ))
      }
    </>
  )
}

export default ModelPresent