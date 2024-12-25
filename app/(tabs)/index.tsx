import React, { useState, useEffect } from 'react';
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
import { createStackNavigator } from '@react-navigation/stack';

// Supposons que TabTwoScreen soit défini ailleurs
import TabTwoScreen from './explore';

// Création du Stack Navigator
const Stack = createStackNavigator();

// Écran de connexion
function LoginScreen({ navigation }: any) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const validateForm = async () => {
    if (!username || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
    } else {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (isMounted) {
          navigation.navigate('Explore');
        }
      } catch (error) {
        if (isMounted) {
          Alert.alert('Erreur', 'Une erreur s’est produite.');
        }
      }
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Mot de passe oublié',
      'Veuillez contacter l\'assistance pour réinitialiser votre mot de passe.'
    );
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://th.bing.com/th/id/OIP.VRsbUgx4X9ieMQjjEpJNOAHaGL?w=600&h=500&rs=1&pid=ImgDetMain',
      }}
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
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Forgot Password?</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

// App principale
export default function App() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Explore" component={TabTwoScreen} />
    </Stack.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
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
  input: {
    flex: 1,
    paddingVertical: 20,
    color: '#000',
  },
  showPassword: {
    position: 'absolute',
    right: 10,
  },
  showPasswordText: {
    color: '#003D28',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#FF7F24',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
  },
});