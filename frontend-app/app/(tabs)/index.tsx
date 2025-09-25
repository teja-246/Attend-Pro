import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const handleQRScan = () => {
    router.push('/qr-scanner');
  };

  const handleAttendance = () => {
    router.push('/(tabs)/attendance');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to AttendPro</Text>
        <Text style={styles.subtitle}>Your attendance tracking companion</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleQRScan}>
          <Ionicons name="qr-code" size={24} color="#fff" />
          <Text style={styles.primaryButtonText}>Scan QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleAttendance}>
          <Ionicons name="list" size={24} color="#1e88e5" />
          <Text style={styles.secondaryButtonText}>View Attendance</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Today's Summary</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Classes Attended</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Attendance Rate</Text>
          </View>
        </View>
      </View>

      <View style={styles.recentActivity}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
          <Text style={styles.activityText}>Checked in to Mathematics 101</Text>
          <Text style={styles.activityTime}>2 hours ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
          <Text style={styles.activityText}>Checked in to Physics 201</Text>
          <Text style={styles.activityTime}>4 hours ago</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1e88e5',
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e3f2fd',
  },
  quickActions: {
    padding: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#1e88e5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e88e5',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#1e88e5',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e88e5',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  recentActivity: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
});