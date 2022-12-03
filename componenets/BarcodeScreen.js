import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, View,TouchableOpacity,Button,useF } from 'react-native';
import React,{useState,useEffect,useCallback} from 'react'
import {BarCodeScanner} from 'expo-barcode-scanner'
import {useNavigation} from "@react-navigation/native"
import axios from 'axios';
const BarcodeScreen = () => {
  const navigation=useNavigation()
  const [button,setbutton]=useState(false)
  const [hasPermission,setPermission]=useState(false)
  const [scanned,setScanned]=useState(false)
  const [Alergy,setAlergy]=useState([])
  const [text,setText]=useState("")
  const askPerCameraPermission=()=>{
    (async()=>{
      const { status }=await BarCodeScanner.requestPermissionsAsync();
      setPermission(status=='granted')
  })()
  }
  useFocusEffect(useCallback(() => {
    return () => {
      setScanned(false)
      setbutton(false)
    };
  }, [])
);
  useEffect(()=>{
    setScanned(false)
    askPerCameraPermission()
  },[])
  
  const handleBarCodeScanner=({type,data})=>{
    setScanned(true)
    setText(data)
    const Url="https://api.nal.usda.gov/fdc/v1/foods?fdcIds="+data+"&api_key=8G7WyBMHZdVwcbCb4QACt4dyFUZdAFrtmfO0wDhf"
    axios.get(Url).then((result)=>{
      const ObjInfo=result.data[0].foodNutrients
      navigation.navigate('BarDescription',{ObjInfo,Alergy})
    }).catch((error)=>{
        console.log("Hello")
    })
  }
  
  if(hasPermission===null){
    return(
      <View style={styles.container}>
      <Text>BarcodeScreen</Text>
    </View>
    )
  }
  if(hasPermission==false){
    return (
      <View style={styles.container}>
        <Text style={{margin:10}}>N0 Access to camera</Text>
       <Button title={'Allow Camera'} onPress={()=>askPerCameraPermission()}></Button>
      </View>
    )
  }
  const alergyHandler=(props)=>{
    setAlergy(props.split(/[\s, ]+/))
  }
  
  return(
    <View style={styles.container}>
      {
        (button===true&&Alergy.length>=1)?
   <View style={styles.barcodebox}>
   <BarCodeScanner
   onBarCodeScanned={scanned?undefined:handleBarCodeScanner}
   style={{height:400,width:400}}/>
 </View>:<Button styles={{marginBottom:20}} title='Scan me' onPress={()=>setbutton(true)}></Button>
      }
      {scanned&&<Button styles={{marginTop:20}}  title={'Scan again'} onPress={()=>setScanned(false)}></Button>}
      <TextInput
        style={styles.input}
        onChangeText={(Text)=>alergyHandler(Text)}
        placeholder="Enter Alergy"
        keyboardType="text"
      />
    </View>
  )
}

export default BarcodeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText:{
    marginTop:20,
    color:'black',
    marginBottom:20
  },
  barcodebox:{
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:'center',
    height:300,
    width:300,
    overflow:'hidden',
    borderRadius:30,
    backgroundColor:'tomato'
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderRadius:20
  },
  button:{
    backgroundColor:"black",
    color:"white",
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:20
  }
});
