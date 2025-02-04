import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './index';
import ExploreScreen from './explore';
import ShowAlMonumentsScreen from './gestionmonument/showAl';
import CircuitDetailsScreen from './gestioncircuit/showC';
import ShowAllCircuitsScreen from './gestioncircuit/showAll';


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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen 
        name="ShowAlMonumentsScreen" 
        component={ShowAlMonumentsScreen} 
        options={{ animation: 'none', title: 'Tous les Monuments' }} 
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
