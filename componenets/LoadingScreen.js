// import React in our code
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';

//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
const LoadingScreen= () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const navigate=useNavigation()
  const onDone = () => {
    navigate.navigate('Home')
  };
  const onSkip = () => {
    navigate.navigate('Home')
  };

  const RenderItem = ({item}) => 
  {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
          
        }}>
        <Text style={styles.introTitleStyle}>
          {item.title}
        </Text>
        <Image
          style={styles.introImageStyle}
          source={item.image} 
          resizeMode="contain"
          />
        <Text style={styles.introTextStyle}>
          {item.text}
        </Text>
      </View>
    );
  };

  const RenderNextButton = () => {
    return (
      <TouchableOpacity style={styles.buttonCircle} onPress={onDone}>
        <Icon
          name="arrow-right"
          color="black"
          size={24}
        />
      </TouchableOpacity>
    );
  };

  const RenderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="check"
          color="black"
          size={24}
        />
      </View>
    );
  };

  return 
  (
    <>
      {showRealApp ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.titleStyle}>
              React Native App Intro Slider using AppIntroSlider
            </Text>
            <Text style={styles.paragraphStyle}>
              This will be your screen when you click Skip
              from any slide or Done button at last
            </Text>
            <Button
              title="Show Intro Slider again"
              onPress={() => setShowRealApp(false)}
            />
          </View>
        </SafeAreaView>
      ) : (
        <AppIntroSlider
         style={{color:"gray"}}
          data={slides}
          renderItem={RenderItem}
          renderDoneButton={RenderNextButton}
          renderNextButton={RenderDoneButton}
          onDone={onDone}
        />
      )}
    </>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color:"gray",
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },

  titleStyle: {
    padding: 10,
    textAlign: 'center',
    color:"gray",
    fontSize: 18,
    fontWeight: 'bold',
  },

  paragraphStyle: {
    padding: 20,
    color:"gray",
    textAlign: 'center',
    fontSize: 16,
  },

  introImageStyle: {
    width:400,
    height:400,
  },

  introTextStyle: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    paddingVertical: 30,
  },

  introTitleStyle: {
    marginTop:100,
    fontSize: 25,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const slides = [
  {
    key: 's1',
    text: 'Powered by Amazon',
    image:require('../assets/images/amazon.png'),
    backgroundColor: 'white',
  },
  {
    key: 's2',
    text: 'Facial Recogition',
    image: require('../assets/images/attendance2.jpeg'),
    backgroundColor: 'white',
  },
{
  key: 's3',
  text: 'Aws Services',
  image:require('./../assets/images/aws.png'),
  backgroundColor: '#f8d568',
},
];