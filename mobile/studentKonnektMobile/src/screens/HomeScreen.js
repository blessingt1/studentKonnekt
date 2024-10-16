import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Remove the stored token
      Alert.alert('Success', 'You have been logged out.');
      navigation.navigate('Login'); // Redirect to login screen after logging out
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to StudentKonnect</Text>
      
      {/* Button to navigate to Assignments */}
      <Button 
        title="Go to Assignments"
        onPress={() => navigation.navigate('Assignments')} 
      />

      {/* Button to navigate to Gradebook */}
      <View style={styles.buttonSpacing}>
        <Button 
          title="Go to Gradebook"
          onPress={() => navigation.navigate('Gradebook')} // Navigate to GradebookScreen
          color="#5e489d" // Custom color for the button
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonSpacing: {
    marginTop: 20, // Add spacing between buttons
  },
  logoutButton: {
    marginTop: 40,
    padding: 10,
    backgroundColor: '#ff5252',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
