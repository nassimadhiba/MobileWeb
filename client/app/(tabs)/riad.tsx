import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Riad = () => {
  const navigation = useNavigation();

  const riads = [
    {
      id: 1,
      name: "Riad Haj Palace & Spa",
      description: "Le Riad Haj Palace dispose d'une terrasse et d'un salon. La connexion Wi-Fi est accessible gratuitement dans l'ensemble des locaux.",
      image: "https://riadhajpalace.allhotelsmorocco.com/data/Images/1080x700w/12892/1289293/1289293039/fes-riad-haj-palace-image-1.JPEG",
      rating: 5,
      latitude: 34.0614,
      longitude: -4.9836
    },
    {
      id: 2,
      name: "Riad Al Makan",
      description: "Un riad magnifique avec un décor traditionnel et un patio splendide.",
      image: "https://cf.bstatic.com/xdata/images/hotel/square600/207385607.webp?k=b1c56d538e4b503c455f94688f2101a7c4ab5851735befb96fa09c0eced46585&o=",
      rating: 4.5,
      latitude: 34.0630,
      longitude: -4.9739
    },
    {
      id: 3,
      name: "Riad Fes",
      description: "Un riad de luxe offrant une expérience inoubliable avec une architecture traditionnelle.",
      image: "https://cf.bstatic.com/xdata/images/hotel/square600/353051898.webp?k=99ec531dccfc7a45802e1777b2b6413fd4a7cc7bdd559f31c0f8b5536a2d3943&o=",
      rating: 5,
      latitude: 34.0618,
      longitude: -4.9832
    },
    {
      id: 4,
      name: "Riad Salam Fes",
      description: "Un cadre élégant avec une atmosphère calme et relaxante.",
      image: "https://cf.bstatic.com/xdata/images/hotel/square600/65290037.webp?k=9a8d222fa4a7a6fefeef6feb893bd6e7c83260ab4b158ea238a9df03fde357e8&o=",
      rating: 4.8,
      latitude: 34.0623,
      longitude: -4.9855
    },
    {
      id: 5,
      name: "Riad Dar Bensouda",
      description: "Un magnifique riad avec une piscine et une terrasse panoramique.",
      image: "https://marrakech-riads.com/wp-content/uploads/2015/08/bensouda13.jpg",
      rating: 4.7,
      latitude: 34.062733,
      longitude: -4.97641
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Riads</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Quelques hôtels riad de la médina Fès</Text>
      </TouchableOpacity>
      {riads.map((riad) => (
        <View key={riad.id} style={styles.riadContainer}>
          <Image source={{ uri: riad.image }} style={styles.riadImage} />
          <Text style={styles.riadName}>{riad.name}</Text>
          <Text style={styles.riadDescription}>{riad.description}</Text>
          <Text style={styles.rating}>{'⭐'.repeat(Math.round(riad.rating))}</Text>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => navigation.navigate('RiadDetails', { riad })}
          >
            <Text style={styles.viewButtonText}>Voir l'hôtel</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#d1c4a8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#b4a284',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  riadContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  riadImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  riadName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  riadDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    color: '#ffcc00',
    marginVertical: 5,
  },
  viewButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Riad;