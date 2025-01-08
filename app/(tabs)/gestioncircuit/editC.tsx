import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, ImageBackground, Alert } from 'react-native';

interface FormData {
  IDC: string;
  Name: string;
  Description: string;
  Duration: string;
  Distance: string;
  ImagUrl: string;
  Color: string;
}

const EditCircuit = ({ route, navigation }: any) => {
  const [formData, setFormData] = useState<FormData>({
    IDC: '',
    Name: '',
    Description: '',
    Duration: '',
    Distance: '',
    ImagUrl: '',
    Color: '',
  });

  useEffect(() => {
    const { IDC } = route.params;
    // Fetch the current data of the circuit to edit
    fetch(`http://10.0.2.2:8084/gestioncircuit/${IDC}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          IDC: data.IDC,
          Name: data.Name,
          Description: data.Description,
          Duration: data.Duration,
          Distance: data.Distance,
          ImagUrl: data.ImagUrl,
          Color: data.Color,
        });
      })
      .catch((error) => {
        Alert.alert('Erreur', 'Impossible de charger les données du circuit.');
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  const handleInputChange = (name: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const { IDC, Name, Description, Duration, Distance, ImagUrl, Color } = formData;

    if (!IDC || !Name || !Description || !Duration || !Distance || !ImagUrl || !Color) {
      Alert.alert('Erreur', 'Tous les champs sont requis.');
      return;
    }

    try {
      const response = await fetch(`http://10.0.2.2:8084/gestioncircuit/editC/${IDC}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Succès', 'Circuit modifié avec succès!');
        navigation.goBack(); // Return to the previous screen
      } else {
        const data = await response.json();
        Alert.alert('Erreur', data.error || 'Une erreur est survenue.');
      }
    } catch (error) {
      Alert.alert('Erreur réseau', 'Veuillez vérifier votre connexion et réessayer.');
      console.error('Erreur lors de l\'envoi des données:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://thumbs.dreamstime.com/b/jardin-jnan-sbil-parc-royal-dans-fes-avec-son-lac-et-paumes-tr%C3%A8s-hautes-fez-maroc-76513116.jpg' }}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Modifier un Circuit</Text>

            {/* Champ pour IDC */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.IDC}
                onChangeText={(value) => handleInputChange('IDC', value)}
                placeholder="IDC (Identifiant du circuit)"
                keyboardType="numeric"
                editable={false}
              />
            </View>

            {/* Champ pour Name */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.Name}
                onChangeText={(value) => handleInputChange('Name', value)}
                placeholder="Nom du circuit"
              />
            </View>

            {/* Champ pour Description */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.Description}
                onChangeText={(value) => handleInputChange('Description', value)}
                placeholder="Description"
                multiline
              />
            </View>

            {/* Champ pour Duration */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.Duration}
                onChangeText={(value) => handleInputChange('Duration', value)}
                placeholder="Durée (ex: 2h)"
              />
            </View>

            {/* Champ pour Distance */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.Distance}
                onChangeText={(value) => handleInputChange('Distance', value)}
                placeholder="Distance (ex: 2.5 Km)"
                keyboardType="numeric"
              />
            </View>

            {/* Champ pour ImagUrl */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.ImagUrl}
                onChangeText={(value) => handleInputChange('ImagUrl', value)}
                placeholder="URL de l'image"
              />
            </View>

            {/* Champ pour Color */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.Color}
                onChangeText={(value) => handleInputChange('Color', value)}
                placeholder="Couleur (ex: #FF0000 ou red)"
              />
            </View>

            {/* Bouton de soumission */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Modifier le Circuit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

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
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
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

export default EditCircuit;

