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
  MonumentDetails: { IDM: number }; // Route avec l'IDM pour identifier le monument
  Edit: { IDM: number };
};

type MonumentDetailsRouteProp = RouteProp<RootStackParamList, 'MonumentDetails'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'MonumentDetails'>;

// Définition de l'interface Monument
interface Monument {
  IDC: number | null;
  IDM: number | null;
  Name: string;
  Descreption: string;
  ImgUrl: string;
}

const MonumentDetailsScreen: React.FC = () => {
  const route = useRoute<MonumentDetailsRouteProp>();
  const { IDM } = route.params;
  const navigation = useNavigation<NavigationProp>();

  const [monument, setMonument] = useState<Monument | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    const fetchMonumentDetails = async () => {
      try {
        console.log('🔄 Récupération des détails du monument avec IDM:', IDM);
        const response = await fetch(`http://10.0.2.2:8084/gestionmonument/show/${IDM}`);
        if (!response.ok) {
          throw new Error(`Erreur réseau: ${response.status}`);
        }
        const data: Monument = await response.json();
        console.log('✅ Détails récupérés:', data);
        setMonument(data);
      } catch (error) {
        console.error('❌ Erreur lors du chargement des détails du monument:', error);
      }
    };

    fetchMonumentDetails();
  }, [IDM]);

  const handleEdit = () => {
    console.log('Navigation vers EditMonument avec IDM:', IDM);
    navigation.navigate('Edit', { IDM });
  };

  const handleDelete = async () => {
    try {
      console.log('Suppression du monument IDM:', monument?.IDM);
      await fetch(`http://10.0.2.2:8084/gestionmonument/deleteM/${monument?.IDM}`, {
        method: 'DELETE',
      });

      console.log('✅ Monument supprimé avec succès');
      setIsDeleteModalVisible(false); // Ferme le modal après suppression
      navigation.goBack(); // Retour à l'écran précédent après la suppression
    } catch (error) {
      console.error('❌ Erreur lors de la suppression du monument:', error);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false); // Ferme le modal sans effectuer la suppression
  };

  if (!monument) {
    return <Text style={styles.errorText}>Détails du monument introuvables.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={{ uri: monument.ImgUrl }} style={styles.headerImage}>
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>{monument.Name}</Text>
          <Text style={styles.headerSubtitle}>CIrcuit {monument.IDC}</Text>
        </View>
      </ImageBackground>

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Description</Text>
          <Text style={styles.description}>{monument.Descreption}</Text>
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
            Êtes-vous sûr de vouloir supprimer ce monument ?
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
  errorText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MonumentDetailsScreen;
