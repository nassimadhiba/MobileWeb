import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = {
  CircuitDetails: { IDC: number };
  EditC: { IDC: number };
};

type EditCRouteProp = RouteProp<RootStackParamList, 'EditC'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'EditC'>;

interface Circuit {
  IDC: number;
  Name: string;
  Descreption: string;
  Distance: string;
  Duration: string;
  ImgUrl: string;
  Color: string;
}

const EditCircuitScreen: React.FC = () => {
  const route = useRoute<EditCRouteProp>();
  const { IDC } = route.params;
  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchCircuitDetails = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8084/gestioncircuit/showC/${IDC}`);
        const data = await response.json();
        setName(data.Name);
        setDescription(data.Descreption);
        setDistance(data.Distance);
        setDuration(data.Duration);
        setImgUrl(data.ImgUrl);
      } catch (error) {
        showModal('Erreur', "Impossible de charger les détails du circuit.");
      }
    };
    fetchCircuitDetails();
  }, [IDC]);

  const showModal = (title: string, message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!name || !description || !distance || !duration || !imgUrl) {
      showModal('Erreur', 'Tous les champs doivent être remplis.');
      return;
    }

    try {
      await fetch(`http://10.0.2.2:8084/gestioncircuit/editC/${IDC}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: name,
          Descreption: description,
          Distance: distance,
          Duration: duration,
          ImgUrl: imgUrl,
        }),
      });
      showModal('Succès', 'Les informations ont été mises à jour.');

      setTimeout(() => {
        navigation.navigate('CircuitDetails', { IDC: IDC })
      }, 2000); // Attendre 2 secondes avant de revenir
    } catch {
      showModal('Erreur', "Une erreur est survenue lors de la mise à jour.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={{ uri: imgUrl }} style={styles.headerImage}>
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>Modifier le circuit</Text>
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Distance"
          value={distance}
          onChangeText={setDistance}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Durée"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="URL de l'image"
          value={imgUrl}
          onChangeText={setImgUrl}
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
    backgroundColor: '#166534',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default EditCircuitScreen;
