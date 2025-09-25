import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QRScannerScreen() {
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
        router.replace('/result?success=true');
      } else {
        router.replace('/result?success=false&reason=You are not within the classroom\'s location.');
      }
    } catch (e: any) {
      router.replace(`/result?success=false&reason=${e.message || 'Check-in failed'}`);
    }
  };

  if (!permission) {
    return (
      <View style={styles.center}> 
        <ActivityIndicator />
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }
  
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Ionicons name="camera" size={64} color="#ccc" />
        <Text style={styles.permissionText}>No access to camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Request Permission</Text>
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
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.scannerArea}>
          <View style={styles.square} />
          <Text style={styles.instructions}>
            Point your camera at the QR code displayed in your classroom
          </Text>
        </View>
        
        {scanning && (
          <View style={styles.scanningOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.scanningText}>Processing...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  center: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  permissionText: {
    fontSize: 18,
    color: '#333',
    marginTop: 16,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#1e88e5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  overlay: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    padding: 20,
    paddingTop: 60,
    alignItems: 'flex-end',
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  scannerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: { 
    width: 240, 
    height: 240, 
    borderWidth: 3, 
    borderColor: '#ffffff', 
    borderRadius: 12, 
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginBottom: 40,
  },
  instructions: { 
    color: '#fff', 
    paddingHorizontal: 24, 
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  scanningOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanningText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
  },
});
