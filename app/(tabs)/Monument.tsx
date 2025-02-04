import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Monument: undefined;
  AddMonumentScreen: undefined;
  ShowAlMonumentsScreen: undefined;
};
type MonumentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Monument'>;

export default function MonumentScreen() {
    const navigation = useNavigation<MonumentScreenNavigationProp>();
  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/736x/42/83/cd/4283cd8e5fabcfa272a4ac494406add4.jpg',
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Gestion des Monuments</Text>

        {/* Boutons Supprimer, Ajouter, Modifier, Afficher */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('Navigating to ShowMonument');
            navigation.navigate('ShowAlMonumentsScreen');
          }}
        >
          <FontAwesome5 name="eye" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Voir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddMonumentScreen')}
        >
          <FontAwesome5 name="plus" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>

        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Superposition sombre pour lisibilité
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ee9b00',
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  button: {
    width: '80%',
    flexDirection: 'row', // Alignement icône + texte
    alignItems: 'center',
    backgroundColor: '#FF7F24',
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Ombre pour Android
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});
