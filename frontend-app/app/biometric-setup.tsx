import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BiometricSetupModal() {
  const enableNow = async () => {
    try {
      await LocalAuthentication.authenticateAsync({ 
        promptMessage: 'Enable Biometric Login' 
      });
      router.back();
    } catch (error) {
      console.error('Biometric authentication failed:', error);
    }
  };

  const handleMaybeLater = () => {
    router.back();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="finger-print" size={48} color="#1e88e5" />
        </View>
        
        <Text style={styles.title}>Enable Quick Login</Text>
        <Text style={styles.description}>
          Use your Fingerprint or Face ID to log in faster next time.
        </Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={enableNow}>
          <Ionicons name="finger-print" size={20} color="#fff" />
          <Text style={styles.primaryBtnText}>Enable Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={handleMaybeLater}>
          <Text style={styles.secondaryBtnText}>Maybe Later</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>
          You can always enable this later in your profile settings.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 24 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 24, 
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  description: { 
    color: '#666', 
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  primaryBtn: { 
    backgroundColor: '#1e88e5', 
    height: 48, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryBtnText: { 
    color: '#fff', 
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryBtn: { 
    height: 48, 
    borderWidth: 1, 
    borderColor: '#1e88e5', 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%',
    marginBottom: 16,
  },
  secondaryBtnText: { 
    color: '#1e88e5', 
    fontWeight: '600',
    fontSize: 16,
  },
  infoText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});
