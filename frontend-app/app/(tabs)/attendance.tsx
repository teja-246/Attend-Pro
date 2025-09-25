import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const attendanceData = [
  {
    id: '1',
    course: 'Mathematics 101',
    date: '2024-01-15',
    status: 'Present',
    time: '09:00 AM',
    location: 'Room A101',
  },
  {
    id: '2',
    course: 'Physics 201',
    date: '2024-01-15',
    status: 'Present',
    time: '11:00 AM',
    location: 'Room B205',
  },
  {
    id: '3',
    course: 'Chemistry 101',
    date: '2024-01-14',
    status: 'Absent',
    time: '02:00 PM',
    location: 'Room C301',
  },
  {
    id: '4',
    course: 'Biology 201',
    date: '2024-01-14',
    status: 'Present',
    time: '04:00 PM',
    location: 'Room D102',
  },
];

export default function AttendanceScreen() {
  const renderAttendanceItem = ({ item }: { item: any }) => (
    <View style={styles.attendanceCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.courseName}>{item.course}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'Present' ? '#4caf50' : '#f44336' }
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color="#666" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Attendance</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => {/* Handle filter */}}
        >
          <Ionicons name="filter" size={20} color="#1e88e5" />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>This Week</Text>
        <View style={styles.summaryStats}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>4</Text>
            <Text style={styles.summaryLabel}>Total Classes</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>3</Text>
            <Text style={styles.summaryLabel}>Attended</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>75%</Text>
            <Text style={styles.summaryLabel}>Rate</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={attendanceData}
        renderItem={renderAttendanceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    padding: 8,
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e88e5',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  attendanceCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  cardDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});
