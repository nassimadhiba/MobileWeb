import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import Modal from 'react-native-modal';

// Définition des types pour la navigation
type RootStackParamList = {
  CircuitDetails: { IDC: number };
  EditC: { IDC: number };
};

type CircuitDetailsRouteProp = RouteProp<RootStackParamList, 'CircuitDetails'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'CircuitDetails'>;

// Définition de l'interface Circuit
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
  const navigation = useNavigation<NavigationProp>();

  const [circuit, setCircuit] = useState<Circuit | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchCircuitDetails = async () => {
      try {
        console.log('🔄 Récupération des détails du circuit avec IDC:', IDC);
        const response = await fetch(`http://10.0.2.2:8084/gestioncircuit/showC/${IDC}`);
        if (!response.ok) {
          throw new Error(`Erreur réseau: ${response.status}`);
        }
        const data = await response.json();
        console.log('✅ Détails récupérés:', data);
        setCircuit(data);
      } catch (error) {
        console.error('❌ Erreur lors du chargement des détails du circuit:', error);
      }
    };

    fetchCircuitDetails();
  }, [IDC]);

  const handleEdit = () => {
    console.log('Navigation vers EditCircuit avec ID:', IDC);
    navigation.navigate('EditC', { IDC });
  };

  const handleDelete = async () => {
    try {
      console.log('Suppression du circuit ID:', circuit?.IDC);

      const response = await fetch(`http://10.0.2.2:8084/gestioncircuit/deleteC/${circuit?.IDC}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Erreur de suppression : ${response.status}`);
      }

      console.log('✅ Circuit supprimé avec succès');
      setIsDeleteModalVisible(false); // Ferme le modal après suppression
      navigation.navigate('ShowAllCircuitsScreen');
    } catch (error) {
      console.error('❌ Erreur lors de la suppression du circuit:', error);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false); // Ferme le modal sans effectuer la suppression
  };

  if (!circuit) {
    return <Text style={styles.errorText}>Détails du circuit introuvables.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={{ uri: circuit.ImgUrl }} style={styles.headerImage}>
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>{circuit.Name}</Text>
          <Text style={styles.headerSubtitle}>Circuit {circuit.IDC}</Text>
        </View>
      </ImageBackground>

      <View style={styles.cardsContainer}>
        <View style={styles.quickInfoCard}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Distance</Text>
            <Text style={styles.infoValue}>{circuit.Distance}</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Durée</Text>
            <Text style={styles.infoValue}>{circuit.Duration}</Text>
          </View>
        </View>

        <View style={styles.spacing} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Description</Text>
          <Text style={styles.description}>{circuit.Descreption}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEdit}>
            <MaterialIcons name="edit" size={20} color="white" />
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => setIsDeleteModalVisible(true)} // Affiche le modal de suppression
          >
            <MaterialIcons name="delete" size={20} color="white" />
            <Text style={styles.buttonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de confirmation de suppression */}
      <Modal
        isVisible={isDeleteModalVisible}
        onBackdropPress={handleDeleteCancel}
        onBackButtonPress={handleDeleteCancel}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <MaterialIcons name="warning" size={60} color="#FF6B6B" />
          <Text style={styles.modalTitle}>Confirmation</Text>
          <Text style={styles.modalMessage}>
            Êtes-vous sûr de vouloir supprimer ce circuit ?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleDeleteCancel}
            >
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleDelete}
            >
              <Text style={styles.confirmText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  headerImage: { width: '100%', height: 300 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end', padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#f9dcc4' },
  headerSubtitle: { fontSize: 20, color: '#f5f5dc', marginTop: 5 },
  cardsContainer: { padding: 20 },
  quickInfoCard: {
    backgroundColor: '#e7d8c9',
    borderRadius: 30,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -30,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
  },
  infoItem: { alignItems: 'center' },
  verticalDivider: { width: 1, backgroundColor: '#43291f', marginHorizontal: 15 },
  infoLabel: { fontSize: 13, color: '#43291f', marginBottom: 5 },
  infoValue: { fontSize: 27, fontWeight: 'bold', color: '#333' },
  card: {
    backgroundColor: '#fff8f0',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
  },
  cardTitle: { fontSize: 28, fontWeight: 'bold', color: '#43291f', marginBottom: 10 },
  description: { fontSize: 16, color: '#666', lineHeight: 24 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  button: { flexDirection: 'row', alignItems: 'center', flex: 1, padding: 15, borderRadius: 12, marginHorizontal: 5 },
  editButton: { backgroundColor: '#226f54' },
  deleteButton: { backgroundColor: '#da2c38' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  spacing: { marginBottom: 15 },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginTop: 20 },
  modal: { justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginVertical: 10 },
  modalMessage: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', width: '100%' },
  modalButton: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  cancelButton: { backgroundColor: '#E0E0E0' },
  confirmButton: { backgroundColor: '#da2c38' },
  cancelText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  confirmText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default CircuitDetailsScreen;