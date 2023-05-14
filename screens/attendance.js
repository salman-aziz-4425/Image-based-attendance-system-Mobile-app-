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
  const [finalroll,setfinalroll]=useState([])
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
  setrollNumbers(rollNumbers)
  setallUsers(userRecords)
}

const handleSubmit = async (e) => {
  setFlag(false);
  let finalresponse = [];
  console.log(images.length)
  e.preventDefault();
  //Excel to array
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
             setfinalroll(result);
              alert("Attendance Marked go check view page");
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
 <Document GetRoll={getRollnumber} presentimages={finalroll} images={images} rollNumbers={rollNumbers} handleSubmit={handleSubmit}/>
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
    backgroundColor:"blue",
    height:90,
    width:60,
    zIndex:1
  },
  documentContainer: {
    marginBottom:180,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});