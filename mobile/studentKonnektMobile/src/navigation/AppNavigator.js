import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/HomeScreen';
import AssignmentScreen from '../screens/AssignmentScreen';
import GradebookScreen from '../screens/GradebookScreen'; 
import LoginScreen from '../screens/LoginScreen'; // Import the Login screen
import SignupScreen from '../screens/SignupScreen'; // Import the Signup screen

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for token in AsyncStorage to determine if the user is logged in
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsLoggedIn(!!token); // If token exists, user is logged in
        };

        checkLoginStatus();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* If the user is not logged in, show the Login and Signup screens */}
                {!isLoggedIn ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                    </>
                ) : (
                    // If logged in, show the main app screens
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Assignments" component={AssignmentScreen} />
                        <Stack.Screen name="Gradebook" component={GradebookScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
