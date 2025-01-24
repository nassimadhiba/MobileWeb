import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  CircuitDetails: { IDC: number };
};

type CircuitDetailsRouteProp = RouteProp<RootStackParamList, 'CircuitDetails'>;

interface Circuit {
  IDC: number;
  Name: string;
  Descreption: string;
  Distance: string;
  Duration: string;
  ImgUrl: string;
  Color: string;
}

const CircuitDetailsScreen: React.FC = () => {
  const route = useRoute<CircuitDetailsRouteProp>();
  const { IDC } = route.params;
  const [circuit, setCircuit] = useState<Circuit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCircuitDetails = async () => {
      try {
        console.log('🔄 Récupération des détails du circuit avec IDC:', IDC);
        const response = await fetch('http://192.168.56.1:8084/gestioncircuit/${IDC}');
        if (!response.ok) {
          throw new Error('Erreur réseau: ${response.status}');
        }
        const data = await response.json();
        console.log('✅ Détails récupérés:', data);
        setCircuit(data);
      } catch (error) {
        console.error('❌ Erreur lors du chargement des détails du circuit:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCircuitDetails();
  }, [IDC]);
  

  if (loading) {
    return <ActivityIndicator size="large" color="#FF7F24" />;
  }

  if (!circuit) {
    return <Text style={styles.errorText}>Détails du circuit introuvables.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={{ uri: circuit.ImgUrl || 'https://via.placeholder.com/200' }} 
        style={styles.image} 
      />
      <Text style={styles.title}>{circuit.Name}</Text>
      <Text style={styles.text}>🏃 Distance: {circuit.Distance} km</Text>
      <Text style={styles.text}>⏱ Durée: {circuit.Duration}</Text>
      <Text style={styles.text}>📝 Description: {circuit.Descreption}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF7F24',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CircuitDetailsScreen;