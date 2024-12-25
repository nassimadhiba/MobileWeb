import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native';

function LoginScreen({ navigation }: any) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if (!username || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
    } else {
      navigation.navigate('Explore'); // Redirection vers l'écran Explore
    }
  };

  return (
    <ImageBackground
      source={{ uri:'https://th.bing.com/th/id/OIP.VRsbUgx4X9ieMQjjEpJNOAHaGL?w=600&h=500&rs=1&pid=ImgDetMain' }}
      // Assurez-vous que l'image existe dans ce dossier
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to Fes</Text>

        {/* Username */}
        <View style={styles.inputContainer}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios/50/user--v1.png' }}  // Remplacez par votre icône
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#A0A0A0"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Image
            source={{ uri:'https://img.icons8.com/ios/50/lock--v1.png' }}  // Remplacez par votre icône
            style={styles.icon}
          />
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

        {/* Buttons */}
        <TouchableOpacity
          style={[styles.button, { marginBottom: 20 }]}
          onPress={validateForm}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  title: { fontSize: 45, fontWeight: 'bold', textAlign: 'center', color: '#FF7F24' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, marginBottom: 20, paddingHorizontal: 10 },
  input: { flex: 1, paddingVertical: 20, color: '#000' },
  icon: { width: 25, height: 25, marginRight: 10 },
  showPassword: { position: 'absolute', right: 10 },
  showPasswordText: { color: '#003D28', fontSize: 12 },
  button: { backgroundColor: '#FF7F24', paddingVertical: 15, borderRadius: 20, alignItems: 'center' },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 17 },
});

export default LoginScreen;
