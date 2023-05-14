import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'

const Card = (props) => {
  console.log(props.image)
  return (
  
    <View style={styles.container}>
    <Image source={{uri:props.image}} style={styles.image} />
    <View style={styles.detailsContainer}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.rollNO}>{`Roll No. ${props.RollNo}`}</Text>
    </View>
  </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rollNo: {
    fontSize: 14,
    color: '#999',
  },
});
