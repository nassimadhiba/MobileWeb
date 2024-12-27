import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { RouteProp } from '@react-navigation/native';  // Importation nécessaire pour typer les routes

// Définition de FormData
interface FormData {
  circuitId: string;
  monumentName: string;
  monumentDescription: string;
  latitude: string;
  longitude: string;
  imageUrl: string;
}

// Définition des types de navigation
type RootStackParamList = {
  EditMonument: { monument: FormData };
  // autres écrans...
};

// Typage de EditScreenProps
interface EditScreenProps {
  route: RouteProp<RootStackParamList, 'EditMonument'>;
}

const EditMonumentScreen: React.FC<EditScreenProps> = ({ route }) => {
  const { monument } = route.params;  // Récupérer les paramètres
  const [formData, setFormData] = useState<FormData>(monument);

  useEffect(() => {
    setFormData(monument);  // Remplir les champs avec les données du monument
  }, [monument]);

  // Gérer la modification des champs du formulaire
  const handleInputChange = (name: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (): Promise<void> => {
    console.log('Updated Monument:', formData);
    // Logique pour mettre à jour le monument
    // Vous pouvez envoyer les données à une API pour la mise à jour
    try {
      // Exemple d'appel à une API (adaptez selon vos besoins)
      const response = await fetch('https://votre-api.com/updateMonument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Monument updated successfully');
      } else {
        alert('Error updating monument');
      }
    } catch (error) {
      console.error('Error updating monument:', error);
      alert('An error occurred while updating the monument');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://thumbs.dreamstime.com/b/jardin-jnan-sbil-parc-royal-dans-fes-avec-son-lac-et-paumes-tr%C3%A8s-hautes-fez-maroc-76513116.jpg' }} // URL de l'image de fond
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Modify Monument</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.circuitId}
                onChangeText={(value) => handleInputChange('circuitId', value)}
                placeholder="Circuit ID"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.monumentName}
                onChangeText={(value) => handleInputChange('monumentName', value)}
                placeholder="Monument Name"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.monumentDescription}
                onChangeText={(value) => handleInputChange('monumentDescription', value)}
                placeholder="Monument Description"
                multiline
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.latitude}
                onChangeText={(value) => handleInputChange('latitude', value)}
                placeholder="Latitude"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.longitude}
                onChangeText={(value) => handleInputChange('longitude', value)}
                placeholder="Longitude"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.imageUrl}
                onChangeText={(value) => handleInputChange('imageUrl', value)}
                placeholder="Image URL"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Update Monument</Text>
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
    fontSize: 37,
    fontWeight: 'bold',
    color: '#ff8500',
    textAlign: 'center',
    marginBottom: 40,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EditMonumentScreen;
