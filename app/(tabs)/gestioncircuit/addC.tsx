import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, ImageBackground, Alert } from 'react-native';

 
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
  const [formData, setFormData] = useState<FormData>({
    IDC: null,
    Name: '',
    Description: '',
    Distance: '',
    Duration: '',
    ImgUrl: '',
    Color: '',
  });
 
  const handleInputChange = (name: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [name]: name === 'IDC' ? parseInt(value) || null : value, // Conversion en entier pour IDC
    });
  };

 
  const handleSubmit = (): void => {
    if (formData.IDC === null || isNaN(formData.IDC)) {
      Alert.alert('Erreur', 'IDC doit être un nombre valide.');
      return;
    }
    console.log('Form data:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://thumbs.dreamstime.com/b/jardin-jnan-sbil-parc-royal-dans-fes-avec-son-lac-et-paumes-tr%C3%A8s-hautes-fez-maroc-76513116.jpg' }}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Add Circuit</Text>

            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.IDC?.toString() || ''}
                onChangeText={(value) => handleInputChange('IDC', value)}
                placeholder="IDC (Entier)"
                keyboardType="numeric"
              />
            </View>

            
            {(['Name', 'Description', 'Distance', 'Duration', 'ImgUrl', 'Color'] as (keyof FormData)[]).map((field) => (
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
              <Text style={styles.buttonText}>Add Circuit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

// ✅ Styles du formulaire
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
});

export default AddCircuitScreen;
