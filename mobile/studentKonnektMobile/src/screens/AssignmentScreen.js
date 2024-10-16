import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button, Modal, TouchableOpacity, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // For file picker
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AssignmentScreen = ({ navigation }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null); // To track selected assignment
  const [isModalVisible, setIsModalVisible] = useState(false); // For the pop-up form
  const [selectedFile, setSelectedFile] = useState(null); // To store selected file

  useEffect(() => {
    const checkAuthAndFetchAssignments = async () => {
      const token = await AsyncStorage.getItem('token');
      const role = await AsyncStorage.getItem('role'); // Get the role from storage
      
      if (!token || role !== 'student') {
        Alert.alert('Access Denied', 'Only students can access this page.');
        navigation.navigate('Login'); // Redirect to login if not authenticated or not a student
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/assignments', {
          headers: { Authorization: `Bearer ${token}` }, // Use token in the request headers
        });
        setAssignments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setLoading(false);
      }
    };

    checkAuthAndFetchAssignments();
  }, [navigation]);

  // Open the file picker
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(result); // Store the selected file
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  // Handle submit button click
  const handleSubmitAssignment = async () => {
    if (!selectedFile) {
      alert('Please select a file to submit.');
      return;
    }

    const formData = new FormData();
    formData.append('assignmentId', selectedAssignment._id);
    formData.append('video', {
      uri: selectedFile.uri,
      type: selectedFile.type,
      name: selectedFile.name,
    });

    try {
      const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage
      const response = await axios.post('http://localhost:8000/selected', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` // Use token in headers
        },
      });
      alert('Assignment submitted successfully!');
      setIsModalVisible(false); // Close the modal after submission
    } catch (error) {
      console.error('Error submitting assignment:', error);
      alert('Failed to submit assignment. Please try again.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assignments</Text>
      <FlatList
        data={assignments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.assignmentContainer}>
            <Text style={styles.assignmentTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Due Date: {new Date(item.dueDate).toLocaleDateString()}</Text>
            <Text>Subject: {item.subject}</Text>

            {/* Submit button for each assignment */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                setSelectedAssignment(item);
                setIsModalVisible(true); // Show the pop-up form
              }}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal for file upload */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Submit Assignment</Text>
          <Text>{selectedAssignment?.title}</Text>
          <Button title="Choose File" onPress={pickDocument} />
          {selectedFile && <Text>Selected file: {selectedFile.name}</Text>}
          <View style={styles.modalButtons}>
            <Button title="Submit" onPress={handleSubmitAssignment} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  assignmentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#5e489d',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default AssignmentScreen;
