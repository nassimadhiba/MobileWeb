import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';

const RiadDetails = ({ navigation }) => {
  const route = useRoute();
  const { riad } = route.params;

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${riad.latitude},${riad.longitude}`;
    Linking.openURL(url);
  };
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: riad.image }} style={styles.image} />
      <Text style={styles.title}>{riad.name}</Text>
      <Text style={styles.description}>{riad.description}</Text>
      <Text style={styles.rating}>{'⭐'.repeat(Math.round(riad.rating))}</Text>
      <Text style={styles.location}>📍 Latitude: {riad.latitude} | Longitude: {riad.longitude}</Text>
      <Button title="Voir sur Google Maps" color="#28a745" onPress={openGoogleMaps} />
      <Button title="Retour" color="#007bff" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 20,
    color: '#ffcc00',
    textAlign: 'center',
    marginBottom: 15,
  },
  location: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default RiadDetails;