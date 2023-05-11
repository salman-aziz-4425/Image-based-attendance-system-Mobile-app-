import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform,ScrollView, TouchableOpacity,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { API, Amplify, graphqlOperation } from "aws-amplify";
import {useSelector} from 'react-redux'
export default function ImagePickerExample(props) {
  const [image, setImage] = useState([]);
  let Token=useSelector(state=>state.userReducer.token)
  Amplify.configure({
    API: {
      graphql_headers: async () => ({
        token:Token,
      }),
    },
  });
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {

      setImage([...image,result.assets[0].uri]);
      props.PreviewImage([...image,result.assets[0].uri])
    }
  };

  return (
    <View style={{display:"flex",flex:1,alignItems: 'center',justifyContent:"space-between"}}>
       <ScrollView  horizontal>
      {image.length>0? image.map((img)=>(
        <Image source={{uri:img}} style={{width:400, height:260}} resizeMode="cover" />
      )):<Image source={require("../assets/images/attendance3.jpeg")}  style={{width:400, height:300,borderRadius:10,marginTop:-43}} resizeMode="contain" />
    }
      </ScrollView >
      <Text style={{marginBottom:20,color:"gray"}}>Add or Delete Photo</Text>
      <View style={{display:'flex',flexDirection:"row",justifyContent:"space-between",marginTop:40}}>

        <TouchableOpacity onPress={pickImage}>
        <Image source={require("../assets/images/plus.png")} style={{width:40, height:40,borderRadius:10,right:30}}/>
        </TouchableOpacity>
      {/* <Button title="Upload" onPress={pickImage} /> */}
      <TouchableOpacity onPress={()=>setImage([])}>
        <Image source={require("../assets/images/minus.png")} style={{width:40, height:40,borderRadius:10,left:30}}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}
