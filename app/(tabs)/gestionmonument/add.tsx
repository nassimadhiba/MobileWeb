import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

interface FormData {
  IDC: number | null;
  IDM: number | null;
  Name: string;
  Descreption: string;
  ImgUrl: string;
}

const AddMonumentScreen: React.FC = () => {
  const navigation = useNavigation(); // Utilisez useNavigation pour la navigation
  const [formData, setFormData] = useState<FormData>({
    IDC: null,
    IDM: null,
    Name: '',
    Descreption: '',
    ImgUrl: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false); // État pour la visibilité de la modal

  const handleInputChange = (name: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [name]: name === 'IDM' || name === 'IDC' ? parseInt(value) || null : value, // Conversion en entier pour IDC et IDM
    });
  };

  // Validation et soumission
  const handleSubmit = (): void => {
    const { IDC, IDM, Name, Descreption, ImgUrl } = formData;

    if (IDC === null || isNaN(IDC)) {
      Alert.alert('Erreur', 'IDC doit être un entier valide.');
      return;
    }
    if (IDM === null || isNaN(IDM)) {
      Alert.alert('Erreur', 'IDM doit être un entier valide.');
      return;
    }
    if (!Name.trim()) {
      Alert.alert('Erreur', 'Le nom du monument est requis.');
      return;
    }
    if (!Descreption.trim()) {
      Alert.alert('Erreur', 'La description est requise.');
      return;
    }
    if (!ImgUrl.trim()) {
      Alert.alert('Erreur', "L'URL de l'image est requise.");
      return;
    }

    console.log('Form data:', formData);

    // Requête POST
    fetch('http://100.103.104.110:8084/gestionmonument/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        IDC: formData.IDC,
        IDM: formData.IDM,
        Name: formData.Name,
        Descreption: formData.Descreption,
        ImgUrl: formData.ImgUrl,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur serveur. Veuillez réessayer plus tard.');
        }
        return response.text();
      })
      .then((data) => {
        setIsModalVisible(true); // Afficher la modal après un ajout réussi
        console.log('Réponse du serveur :', data);
      })
      .catch((error) => {
        console.error('Erreur lors de la soumission:', error);
        Alert.alert('Erreur', `Une erreur est survenue : ${error.message}`);
      });
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Fermer la modal
    navigation.navigate('ShowAlMonumentsScreen'); // Rediriger vers la page des monuments
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://thumbs.dreamstime.com/b/jardin-jnan-sbil-parc-royal-dans-fes-avec-son-lac-et-paumes-tr%C3%A8s-hautes-fez-maroc-76513116.jpg' }}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Ajouter un Monument</Text>

            {/* IDC et IDM */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.IDC?.toString() || ''}
                onChangeText={(value) => handleInputChange('IDC', value)}
                placeholder="ID du Circuit (Entier)"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.IDM?.toString() || ''}
                onChangeText={(value) => handleInputChange('IDM', value)}
                placeholder="ID du Monument (Entier)"
                keyboardType="numeric"
              />
            </View>

            {/* Autres champs */}
            {(['Name', 'Descreption', 'ImgUrl'] as (keyof FormData)[]).map((field) => (
              <View style={styles.inputContainer} key={field}>
                <TextInput
                  style={styles.input}
                  value={formData[field]?.toString()}
                  onChangeText={(value) => handleInputChange(field, value)}
                  placeholder={field === 'Name' ? 'Nom du Monument' : field === 'Descreption' ? 'Description' : "URL de l'image"}
                  multiline={field === 'Descreption'}
                />
              </View>
            ))}

            {/* Bouton de soumission */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Boîte de dialogue modale */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Succès</Text>
            <Text style={styles.modalMessage}>Le monument a été ajouté avec succès.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  scrollView: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  formContainer: { width: '100%', maxWidth: 500, padding: 20 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#ff8500', textAlign: 'center', marginBottom: 20 },
  inputContainer: { marginBottom: 15 },
  input: { backgroundColor: '#fff', borderRadius: 5, padding: 10, fontSize: 16 },
  button: { backgroundColor: '#FF7F24', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },

  // Styles pour la modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FF7F24',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddMonumentScreen;