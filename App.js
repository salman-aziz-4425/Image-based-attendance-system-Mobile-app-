
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FoodScreen from "./screens/FoodScreen"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import Description from './screens/Description';
import BarDescription from './componenets/BarcodeDescription';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Group screenOptions={{headerShown: false}}>
       <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={FoodScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' ,headerShown:true}}>
          <Stack.Screen name='Description' component={Description}/>
          <Stack.Screen name='BarDescription' component={BarDescription}/>
        </Stack.Group>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
