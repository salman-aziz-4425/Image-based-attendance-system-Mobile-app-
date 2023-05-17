import React, { useState } from 'react';
import { View, Text, Button,ScrollView ,StyleSheet,TouchableOpacity,Image} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import { API, Amplify, graphqlOperation } from "aws-amplify";
import { getUser } from "../src/graphql/queries";
import { useDispatch,useSelector } from "react-redux";
import { tokenAuth } from '../Redux/slice';
import { useNavigation } from '@react-navigation/native';
import Loading2 from './loading2';
const Document = (props) => {
  const [data, setData] = React.useState([]);
  const Token=useSelector(state=>state.userReducer.token)
  const [upload,setupload]=useState(false)
  const [process,setProcess]=useState(false)
  const [operation,setOperation]=useState("")
  const navigate=useNavigation()
  const dispatch=useDispatch()
  Amplify.configure({
    API: {
      graphql_headers: async () => ({
        token:Token
      }),
    },
  });
  const pickDocument = async () => {
    setOperation("Document Uploading")
    setProcess(true)
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log(
        result.uri,
        result.type, // mime type
        result.name,
        result.size
      );

      // Read the Excel file data
      const fileData = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const workbook = XLSX.read(fileData, { type: 'base64' });
      const worksheet = workbook.Sheets['Sheet1'];
      let data = XLSX.utils.sheet_to_json(worksheet);
      data=data.slice(6)
      data.pop()
      setData(data)
      let rollNumber=[]
      let usersRecords = [];
      await Promise.all(
        data.length > 0 &&
          data.map(async (user) => {
            rollNumber.push(user?.__EMPTY_1);
            try {
              const variable1 = {
                rollNumber: user?.__EMPTY_1,
              };
              const response = await API.graphql(
                graphqlOperation(getUser, variable1)
              );
              response?.data.getUser[0] && usersRecords.push(response?.data.getUser[0]);
              console.log("Resp => data => ", response?.data.getUser[0]);
              
            } catch (err) {
              setProcess(false)
              console.log("err => ", err);
            }
          })).then(()=>{
            props.GetRoll(rollNumber,usersRecords)
            setData(usersRecords)
            alert("Document uploaded")
            setupload(true)
            setProcess(false)
          })
    } catch (err) {
      setProcess(false)
     alert("Try again with Valid file")
     
    }
  };

  return (
    <View style={styles.container}>
    {upload === false ? (
      <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
        <Text style={styles.uploadText}>Select Excel file</Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.viewButtonContainer}>
        <TouchableOpacity style={styles.viewButton} onPress={() => navigate.navigate('presentStudents', {
            users:data,
            present:props.presentimages
        })}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity> 
        {(props.images.length > 0 && props.rollNumbers.length > 0) && 
    <TouchableOpacity onPress={props.handleSubmit}>
      <Image source={require("../assets/images/camera.png")} style={styles.downloadButtonImage} resizeMode="cover"/>
    </TouchableOpacity>
  }
      </View>
    )}
    {
      process&&<Loading2 text={operation}/>
    }
<View style={{ top: 180, backgroundColor: "black", width: 800, height: 60 }}>
<TouchableOpacity onPress={()=>{
  console.log("hello")
  dispatch(tokenAuth( {
  }));
   navigate.navigate('Home')
}
}>
  <View
    style={{
      backgroundColor: "white",
      height: 100,
      width: 100,
      position: "absolute",
      left: "50%",
      transform: [{ translateX: -50 }, { translateY: -45 }],
      borderRadius: 50,
      padding:20,
      borderRadius:100,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
  </View>
  <Image
    style={{
      top: -30,
      height:60,
      width: 60,
      left:370,
      position: "absolute",
    }}
    source={require("../assets/images/logout.png")}
  />
  </TouchableOpacity>
</View>
  </View>
  );
};

export default Document;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom:80
  },
  uploadText: {
    color: "#fff",
    fontSize: 18,
  },
  viewButtonContainer: {
    marginTop:0,
  },
  viewButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  downloadButtonImage: {
    marginTop:13,
    height:60,
    width:60,
    left:15,
    zIndex:1
  },
  documentContainer: {
    marginBottom:180,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
