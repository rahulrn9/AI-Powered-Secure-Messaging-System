import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const biometricAuth = new ReactNativeBiometrics();

const authenticateWithBiometrics = async () => {
  try {
    const result = await biometricAuth.simplePrompt({ promptMessage: 'Authenticate with Biometrics' });
    if (result.success) console.log('Authentication successful');
    else console.log('Authentication failed');
  } catch (error) {
    console.error(error);
  }
};
export default authenticateWithBiometrics;
