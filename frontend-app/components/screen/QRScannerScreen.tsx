import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QRScannerScreen({ navigation }: { navigation: any }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);

  const onScanned = async ({ data }: { data: any }) => {
    if (scanning) return;
    setScanning(true);
    try {
      const locPerm = await Location.requestForegroundPermissionsAsync();
      if (locPerm.status !== 'granted') {
        throw new Error('Location permission denied');
      }
      const location = await Location.getCurrentPositionAsync({});
      const deviceId = await SecureStore.getItemAsync('deviceId');

      // Simulate sending to backend
      await new Promise((res) => setTimeout(res, 1200));
      const withinRange = true; // mock validation

      if (withinRange) {
        navigation.replace('Result', { success: true });
      } else {
        navigation.replace('Result', { success: false, reason: 'You are not within the classroom\'s location.' });
      }
    } catch (e: any) {
      navigation.replace('Result', { success: false, reason: e.message || 'Check-in failed' });
    }
  };

  if (!permission) {
    return (
      <View style={styles.center}> 
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Requesting camera permission...</Text>
      </View>
    );
  }
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        onBarcodeScanned={onScanned} 
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject} 
      />
      <View style={styles.overlay}>
        <View style={styles.square} />
        <Text style={styles.instructions}>Point your camera at the QR code displayed in your classroom.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  square: { width: 240, height: 240, borderWidth: 3, borderColor: '#ffffff', borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.15)' },
  instructions: { position: 'absolute', bottom: 80, color: '#fff', paddingHorizontal: 24, textAlign: 'center' },
});


