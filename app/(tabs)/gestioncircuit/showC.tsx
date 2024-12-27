import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

interface MonumentDetails {
  name: string;
  description: string;
  circuit_id: string;
  distance: string;
  duration: string;
  photos: string[];
}

type RootStackParamList = {
  ShowMonument: undefined;
  edit: { monument: MonumentDetails };
};

type EditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'edit'>;

const ShowCircuit = () => {
  const navigation = useNavigation<EditScreenNavigationProp>();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const monumentData: MonumentDetails = {
    name: "Murailles et Fortifications",
    description:
      "L'intérêt de cet itinéraire qui épouse le tracé des vieux remparts, réside dans l'architecture militaire de la ville qui témoigne de l'évolution des techniques de construction et du savoir-faire des Maalems Fassis.",
    circuit_id: "1",
    distance: "1,5 km",
    duration: "1h30",
    photos: [],
  };

  const handleEdit = () => {
    navigation.navigate('edit', { monument: monumentData });
  };

  const handleDeleteConfirm = () => {
    console.log('Monument supprimé');
    setDeleteModalVisible(false);
    Alert.alert('Succès', 'Le monument a été supprimé avec succès.');
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://thumbs.dreamstime.com/b/jardin-jnan-sbil-parc-royal-dans-fes-avec-son-lac-et-paumes-tr%C3%A8s-hautes-fez-maroc-76513116.jpg' }}
        style={styles.headerImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>{monumentData.name}</Text>
          <Text style={styles.headerSubtitle}>Circuit {monumentData.circuit_id}</Text>
        </View>
      </ImageBackground>

      <View style={styles.cardsContainer}>
        <View style={styles.quickInfoCard}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Distance</Text>
            <Text style={styles.infoValue}>{monumentData.distance}</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Durée</Text>
            <Text style={styles.infoValue}>{monumentData.duration}</Text>
          </View>
        </View>

        {/* Ajout d'espace entre la carte distance et la carte description */}
        <View style={styles.spacing} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Description</Text>
          <Text style={styles.description}>{monumentData.description}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={handleEdit}
          >
            <MaterialIcons name="edit" size={20} color="white" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => setDeleteModalVisible(true)}
          >
            <MaterialIcons name="delete" size={20} color="white" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

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
            Are you sure you want to delete this monument?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleDeleteCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleDeleteConfirm}
            >
              <Text style={styles.confirmText}>Delete</Text>
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
  modal: { justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: width * 0.9, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginVertical: 10 },
  modalMessage: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', width: '100%' },
  modalButton: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  cancelButton: { backgroundColor: '#E0E0E0' },
  confirmButton: { backgroundColor: '#da2c38' },
  cancelText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  confirmText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  // Style pour l'espace
  spacing: { marginBottom: 15 },
});

export default ShowCircuit;

