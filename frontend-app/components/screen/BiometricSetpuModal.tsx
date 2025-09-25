import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function BiometricSetupModal({ navigation }: { navigation: any }) {
  const enableNow = async () => {
    await LocalAuthentication.authenticateAsync({ promptMessage: 'Enable Biometric Login' });
    navigation.goBack();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Enable Quick Login</Text>
        <Text style={styles.text}>Use your Fingerprint or Face ID to log in faster next time.</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={enableNow}>
          <Text style={styles.primaryBtnText}>Enable Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryBtnText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '100%' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  text: { color: '#616161', marginBottom: 16 },
  primaryBtn: { height: 48, backgroundColor: '#1e88e5', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { color: '#fff', fontWeight: '600' },
  secondaryBtn: { height: 48, borderWidth: 1, borderColor: '#1e88e5', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  secondaryBtnText: { color: '#1e88e5', fontWeight: '600' },
});


