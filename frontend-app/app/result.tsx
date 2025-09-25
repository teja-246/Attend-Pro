import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ResultScreen() {
  const { success, reason } = useLocalSearchParams();
  const isSuccess = success === 'true';

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: isSuccess ? '#4caf50' : '#f44336' }
        ]}>
          <Ionicons 
            name={isSuccess ? 'checkmark-circle' : 'close-circle'} 
            size={80} 
            color="#fff" 
          />
        </View>

        <Text style={styles.title}>
          {isSuccess ? 'Check-in Successful!' : 'Check-in Failed'}
        </Text>

        <Text style={styles.message}>
          {isSuccess 
            ? 'You have been successfully marked present for this class.'
            : reason || 'An error occurred during check-in.'
          }
        </Text>

        {isSuccess && (
          <View style={styles.successDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="time" size={20} color="#4caf50" />
              <Text style={styles.detailText}>
                {new Date().toLocaleTimeString()}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="location" size={20} color="#4caf50" />
              <Text style={styles.detailText}>
                Classroom Location Verified
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>
            {isSuccess ? 'Continue' : 'Try Again'}
          </Text>
        </TouchableOpacity>

        {!isSuccess && (
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => {/* Handle help */}}
          >
            <Ionicons name="help-circle" size={20} color="#1e88e5" />
            <Text style={styles.helpButtonText}>Get Help</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  successDetails: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#1e88e5',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  helpButtonText: {
    color: '#1e88e5',
    fontSize: 16,
    fontWeight: '500',
  },
});
