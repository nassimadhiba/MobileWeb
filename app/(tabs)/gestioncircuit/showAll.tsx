import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';

// Définir l'interface pour les circuits
interface Circuit {
  IDC: string;
  Name: string;
  Description: string;
  Duration: string;
  Distance: string;
  ImagUrl: string;
  Color: string;
}

const ShowCircuits = () => {
  const [circuits, setCircuits] = useState<Circuit[]>([]); // Typage explicite des circuits
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCircuits = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8084/gestioncircuit/showAll');
        const data = await response.json();

        if (response.ok) {
          setCircuits(data.circuits); // Mise à jour des circuits avec les données récupérées
        } else {
          Alert.alert('Erreur', data.error || 'Une erreur est survenue.');
        }
      } catch (error) {
        Alert.alert('Erreur réseau', 'Veuillez vérifier votre connexion et réessayer.');
        console.error('Erreur lors de la récupération des circuits:', error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchCircuits();
  }, []);

  // Si les données sont en cours de chargement
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FF7F24" />
      </SafeAreaView>
    );
  }

  // Si aucun circuit n'est trouvé
  if (circuits.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>Aucun circuit trouvé.</Text>
      </SafeAreaView>
    );
  }

  // Rendu de la liste des circuits
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={circuits}
        keyExtractor={(item) => item.IDC.toString()} // L'attribut IDC est maintenant bien reconnu
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.Name}</Text>
            <Text style={styles.description}>{item.Description}</Text>
            <Text style={styles.details}>Durée: {item.Duration}</Text>
            <Text style={styles.details}>Distance: {item.Distance}</Text>
            <Text style={styles.details}>Couleur: {item.Color}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7F24',
  },
  description: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  message: {
    fontSize: 18,
    color: '#FF7F24',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ShowCircuits;
