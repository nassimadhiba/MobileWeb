import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, ImageBackground, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface FormData {
  IDC: number | null;
  Name: string;
  Description: string;
  Distance: string;
  Duration: string;
  ImgUrl: string;
  Color: string;
}

const AddCircuitScreen: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormData>({
    IDC: null,
    Name: '',
    Description: '',
    Distance: '',
    Duration: '',
    ImgUrl: '',
    Color: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (name: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [name]: name === 'IDC' ? parseInt(value) || null : value,
    });
  };

  const handleSubmit = (): void => {
    if (formData.IDC === null || isNaN(formData.IDC)) {
      Alert.alert('Erreur', 'IDC doit être un nombre valide.');
      return;
    }

    console.log('Form data:', formData);

    fetch('http://10.0.2.2:8084/gestioncircuit/addC', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        IDC: formData.IDC,
        Name: formData.Name,
        Description: formData.Description,
        Distance: formData.Distance,
        Duration: formData.Duration,
        ImgUrl: formData.ImgUrl,
        Color: formData.Color,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur serveur. Veuillez réessayer plus tard.');
        }
        return response.text();
      })
      .then((data) => {
        setModalVisible(true); // Afficher la modal après un ajout réussi
        console.log('Server response:', data);
      })
      .catch((error) => {
        console.error('Erreur lors de la soumission:', error);
        Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://thumbs.dreamstime.com/b/jardin-jnan-sbil-parc-royal-dans-fes-avec-son-lac-et-paumes-tr%C3%A8s-hautes-fez-maroc-76513116.jpg' }}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Ajouter un Circuit</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.IDC?.toString() || ''}
                onChangeText={(value) => handleInputChange('IDC', value)}
                placeholder="IDC (Entier)"
                keyboardType="numeric"
              />
            </View>

            {(['Nom', 'Description', 'Distance', 'Durée', 'URL de l image', 'Couleur'] as (keyof FormData)[]).map((field) => (
              <View style={styles.inputContainer} key={field}>
                <TextInput
                  style={styles.input}
                  value={formData[field]?.toString()}
                  onChangeText={(value) => handleInputChange(field, value)}
                  placeholder={field}
                  multiline={field === 'Description'}
                  keyboardType={['Distance', 'Duration'].includes(field) ? 'numeric' : 'default'}
                />
              </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Modal pour afficher le message de succès */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Circuit ajouté avec succès!</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('ShowAllCircuitsScreen'); // Naviguer vers l'écran ShowAllCircuitsScreen après fermeture de la modal
              }}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default AddCircuitScreen;