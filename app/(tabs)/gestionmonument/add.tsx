import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, ImageBackground, Alert } from 'react-native';

interface FormData {
  IDC: string;
  Name: string;
  Description: string;
  ImgUrl: string;
}

const AddMonumentScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    IDC: '',
    Name: '',
    Description: '',
    ImgUrl: '',
  });

  // Gestion des champs du formulaire
  const handleInputChange = (name: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validation et soumission
  const handleSubmit = (): void => {
    if (!formData.IDC || isNaN(Number(formData.IDC))) {
      Alert.alert('Erreur', 'IDC doit être un nombre valide.');
      return;
    }
    if (!formData.Name) {
      Alert.alert('Erreur', 'Le nom du monument est requis.');
      return;
    }
    if (!formData.Description) {
      Alert.alert('Erreur', 'La description est requise.');
      return;
    }
    if (!formData.ImgUrl) {
      Alert.alert('Erreur', "L'URL de l'image est requise.");
      return;
    }

    console.log('Formulaire soumis:', formData);
    Alert.alert('Succès', 'Monument ajouté avec succès!');
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

            {/* IDC */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.IDC}
                onChangeText={(value) => handleInputChange('IDC', value)}
                placeholder="ID du Circuit"
                keyboardType="numeric"
              />
            </View>

            {/* Nom */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.Name}
                onChangeText={(value) => handleInputChange('Name', value)}
                placeholder="Nom du Monument"
              />
            </View>

            {/* Description */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.Description}
                onChangeText={(value) => handleInputChange('Description', value)}
                placeholder="Description du Monument"
                multiline
              />
            </View>

            {/* Image URL */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.ImgUrl}
                onChangeText={(value) => handleInputChange('ImgUrl', value)}
                placeholder="URL de l'image"
              />
            </View>

            {/* Bouton de Soumission */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Ajouter Monument</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 500,
    padding: 20,
    marginVertical: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff8500',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#FF7F24',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddMonumentScreen;
