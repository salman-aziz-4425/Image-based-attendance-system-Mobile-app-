import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform,ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { API, Amplify, graphqlOperation } from "aws-amplify";
export default function ImagePickerExample(props) {
  const [image, setImage] = useState([]);
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
        <Image source={{uri:img}} style={{width:400, height:400,borderRadius:20}} resizeMode="cover" />
      )):<Image source={require("../assets/images/camera.png")}  style={{width:350, height:150,borderRadius:10,marginTop:30}} resizeMode="contain" />
    }
      </ScrollView >
      <View style={{display:'flex',flexDirection:"row",justifyContent:"space-between"}}>
      <Button title="Upload" onPress={pickImage} />
      <Button title="Discard" onPress={()=>setImage([])} />
      </View>
    </View>
  );
}
