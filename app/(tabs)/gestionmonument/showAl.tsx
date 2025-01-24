import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

interface Monument {
  IDC: number;
  IDM: number;
  Name: string;
  Descreption: string;
  ImgUrl: string;
}

const ShowAlMonumentsScreen: React.FC = () => {
  const [monuments, setmonuments] = useState<Monument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMonuments();
  }, []);

  const fetchMonuments = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8084/gestionmonument/showAl');
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      const data = await response.json();
      setmonuments(data);
    } catch (error) {
      console.error('Erreur lors du chargement des monument:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMonumentCard = ({ item }: { item: Monument }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MonumentDetails', { IDM: item.IDM })}>
      <View style={[styles.card, { borderColor: '#ccc' }]}>
        <ImageBackground
          source={{ uri: item.ImgUrl || 'https://via.placeholder.com/150' }}
          style={styles.imageBackground}
          imageStyle={styles.imageBorderRadius}
        >
          <View style={styles.overlay}>
            <Text style={styles.cardTitle}>{item.Name}</Text>
            <Text style={styles.cardDescription}>{item.Descreption}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🌟 Monuments Disponibles</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FF7F24" />
      ) : monuments.length === 0 ? (
        <Text style={styles.noData}>Aucun monument disponible</Text>
      ) : (
        <FlatList
          data={monuments}
          keyExtractor={(item) => item.IDC.toString()}
          renderItem={renderMonumentCard}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF7F24',
    textAlign: 'center',
    marginVertical: 20,
  },
  noData: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
  },
  imageBackground: {
    height: 220,
    justifyContent: 'flex-end',
  },
  imageBorderRadius: {
    borderRadius: 15,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 3,
  },
  cardDescription: {
    fontSize: 12,
    color: '#EEE',
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default ShowAlMonumentsScreen;