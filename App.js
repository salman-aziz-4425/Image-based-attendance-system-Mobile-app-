
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FoodScreen from "./screens/FoodScreen"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import Description from './screens/Description';
import BarcodeScreen from './componenets/BarcodeScreen'
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Group screenOptions={{headerShown: false}}>
       <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={FoodScreen} />
        <Stack.Screen name='Barcode' component={BarcodeScreen}/>    
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name='Description' component={Description}/>
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
