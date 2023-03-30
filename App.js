
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './componenets/Home'
import Attendance from './componenets/attendance';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
Amplify.configure(awsconfig);
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Group screenOptions={{headerShown: false}}>
       <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="attendance" component={Attendance} />
        </Stack.Group>
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>
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
