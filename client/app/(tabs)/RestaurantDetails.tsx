import React from "react";
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";

const RestaurantDetails = ({ navigation }) => {
  const route = useRoute();
  const { restaurant } = route.params;

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}`;
    Linking.openURL(url);
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.imgUrl || "https://via.placeholder.com/400" }} style={styles.image} />
      </View>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.description}>{restaurant.description}</Text>
      
      <Text style={styles.menuTitle}>🍽 Menu</Text>
      <FlatList
        data={restaurant.menu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>{item.price}</Text>
          </View>
        )}
        scrollEnabled={false}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.mapButton]} onPress={openGoogleMaps}>
          <Text style={styles.buttonText}>Voir sur Google Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  imageContainer: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 15,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#16a085",
    textAlign: "center",
    marginVertical: 15,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#ecf0f1",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  menuItemPrice: {
    fontSize: 16,
    color: "#777",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "45%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  mapButton: {
    backgroundColor: "#27ae60",
  },
  backButton: {
    backgroundColor: "#2980b9",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RestaurantDetails;