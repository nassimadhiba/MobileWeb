import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, ImageBackground, Alert } from 'react-native';

interface FormData {
  IDC: number | null; // ID du circuit associé
  IDM: number | null; // ID unique pour le monument
  Name: string;
  Descreption: string;
  ImgUrl: string;
}

const AddMonumentScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    IDC: null,
    IDM: null,
    Name: '',
    Descreption: '',
    ImgUrl: '',
  });

  // Gestion des champs du formulaire
  const handleInputChange = (name: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [name]: ['IDC', 'IDM'].includes(name) ? parseInt(value) || null : value,
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
    fetch('http://10.0.2.2:8084/gestionmonument/add', {
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
        Alert.alert('Succès', 'Monument ajouté avec succès.');
        console.log('Réponse du serveur :', data);
      })
     .catch((error) => {
  console.error('Erreur lors de la soumission:', error);
  Alert.alert('Erreur', `Une erreur est survenue : ${error.message}`);
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
                  placeholder={field === 'Name' ? 'Nom du Monument' : field === 'Descreption' ? 'Descreption' : "URL de l'image"}
                  multiline={field === 'Descreption'}
                />
              </View>
            ))}

            {/* Bouton de soumission */}
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
  container: { flex: 1 },
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  scrollView: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  formContainer: { width: '100%', maxWidth: 500, padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 10 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#ff8500', textAlign: 'center', marginBottom: 20 },
  inputContainer: { marginBottom: 15 },
  input: { backgroundColor: '#fff', borderRadius: 5, padding: 10, fontSize: 16, borderWidth: 1, borderColor: '#ccc' },
  button: { backgroundColor: '#FF7F24', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});

export default AddMonumentScreen;
