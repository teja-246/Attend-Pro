import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const sessions = [
  { id: '1', date: '2025-09-01', status: 'Present' },
  { id: '2', date: '2025-09-03', status: 'Present' },
  { id: '3', date: '2025-09-05', status: 'Absent' },
  { id: '4', date: '2025-09-08', status: 'Present' },
];

function StatusTag({ status }: { status: string }) {
  const color = status === 'Present' ? '#2e7d32' : status === 'Absent' ? '#c62828' : '#1565c0';
  return (
    <View style={[styles.tag, { backgroundColor: color }]}>
      <Text style={styles.tagText}>{status}</Text>
    </View>
  );
}

export default function CourseDetailScreen({ route }: { route: any }) {
  const { course } = route.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{course?.id} - {course?.name}</Text>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Overall Attendance: 95%</Text>
        <Text style={styles.summaryText}>Absences: 1</Text>
        <Text style={styles.summaryText}>Tardies: 0</Text>
      </View>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.sessionItem}>
            <Text style={styles.sessionDate}>{item.date}</Text>
            <StatusTag status={item.status} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 16 },
  header: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  summary: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 12, marginBottom: 12 },
  summaryText: { marginBottom: 4, fontWeight: '600' },
  sessionItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  sessionDate: { fontSize: 16 },
  tag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  tagText: { color: '#fff', fontWeight: '700' },
});


