import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './explore';
import ShowAlMonumentsScreen from './gestionmonument/showAl';
import CircuitDetailsScreen from './gestioncircuit/showC';
import ShowAllCircuitsScreen from './gestioncircuit/showAll';
import MonumentDetailsScreen from './gestionmonument/show';
import  Riad from './riad';
import RiadDetails from './RiadDetails';
import Restaurant from './restaurant';
import RestaurantDetails from './RestaurantDetails';
import { StatusBar } from 'react-native';


 function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{ uri: 'https://th.bing.com/th/id/OIP.VRsbUgx4X9ieMQjjEpJNOAHaGL?w=600&h=500&rs=1&pid=ImgDetMain' }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Bienvenue à Fès</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Explore')}
        >
          <Text style={styles.buttonText}>Cliquer ici </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF7F24',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 20,
  },
  button: {
    backgroundColor: '#FF7F24',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 20 },
});




type RootStackParamList = {
  
  Explore: undefined;
  CircuitDetails: { IDC: number };
  ShowM: undefined;
  ShowAllCircuitsScreen: undefined;
  ShowAlMonumentsScreen :undefined;
   
};
const Stack = createStackNavigator();

export default function App() {
  return (
     
      <Stack.Navigator   screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen 
        name="ShowAlMonumentsScreen" 
        component={ShowAlMonumentsScreen} 
        options={{ animation: 'none', title: 'Tous les Monuments' }} 
  />
  

<Stack.Screen 
  name="MonumentDetails" 
  component={MonumentDetailsScreen} 
  options={{ title: 'Détails du Monument' }} 
/>
       
  <Stack.Screen 
  name="CircuitDetails" 
  component={CircuitDetailsScreen} 
  options={{ title: 'Détails du Circuit' }} 
/>
<Stack.Screen 
        name="ShowAllCircuitsScreen" 
        component={ShowAllCircuitsScreen} 
        options={{ animation: 'none', title: 'Tous les Circuits' }} 
  />
  <Stack.Screen name="Riad" component={Riad} />
  <Stack.Screen name="RiadDetails" component={RiadDetails} />
   
  <Stack.Screen name="Restaurant" component={Restaurant} />
  <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
  
 
      </Stack.Navigator>
      
     
  );
}
