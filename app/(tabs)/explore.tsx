import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assurez-vous d'installer cette bibliothèque

export default function ExploreScreen({ navigation }: any) {
  const handleLogout = () => {
    
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Bouton de déconnexion en haut de la page */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Icon name="log-out-outline" size={20} color="#FFF" style={styles.icon} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Image avec un espace en dessous */}
      <Image
        source={{ uri: 'https://th.bing.com/th/id/OIP.vN-gMpCNIneZwv8FFw3TuAHaEo?rs=1&pid=ImgDetMain' }} // Remplacez avec l'URL correcte
        style={styles.image}
      />

      {/* Autres boutons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Monument')}
      >
        <Text style={styles.buttonText}>Monument</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Circuit')}
      >
        <Text style={styles.buttonText}>Circuit</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff3b0', // Changement de couleur de fond
    padding: 20,
  },
  logoutButton: {
    position: 'absolute', // Position absolue pour le placer en haut
    top: 20, // Placer en haut de l'écran
    right: 10, // Placer à droite
    flexDirection: 'row', // Disposition horizontale pour l'icône et le texte
    backgroundColor: '#FF7F24',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10, // Espace entre l'icône et le texte
  },
  logoutText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '90%',
    height: 300,  //add long
    marginTop: 80, // Espace au-dessus de l'image
    marginBottom: 30, // Espace en-dessous de l'image pour séparer des autres boutons
    borderRadius: 10,
  },
  button: {
    width: '80%',
    backgroundColor: '#FF7F24',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});