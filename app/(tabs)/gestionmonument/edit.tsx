import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Types for navigation
type RootStackParamList = {
  MonumentDetails: { IDM: number };
  EditMonument: { IDM: number };
};

type MonumentDetailsRouteProp = RouteProp<RootStackParamList, 'EditMonument'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'EditMonument'>;

// Interface for Monument
interface Monument {
  IDC: number | null;
  IDM: number | null;
  Name: string;
  Descreption: string;
  ImgUrl: string;
}

const EditMonumentScreen: React.FC = () => {
  const route = useRoute<MonumentDetailsRouteProp>();
  const { IDM } = route.params;
  const navigation = useNavigation<NavigationProp>();

  const [monument, setMonument] = useState<Monument | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchMonumentDetails = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8084/gestionmonument/show/${IDM}`);
        if (!response.ok) {
          throw new Error(`Erreur réseau: ${response.status}`);
        }
        const data: Monument = await response.json();
        setMonument(data);
        setName(data.Name);
        setDescription(data.Descreption);
        setImgUrl(data.ImgUrl);
      } catch (error) {
        showModal('Erreur', 'Impossible de charger les détails du monument.');
      }
    };

    fetchMonumentDetails();
  }, [IDM]);

  const showModal = (title: string, message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!name || !description || !imgUrl) {
      showModal('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      const updatedMonument = {
        IDC: monument?.IDC,
        IDM: monument?.IDM,
        Name: name,
        Descreption: description,
        ImgUrl: imgUrl,
      };

      if (!IDM) {
        showModal('Erreur', 'IDM est manquant');
        return;
      }

      const response = await fetch(`http://10.0.2.2:8084/gestionmonument/edit/${IDM}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMonument),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour: ${response.status}`);
      }

      showModal('Succès', 'Monument mis à jour avec succès');

      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      showModal('Erreur', 'Une erreur est survenue lors de la mise à jour.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: imgUrl || 'https://via.placeholder.com/300' }}
        style={styles.headerImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>Modifier le monument</Text>
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nom du monument</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nom du monument"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Description du monument"
          multiline
        />

        <Text style={styles.label}>URL de l'image</Text>
        <TextInput
          style={styles.input}
          value={imgUrl}
          onChangeText={setImgUrl}
          placeholder="URL de l'image du monument"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <MaterialIcons name="save" size={20} color="white" />
          <Text style={styles.saveButtonText}>Sauvegarder</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{modalMessage}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f9dcc4',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#226f54',
    borderRadius: 12,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 18,
  },
  modalButton: {
    backgroundColor: '#1D4ED8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default EditMonumentScreen;
