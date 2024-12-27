import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, ImageBackground } from 'react-native';

interface FormData {
  circuitId: string;
  monumentName: string;
  monumentDescription: string;
  latitude: string;
  longitude: string;
  imageUrl: string;
}

const addScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    circuitId: '',
    monumentName: '',
    monumentDescription: '',
    latitude: '',
    longitude: '',
    imageUrl: '',
  });

  const handleInputChange = (name: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (): void => {
    console.log('Form data:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://thumbs.dreamstime.com/b/jardin-jnan-sbil-parc-royal-dans-fes-avec-son-lac-et-paumes-tr%C3%A8s-hautes-fez-maroc-76513116.jpg' }} // URL de l'image de fond
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Add Monument</Text>

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
              <Text style={styles.buttonText}>Add Monument</Text>
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

export default addScreen;
