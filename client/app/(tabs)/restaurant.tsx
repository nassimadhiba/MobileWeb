import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Restaurant = () => {
  const navigation = useNavigation();

  // Liste des restaurants de Fès avec images et menus
  const restaurants = [
    {
      id: 1,
      name: "Restaurant Al Fassia",
      description: "Cuisine traditionnelle marocaine.",
      latitude: "34.0581",
      longitude: "-4.9789",
      imgUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/02/57/0f/e9/interno.jpg?w=600&h=300&s=1",
      menu: [
        { name: "Couscous", price: "100 MAD" },
        { name: "Tagine", price: "120 MAD" },
      ],
    },
    {
      id: 2,
      name: "Restaurant Dar Hatim",
      description: "Spécialités marocaines et ambiance chaleureuse.",
      latitude: "34.0552",
      longitude: "-4.9782",
      imgUrl: "https://media-cdn.tripadvisor.com/media/photo-s/19/d4/26/44/the-atmosphere-is-authentic.jpg",
      menu: [
        { name: "Pastilla", price: "80 MAD" },
        { name: "Harira", price: "50 MAD" },
      ],
    },
    {
      id: 3,
      name: "Restaurant La Terrasse",
      description: "Vue magnifique et plats traditionnels.",
      latitude: "34.0605",
      longitude: "-4.9701",
      imgUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/73/7c/50/sale.jpg?w=800&h=800&s=1",
      menu: [
        { name: "Brochettes", price: "70 MAD" },
        { name: "Tajine d'agneau", price: "130 MAD" },
      ],
    },
  ];

 

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Restaurants à Fès</Text>
      {restaurants.map((restaurant) => (
        <View key={restaurant.id} style={styles.restaurantContainer}>
          <Image source={{ uri: restaurant.imgUrl }} style={styles.restaurantImage} />
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>{restaurant.description}</Text>

          <Text style={styles.menuTitle}>Menu :</Text>
          {restaurant.menu.map((dish, index) => (
            <Text key={index} style={styles.menuItem}>🍽 {dish.name} - {dish.price}</Text>
          ))}

         

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate('RestaurantDetails', { restaurant })}
          >
            <Text style={styles.detailsButtonText}>🍽 Voir les détails</Text>
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
  restaurantContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  restaurantImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#444',
  },
  menuItem: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginTop: 2,
  },
  viewButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  detailsButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Restaurant;