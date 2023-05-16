import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform,ScrollView, TouchableOpacity,Text,StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { API, Amplify, graphqlOperation } from "aws-amplify";
import {useSelector} from 'react-redux'
import { analyzeImage } from '../src/graphql/queries';
import {storeImageToS3Bucket} from './utils'
import Loading2 from './loading2'
export default function ImagePickerExample(props) {
  const [image, setImage] = useState([]);
  const [process,setProcess]=useState(false)
  const [operation,setOperation]=useState("")
  let Token=useSelector(state=>state.userReducer.token)
  Amplify.configure({
    API: {
      graphql_headers: async () => ({
        token:Token,
      }),
    },
  });
  const hello=()=>{
    console.log("hello")
  }
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  setOperation("Uploading image")
  setProcess(true)
  const imageKey = await storeImageToS3Bucket(result.assets[0].uri);
  console.log("Image key  " + imageKey);
  if (imageKey === undefined) {
    setProcess(false)
    alert("Key not found")
    return;
  }
  const variable1={
      rollNumber:"19F-0295",
      imageS3Key:imageKey
  }
  try{
  const response= await API.graphql(graphqlOperation(analyzeImage,variable1))
  console.log(response)
  if(!response.data?.analyzeImage?.faceConf){
    setProcess(false)
    throw new Error
  }
}catch{
  alert("In picture it is not a human")
  setProcess(false)
  return
}
    if (!result.canceled) {

          setImage([...image,result.assets[0].uri]);
          props.PreviewImage([...image,result.assets[0].uri])
    }
    setProcess(false)
  }
  return (
<View style={styles.container}>
  {
    process&&<Loading2 text={operation}/>
  }
  <ScrollView horizontal>
    {image.length > 0 ? (
      image.map((img, index) => (
        <Image key={index} source={{ uri: img }} style={styles.placeholderImage} resizeMode="cover" />
      ))
    ) : (
      <Image source={require("../assets/images/attendance3.jpeg")} style={styles.placeholderImage} resizeMode="contain" />
    )}
  </ScrollView>
  <Text style={styles.addDeleteText}>Add or Delete Photos</Text>
  <View style={styles.buttonsContainer}>
    <TouchableOpacity onPress={pickImage} style={styles.button}>
      <Image source={require("../assets/images/plus.png")} style={styles.buttonIcon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setImage([])} style={styles.button} >
      <Image source={require("../assets/images/minus.png")} style={styles.buttonIcon} />
    </TouchableOpacity>
  </View>
  
</View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  image: {
    width:500,
    height: 260,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  placeholderImage: {
    width: 400,
    height: 300,
    borderRadius: 10,
  },
  addDeleteText: {
    top:-50,
    color: "gray",
    fontSize: 16,
  },
  buttonsContainer: {
    top:-30,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  button: {
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
});
