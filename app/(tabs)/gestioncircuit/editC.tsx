import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Alert,
  ActivityIndicator
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface FormData {
  IDC: number | null;
  Name: string;
  Description: string;
  Distance: string;
  Duration: string;
  ImgUrl: string;
  Color: string;
}

interface RouteParams {
  circuitId: number;
}

type EditCircuitScreenProps = {
  route: RouteProp<{ EditCircuit: RouteParams }, 'EditCircuit'>;
  navigation: StackNavigationProp<any>;
};

const EditCircuitScreen: React.FC<EditCircuitScreenProps> = ({ route, navigation }) => {
  const { circuitId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    IDC: null,
    Name: '',
    Description: '',
    Distance: '',
    Duration: '',
    ImgUrl: '',
    Color: '',
  });

  useEffect(() => {
    fetchCircuitData();
  }, [circuitId]);

  const fetchCircuitData = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8084/gestioncircuit/showC/${circuitId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch circuit data');
      }
      const data = await response.json();
      setFormData({
        IDC: data.IDC,
        Name: data.Name,
        Description: data.Description,
        Distance: data.Distance,
        Duration: data.Duration,
        ImgUrl: data.ImgUrl,
        Color: data.Color,
      });
    } catch (error) {
      console.error('Error fetching circuit:', error);
      Alert.alert('Error', 'Failed to load circuit data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (name: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [name]: name === 'IDC' ? parseInt(value) || null : value,
    });
  };

  const validateForm = (): boolean => {
    if (!formData.IDC || isNaN(formData.IDC)) {
      Alert.alert('Error', 'IDC must be a valid number');
      return false;
    }
    if (!formData.Name.trim()) {
      Alert.alert('Error', 'Name is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const response = await fetch(`http://10.0.2.2:8084/gestioncircuit/editC/${circuitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update circuit');
      }

      Alert.alert('Success', 'Circuit updated successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Error updating circuit:', error);
      Alert.alert('Error', 'Failed to update circuit');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7F24" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://thumbs.dreamstime.com/b/jardin-jnan-sbil-parc-royal-dans-fes-avec-son-lac-et-paumes-tr%C3%A8s-hautes-fez-maroc-76513116.jpg' }}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Edit Circuit</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.IDC?.toString() || ''}
                onChangeText={(value) => handleInputChange('IDC', value)}
                placeholder="IDC (Number)"
                keyboardType="numeric"
                editable={false} // IDC shouldn't be editable in edit mode
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

            <TouchableOpacity 
              style={[styles.button, isSaving && styles.disabledButton]} 
              onPress={handleSubmit}
              disabled={isSaving}
            >
              <Text style={styles.buttonText}>
                {isSaving ? 'Updating...' : 'Update Circuit'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.cancelButton]} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
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
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  button: {
    backgroundColor: '#FF7F24',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  cancelButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FF7F24',
  },
  cancelButtonText: {
    color: '#FF7F24',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EditCircuitScreen;