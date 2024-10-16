import { Platform } from 'react-native';

let BASE_URL;

// Get your local IP address from your Wi-Fi network (e.g., 192.168.1.x)
const LOCAL_NETWORK_IP = '192.168.56.1'; // Replace this with the actual IP address of your computer

if (__DEV__) {
  // Development environment
  if (Platform.OS === 'android') {
    // If using a physical Android device, connect to the local server using the computer's IP
    BASE_URL = `http://${LOCAL_NETWORK_IP}:8000`; 
  } else if (Platform.OS === 'ios') {
    // For iOS simulator, use localhost
    BASE_URL = 'http://localhost:8000';
  } else {
    // For other platforms, fallback to local network IP (if necessary)
    BASE_URL = `http://${LOCAL_NETWORK_IP}:8000`;
  }
} else {
  // Production environment
  BASE_URL = 'http://localhost:8000'; // production URL here
}

export { BASE_URL };
