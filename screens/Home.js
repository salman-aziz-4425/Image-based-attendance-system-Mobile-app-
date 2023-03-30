import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View,TouchableOpacity,Image} from 'react-native';
import { useState,useEffect,useCallback  } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { API, Amplify, graphqlOperation } from "aws-amplify";
import {useNavigation} from "@react-navigation/native"
import { Loginuser } from '../src/graphql/mutations';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { tokenAuth } from '../Redux/slice'
export default function App() {
  const navigation=useNavigation()
  const [username,setUsername]=useState("")
  const [pass,setPass]=useState("")
  const [loader,setLoader]=useState(false)
  const [Error,seterror]=useState("")
  const dispatch=useDispatch()
  const Router=useNavigation()
  useFocusEffect(useCallback(() => {
    return () => {
      seterror(undefined)
      setLoader(false)
    };
  }, [])
);
  const userHandler=(props)=>{
    setUsername(props)
  }
  const passHandler=(props)=>{
    setPass(props)
  }
  const submitHandler = async () => {
    setLoader(true)
    const variables = {
      data: {
        rollNumber:username,
        password: pass,
      }, // key is "input" based on the mutation above
    };
    console.log(variables)
    await API.graphql(graphqlOperation(Loginuser, variables))
      .then(async (result) => {
        console.log(result)
        const token = JSON.parse(result.data.loginUser.token);
        let finalToken = token.split("=");
        finalToken = finalToken[1].split("Max-Age");
        finalToken = "Bearer " + finalToken[0];
        finalToken = finalToken.split(";");
        finalToken = finalToken[0];
        console.log(finalToken)
        dispatch(tokenAuth( {
          id:result.data.loginUser.user.id,
          token:finalToken,
          name:result.data.loginUser.user.name,
          email:result.data.loginUser.user.email,
          image:result.data.loginUser.user.image,
          qualification:result.data.loginUser.user.qualification,
          rollNumber:result.data.loginUser.user.rollNumber,
          Auth:true
        }));
        console.log(result.data.loginUser.user.rollNumber)
        if(result.data.loginUser.user.rollNumber.includes("TD")){
          Router.navigate("attendance");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("error");
        seterror('Invalid password or RollNo')
        setLoader(false)
      }
      );
  };
  return (
    <>
    {
      <View style={styles.container}>
        <Text style={{color:"#b92b27",fontSize:"20",marginBottom:29}}>Image-Based-Attendance-System</Text>
        <Image
        style={styles.tinyLogo}
        source={require('./../assets/images/camera.png')}
        resizeMode="contain"
      
      />
        <Text style={{color:"red"}}>{Error}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(Text)=>userHandler(Text)}
        placeholder="Enter username"
        keyboardType="text"
      />
        <TextInput
        style={styles.input}
        onChangeText={(Text)=>passHandler(Text)}
        placeholder="Enter Password"
        keyboardType="password"
      />
      <TouchableOpacity style={styles.button} onPress={submitHandler}>
        <Text style={{color:"white",fontWeight:"bold",textAlign:"center"}}>Login</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    }
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:20,
    width:"50%%",
    marginBottom:20
  },
  button:{
    backgroundColor:"navy",
    color:"white",
    textAlign:"center",
    width:"50%",
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:20,
  },
  tinyLogo: {
    width:"40%",
    height:"15%",
  },
  logo: {
    width: 66,
    height: 58,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
