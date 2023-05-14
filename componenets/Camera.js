import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform,ScrollView, TouchableOpacity,Text,StyleSheet } from 'react-native';
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
  console.log(result)
    // Convert to blob
    // const response = await fetch(result.assets[0].uri);
    // const blob = await response.blob();
    if (!result.canceled) {

          setImage([...image,result.assets[0].uri]);
          props.PreviewImage([...image,result.assets[0].uri])
    }

    
  }
  return (
<View style={styles.container}>
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
    marginBottom: 20,
    color: "gray",
    fontSize: 16,
  },
  buttonsContainer: {
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
