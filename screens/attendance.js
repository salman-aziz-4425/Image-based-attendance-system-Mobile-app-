import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, ScrollView, Touchable } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { API, Amplify, graphqlOperation } from "aws-amplify";
import { useDispatch,useSelector } from "react-redux";
import Gallery from '../componenets/Camera'
import Document from '../componenets/document';
import { LastComparison,comparingFaces} from "../src/graphql/queries";
import {storeImageToS3Bucket,removal,conversion} from '../componenets/utils'
import Card from '../componenets/card';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function Attendance() {
  const [images, setPhoto] = useState([]);
  const [rollNumbers,setrollNumbers]=useState([])
  const [allUsers,setallUsers]=useState([])
  const [flag, setFlag] = useState(false);
  let Token=useSelector(state=>state.userReducer.token)
  Amplify.configure({
    API: {
      graphql_headers: async () => ({
        token:Token||""
      }),
    },
  });

const PreviewImage=(image)=>{
  // console.log(image)
  console.log("image")
   console.log(image)
  setPhoto(image)
  console.log(image)
  }
const getRollnumber=(rollNumbers,userRecords)=>{
  console.log(rollNumbers)
  setrollNumbers(rollNumbers)
  console.log(userRecords)
  setallUsers(userRecords)
}

const handleSubmit = async (e) => {
  setFlag(false);
  let finalresponse = [];
  e.preventDefault();
  //Excel to array
  console.log(rollNumbers)
  if (rollNumbers.length>0) {
      await new Promise(async (r, e) => {
        console.log("next promise");
        for (let i = 0; i < images.length; i++) {
          let imageKey = await storeImageToS3Bucket(images[i]).catch((e)=>alert('error'));
          console.log("imageKey => ",imageKey);
           let variables = {
             rollNumbers,
             trgImage: imageKey,
           };
           let responseComparison = await API.graphql(
             graphqlOperation(comparingFaces, variables)
           );
           console.log(responseComparison);
           await new Promise((r) => setTimeout(r, 8500));
           await API.graphql(graphqlOperation(LastComparison))
             .then((result) => {
               if (!result?.data?.receiverSqsComparison?.resp) {
                 throw "Error";
               }
               console.log(result);
               console.log(
                 "response1",
                 result?.data?.receiverSqsComparison?.resp
               );
               conversion(
                 result?.data?.receiverSqsComparison?.resp,
                 rollNumbers
               ).then((result) => {
                 console.log("response2", result);
                 finalresponse = finalresponse.concat(result)
               });
             })
             .catch((error) => alert("error"));
        }
         r(finalresponse);
       })
         .then(async (result) => {
           console.log("response3", result.length);
           if (result.length == 0) {
             throw "Error";
           }
          //  Removal of duplication
           removal(result).then((result) => {
             if (result.length < 1) {
               throw "Error";
             }
             console.log("response4 ",result);
             setrollNumbers(result);
              alert("Attendance Marked");
           });
         }).catch((error) => {
           console.log("error => ", error);
            // setloading("Something went Wrong");
         });
       ___________________________________________
      //  ends here

   }
};
  return (
    <>
    <View style={styles.container}>
  <View style={styles.galleryContainer}>
    <Gallery PreviewImage={PreviewImage}/>
  </View>

   <View style={styles.documentContainer}>
 <Document GetRoll={getRollnumber}/>
 {(images.length > 0 && rollNumbers.length > 1) && 
    <TouchableOpacity onPress={handleSubmit}>
      <Image source={require("../assets/images/download.png")} style={styles.downloadButtonImage} resizeMode="cover"/>
    </TouchableOpacity>
  }
</View>

</View>
    </>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryContainer: {
    flex: 1,
    height:600,
  },
  downloadButton: {
    position: 'absolute',
    top: 40,
    left: '38%',
    zIndex:1
  },
  downloadButtonImage: {
    height:60,
    width:60,
  },
  documentContainer: {
    marginBottom:180,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});