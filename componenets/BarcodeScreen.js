import { View, Text,StyleSheet,Button } from 'react-native'
import React,{useState,useEffect} from 'react'
import {BarCodeScanner} from 'expo-barcode-scanner'
const BarcodeScreen = () => {
  const [hasPermission,setPermission]=useState(false)
  const [scanned,setScanned]=useState(false)
  const [text,setText]=useState("Not yet scanned")

  const askPerCameraPermission=()=>{
    (async()=>{
      const { status }=await BarCodeScanner.requestPermissionsAsync();
      setPermission(status=='granted')
  })()
  }
  useEffect(()=>{
    askPerCameraPermission()
  },[])
  const handleBarCodeScanner=({type,data})=>{
    setScanned(true)
    setText(data)
    console.log("Type"+type+"/nData"+data)
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
  return(
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
        onBarCodeScanned={scanned===false?handleBarCodeScanner:undefined}
        style={{height:400,width:400}}/>
      </View>
      <Text style={styles.mainText}>{scanned===true?text:<Text>Not yet scanned</Text>}</Text>
      {scanned&&<Button  title={'Scan again'} onPress={()=>setScanned(false)}></Button>}
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
  }
});
