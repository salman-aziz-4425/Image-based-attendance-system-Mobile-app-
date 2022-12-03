import { View, Text,StyleSheet, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import {useRoute} from "@react-navigation/native"
const BarDescription = () => {
  const [button,setbutton]=useState(false)
  const routes=useRoute()
  routes.params.Alergy = routes.params.Alergy.filter(function(str) {
    return /\S/.test(str);
});
const VisibleInfo=routes.params.ObjInfo.length>0
let  Requestedinfo=[]
routes.params.Alergy.map((alergy)=>(
Requestedinfo.push(routes.params.ObjInfo.filter((obj)=>{
    console.log(obj.nutrient.name)
  return obj.nutrient.name.includes(alergy.trim())
}))
))
Requestedinfo = [].concat(...Requestedinfo);
console.log(Requestedinfo)
  return (
    <>
    <View style={styles.container}>
      <Text style={{fontWeight:"bold",fontSize:30}}>RequestedInfo</Text>
      {VisibleInfo?
       Requestedinfo.map((Alergy)=>{
          return(
            <>
            <View style={styles.container2}>
            <Text>{Alergy.nutrient.name}  </Text>
            <Text style={{fontWeight:"bold"}}>{Alergy.nutrient.number}{Alergy.nutrient.unitName}</Text>
            </View>
            </>
          )
         }):<Text>No Info Found</Text>
      }
    </View>
    {
      VisibleInfo?
 <Button title='View All Info' onPress={()=>setbutton(!button)}></Button>:<Text></Text>
    }
    {
      button?
    <ScrollView>
      
<View style={{ flex: 1, paddingHorizontal:50,paddingVertical:50}}>
<View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
          <Text style={{ flex: 1, alignSelf: 'stretch',fontWeight:"bold" }}>Alergy Name</Text>
          <Text style={{ flex: 1, alignSelf: 'stretch',fontWeight:"bold" }}>Quantity</Text>
          </View>
      {
        routes.params.ObjInfo.map((Alergy)=>(
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
          <Text style={{ flex: 1, alignSelf: 'stretch' }}>{Alergy.nutrient.name} </Text>
          <Text style={{ flex: 1, alignSelf: 'stretch' }}>{Alergy.nutrient.number}{Alergy.nutrient.unitName}</Text>
          </View>
        ))
      }
      
            </View>
    </ScrollView>:<View></View>
}
    </>
  )
}

export default BarDescription

const styles = StyleSheet.create({
  container: {
    flex:1,
    display:"flex",
    flexDirection:"column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color:"black"
  },
  container2: {
    display:"flex",
    flexDirection:"row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color:"black"
  },
});
