import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/nwuHeading.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>North West University</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>HMS Management Platform</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About Us</Text>
        <Text style={styles.aboutText}>
          Student Konnekt is an innovative online platform designed to facilitate seamless communication and collaboration between students and lecturers...
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: '#28a745' }]}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Current Modules</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: '#007bff' }]}>
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Assignments Due</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: '#6c757d' }]}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Tests Scheduled</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: '#ffc107' }]}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Events Scheduled</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <FontAwesome name="facebook" size={24} color="white" style={styles.icon} />
        <FontAwesome name="twitter" size={24} color="white" style={styles.icon} />
        <FontAwesome name="linkedin" size={24} color="white" style={styles.icon} />
        <FontAwesome name="instagram" size={24} color="white" style={styles.icon} />
        <FontAwesome name="youtube" size={24} color="white" style={styles.icon} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#5e489d',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5e489d',
  },
  button: {
    backgroundColor: '#5e489d',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  aboutSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5e489d',
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  statBox: {
    width: '45%',
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#343a40',
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default HomeScreen;