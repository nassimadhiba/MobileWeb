import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native'; 
import { enableScreens } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Explore: { id: number; username: string };
  CircuitDetails: { IDC: number };
  Monument: undefined;
  Circuit: undefined;
  AddCircuit: undefined;
  ShowM: undefined;
  AddMonumentScreen: undefined; // ✅ Assurez-vous que cela existe
  EditC: undefined;
  ShowAllCircuitsScreen: undefined;
};



enableScreens(false);
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; // Importation manquante
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabTwoScreen from './explore'; // Supposons que TabTwoScreen soit défini

import CircuitScreen from './Circuit'; 
import CircuitDetailsScreen from './gestioncircuit/showC';
import AddCircuitScreen from './gestioncircuit/addC';
import EditCircuit from './gestioncircuit/editC';
import ShowAllCircuitsScreen from './gestioncircuit/showAll';


import ShowAlMonumentsScreen from './gestionmonument/showAl';
import MonumentScreen from './Monument';
import AddMonumentScreen  from './gestionmonument/add';
import ShowMonument from './gestionmonument/show';


const Stack = createStackNavigator<RootStackParamList>();

 



function LoginScreen({ navigation }: any) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = async () => {
    if (!username || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('http://localhost:8084/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Explore', { id: data.id, username: data.username });
      } else {
        Alert.alert('Erreur', data.error || 'Une erreur s\'est produite');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de se connecter au serveur.');
      console.error('Erreur de connexion :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://th.bing.com/th/id/OIP.VRsbUgx4X9ieMQjjEpJNOAHaGL?w=600&h=500&rs=1&pid=ImgDetMain' }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to Fes</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#A0A0A0"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A0A0A0"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.showPassword}
          >
            <Text style={styles.showPasswordText}>
              {passwordVisible ? 'Hide' : 'Show'} password
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, { marginBottom: 20 }]}
          onPress={validateForm}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Logging in...' : 'Log in'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Login">
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Explore" component={TabTwoScreen} />

  <Stack.Screen 
  name="CircuitDetails" 
  component={CircuitDetailsScreen} 
  options={{ title: 'Détails du Circuit' }} 
/>
<Stack.Screen name="Circuit" component={CircuitScreen} />
  <Stack.Screen name="AddCircuit" component={AddCircuitScreen} />
  <Stack.Screen name="EditC" component={EditCircuit} />
  <Stack.Screen 
        name="ShowAllCircuitsScreen" 
        component={ShowAllCircuitsScreen} 
        options={{ animation: 'none', title: 'Tous les Circuits' }} 
  />



<Stack.Screen 
  name="MonumentDetails" 
  component={ShowMonument} 
  options={{ title: 'Détails du Monument' }} 
/>
<Stack.Screen 
        name="ShowAlMonumentsScreen" 
        component={ShowAlMonumentsScreen} 
        options={{ animation: 'none', title: 'Tous les Monuments' }} 
  />
  <Stack.Screen name="Monument" component={MonumentScreen} />
  <Stack.Screen name="AddMonumentScreen" component={AddCircuitScreen} />

  
</Stack.Navigator>

  );}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: { flex: 1, paddingVertical: 20, color: '#000' },
  showPassword: { position: 'absolute', right: 10 },
  showPasswordText: { color: '#003D28', fontSize: 12 },
  button: {
    backgroundColor: '#FF7F24',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 17 },
});