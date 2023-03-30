import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const modelPresent = () => {
    console.log(useRoute())
  return (
    <View>
      <Text>modelPresent</Text>
    </View>
  )
}

export default modelPresent