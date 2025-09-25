import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

function generateDeviceId() {
  const base = `${Platform.OS}-${Platform.Version}-${Date.now()}`;
  return `device_${Buffer.from(base).toString('base64')}`;
}

export default function RegistrationScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onRegister = async () => {
    if (!email || !password || !confirm) {
      Alert.alert('Validation', 'All fields are required.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Validation', 'Passwords do not match.');
      return;
    }
    const deviceId = generateDeviceId();
    await SecureStore.setItemAsync('deviceId', deviceId);
    await SecureStore.setItemAsync('userEmail', email);
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Your Device</Text>
      <Text style={styles.info}>For security, we need to register this device to your account. This is a one-time setup.</Text>
      <TextInput style={styles.input} placeholder="University Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirm} onChangeText={setConfirm} />
      <TouchableOpacity style={styles.primaryBtn} onPress={onRegister}>
        <Text style={styles.primaryBtnText}>Register and Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#ffffff' },
  title: { fontSize: 24, fontWeight: '700', marginTop: 24, marginBottom: 12 },
  info: { color: '#616161', marginBottom: 16 },
  input: { height: 48, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12, paddingHorizontal: 12, marginBottom: 12 },
  primaryBtn: { height: 48, backgroundColor: '#1e88e5', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  primaryBtnText: { color: '#ffffff', fontWeight: '600' },
});


