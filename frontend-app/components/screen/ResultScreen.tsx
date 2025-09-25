import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ResultScreen({ route, navigation }: { route: any, navigation: any }) {
  const { success, reason } = route.params || {};

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (success) {
      timer = setTimeout(() => {
        navigation.popToTop();
        navigation.replace('Main');
      }, 3000);
    }
    return () => timer && clearTimeout(timer);
  }, [success]);

  if (success) {
    return (
      <View style={[styles.full, { backgroundColor: '#2e7d32' }]}>
        <Ionicons name="checkmark-circle" size={96} color="#fff" />
        <Text style={styles.text}>Attendance Marked Successfully!</Text>
      </View>
    );
  }
  return (
    <View style={[styles.full, { backgroundColor: '#c62828' }]}>
      <Ionicons name="close-circle" size={96} color="#fff" />
      <Text style={styles.text}>Check-in Failed{reason ? `: ${reason}` : ''}</Text>
      <TouchableOpacity style={styles.retry} onPress={() => navigation.replace('QRScanner')}>
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  full: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', marginTop: 12, fontSize: 18, fontWeight: '600', textAlign: 'center', paddingHorizontal: 24 },
  retry: { marginTop: 16, borderWidth: 1, borderColor: '#fff', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  retryText: { color: '#fff', fontWeight: '600' },
});


