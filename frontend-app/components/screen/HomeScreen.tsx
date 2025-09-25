import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const todayClasses = [
  { id: '1', code: 'CS101', time: '10:00 AM' },
  { id: '2', code: 'MA203', time: '1:00 PM' },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View style={styles.ctaWrapper}>
        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('QRScanner')}>
          <Ionicons name="qr-code" size={28} color="#fff" />
          <Text style={styles.ctaText}>Scan to Check-in</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        <FlatList
          data={todayClasses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.classItem}>
              <Text style={styles.classText}>{item.code}</Text>
              <Text style={styles.classTime}>{item.time}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  ctaWrapper: { padding: 24 },
  ctaButton: { height: 64, backgroundColor: '#1e88e5', borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  ctaText: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 8 },
  section: { paddingHorizontal: 24, paddingTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  classItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  classText: { fontSize: 16 },
  classTime: { color: '#616161' },
});


