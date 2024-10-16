import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For local storage
import axios from 'axios';
import RNFS from 'react-native-fs'; // File System module
import Share from 'react-native-share'; // Share module

const GradebookScreen = ({ navigation }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Role-based access control
  const checkStudentAccess = async () => {
    const role = await AsyncStorage.getItem('role');
    if (role !== 'student') {
      Alert.alert('Access Denied', 'Only students can access the Gradebook.');
      navigation.navigate('Login'); // Redirect to login if not a student
    }
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        await checkStudentAccess(); // Check role access first
        const response = await axios.get('http://localhost:8000/assignments');
        setAssignments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const viewFeedback = async (assignmentId) => {
    try {
      // API call to fetch feedback for a specific assignment
      const response = await axios.get(
        `http://localhost:8000/feedback/assignment/${assignmentId}`
      );
      const feedbackData = response.data;

      // Display feedback data in an alert
      Alert.alert('Feedback', JSON.stringify(feedbackData, null, 2));
    } catch (error) {
      console.error('Error fetching feedback:', error);
      Alert.alert('Error', 'Failed to fetch feedback. Please try again.');
    }
  };

  const downloadFeedback = async (assignmentId) => {
    try {
      // API call to download feedback as CSV for a specific assignment
      const response = await axios.get(
        `http://localhost:8000/feedback/assignment/${assignmentId}/download`,
        {
          responseType: 'blob',
        }
      );

      const path = `${RNFS.DocumentDirectoryPath}/feedback_assignment_${assignmentId}.csv`;

      // Write CSV file to file system
      await RNFS.writeFile(path, response.data, 'utf8');

      // Share the downloaded CSV file
      await Share.open({
        url: `file://${path}`,
        type: 'text/csv',
        failOnCancel: false,
      });
    } catch (error) {
      console.error('Error downloading feedback:', error);
      Alert.alert('Error', 'Failed to download feedback. Please try again.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gradebook</Text>
      <FlatList
        data={assignments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.assignmentContainer}>
            <Text style={styles.assignmentTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Due Date: {new Date(item.dueDate).toLocaleDateString()}</Text>
            <Text>Subject: {item.subject}</Text>

            {/* Button to view feedback */}
            <Button
              title="View Feedback"
              onPress={() => viewFeedback(item._id)}
              color="#5e489d"
            />

            {/* Button to download feedback */}
            <Button
              title="Download Feedback"
              onPress={() => downloadFeedback(item._id)}
              color="#5e489d"
            />
          </View>
        )}
      />
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
});

export default GradebookScreen;
