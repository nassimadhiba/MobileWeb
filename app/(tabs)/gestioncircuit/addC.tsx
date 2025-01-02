
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, ImageBackground } from 'react-native';

interface FormData {
  NameC: string;
  Description: string;
  Time: string;
  Distance: string;
   
}

const addScreenC = () => {
  const [formData, setFormData] = useState<FormData>({
     
    NameC: '',
    Description: '',
    Time: '',
    Distance: '',
     
  });

  const handleInputChange = (name: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8084/gestioncircuit/addC', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
  
      if (response.ok) {
        alert('Circuit ajouté avec succès!');
        console.log('Données enregistrées:', data);
      } else {
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
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
            <Text style={styles.title}>Add Circuit</Text>


            <View style={styles.inputContainer}>
    
              <TextInput
                style={styles.input}
                value={formData.NameC}
                onChangeText={(value) => handleInputChange('NameC', value)}
                placeholder="Circuit Name"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.Description}
                onChangeText={(value) => handleInputChange('Description', value)}
                placeholder="Description"
                multiline
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.Time}
                onChangeText={(value) => handleInputChange('Time', value)}
                placeholder="Time"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.Distance}
                onChangeText={(value) => handleInputChange('Distance', value)}
                placeholder="Distance"
                keyboardType="numeric"
              />
            </View>

            

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Circuitt</Text>
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Superposition sombre pour lisibilité
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 16,
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

export default addScreenC;
