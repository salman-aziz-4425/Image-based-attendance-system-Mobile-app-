import { View, Text } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

const Loading = () => 
{
  return 
  (
    <View>
          <Animatable.Image
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={{height:40,width:50,backgroundColor:"white",marginTop:20}}
        className="h-10"
        source={require('../assets/animation-loader.gif')}
      />
    </View> 
  )
}

export default Loading