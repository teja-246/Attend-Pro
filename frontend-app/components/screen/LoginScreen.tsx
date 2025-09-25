import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Please enter email and password.');
      return;
    }
    await SecureStore.setItemAsync('userEmail', email);
    navigation.replace('Main');
    navigation.navigate('BiometricSetup');
  };

  const onBiometricLogin = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biometrics', 'Biometric authentication is not available.');
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Login with Biometrics' });
    if (result.success) {
      navigation.replace('Main');
    } else {
      Alert.alert('Failed', 'Biometric authentication failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AttendPro</Text>
      <TextInput
        style={styles.input}
        placeholder="University Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.primaryBtn} onPress={onLogin}>
        <Text style={styles.primaryBtnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn} onPress={onBiometricLogin}>
        <Text style={styles.secondaryBtnText}>Login with Fingerprint/Face ID</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>First time here? Register your device.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  primaryBtn: {
    height: 48,
    backgroundColor: '#1e88e5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  secondaryBtn: {
    height: 48,
    borderWidth: 1,
    borderColor: '#1e88e5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  secondaryBtnText: {
    color: '#1e88e5',
    fontWeight: '600',
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    color: '#1e88e5',
  },
});


