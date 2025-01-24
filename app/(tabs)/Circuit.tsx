import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Type de navigation
export type RootStackParamList = {
  Circuit: undefined;
  AddCircuit: undefined;
  ShowAllCircuitsScreen: undefined;
};

type CircuitScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Circuit'>;

export default function CircuitScreen() {
  const navigation = useNavigation<CircuitScreenNavigationProp>();

  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/736x/42/83/cd/4283cd8e5fabcfa272a4ac494406add4.jpg',
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Circuit Management</Text>

        {/* Boutons pour afficher et ajouter un circuit */}
        <TouchableOpacity
  style={styles.button}
  onPress={() => {
    console.log('Navigating to ShowCircuit');
    navigation.navigate('ShowAllCircuitsScreen');
  }}
>
          <FontAwesome5 name="eye" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Show</Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={styles.button}
  onPress={() => {
    console.log('Navigating to AddCircuit');
    navigation.navigate('AddCircuit');
  }}
>
          <FontAwesome5 name="plus" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Add</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    flexDirection: 'row',
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
    elevation: 5,
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
