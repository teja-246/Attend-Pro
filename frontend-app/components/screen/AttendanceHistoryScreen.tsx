import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const courses = [
  { id: 'CS101', name: 'Intro to Programming', attendance: 95 },
  { id: 'ENGL101', name: 'English Composition', attendance: 88 },
  { id: 'MA203', name: 'Calculus II', attendance: 92 },
];

export default function AttendanceHistoryScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CourseDetail', { course: item })}>
            <View>
              <Text style={styles.title}>{item.id}: {item.name}</Text>
            </View>
            <Text style={styles.percent}>{item.attendance}%</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 16 },
  item: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 16, fontWeight: '600' },
  percent: { fontSize: 16, color: '#1e88e5', fontWeight: '700' },
});


