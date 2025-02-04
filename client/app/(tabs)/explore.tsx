import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', title: 'Circuits touristiques de Fès', image: 'https://www.voyagesetevasions.com/villes/maroc/fes/visite-fes-maroc.jpg', route: 'ShowAllCircuitsScreen' },
  { id: '2', title: 'Les Monuments de Fès', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/78/63/45/caption.jpg?w=800&h=600&s=1', route: 'ShowAlMonumentsScreen' },
  { id: '3', title: 'Célèbres Riads de Fès', image: 'https://cf.bstatic.com/xdata/images/hotel/square600/95441792.webp?k=43092cb40c9107e2351104b78041ae358d218297737fd936db1742dc945edb32&o=', route: 'Riad' },
  { id: '4', title: 'Restaurants Traditionnels de Fès', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/73/7c/50/sale.jpg?w=800&h=600&s=1', route: 'Restaurant' },
];

const ExploreScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Fès</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate(item.route)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.cardText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F0E1', padding: 15 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  listContainer: { alignItems: 'center' },
  card: { width: 170, backgroundColor: '#FFFFFF', borderRadius: 15, margin: 10, alignItems: 'center', overflow: 'hidden', elevation: 5 },
  image: { width: '100%', height: 140, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  textContainer: { padding: 10, backgroundColor: '#FFF', width: '100%', alignItems: 'center' },
  cardText: { fontSize: 16, fontWeight: 'bold', color: '#333', textAlign: 'center' },
});

export default ExploreScreen;
