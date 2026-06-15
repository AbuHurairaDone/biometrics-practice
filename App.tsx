import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export default function AndroidBiometricAuth() {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // Check karein ke Android device mein biometric set hai ya nahi
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available } = resultObject;
        if (available) {
          setIsAvailable(true);
        }
      })
      .catch((err) => console.log('Sensor check error:', err));
  }, []);

  const handleAndroidAuth = async () => {
    if (!isAvailable) {
      Alert.alert('Not Supported', 'Firgerprint not working.');
      return;
    }

    try {
      // Android ka native BiometricPrompt show karein
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Fingerprint verify',
        cancelButtonText: 'Cancel',
      });

      if (success) {
        Alert.alert('Successfully ✅', 'App successfully unlocked!');
      } else {
        Alert.alert('Auth Failed ❌', 'Verification failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Biometric prompt system issue.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Android Secure Lock</Text>
      <Text style={styles.subtitle}>
        Status: {isAvailable ? 'Biometrics Ready' : 'Not Setup'}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleAndroidAuth}>
        <Text style={styles.buttonText}>Scan Biometrics</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3f51b5', // Android Material Indigo color
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    elevation: 2, // Android Native Shadow
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});