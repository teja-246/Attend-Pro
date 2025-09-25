import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export async function getOrCreateDeviceId() {
  let deviceId = await SecureStore.getItemAsync('deviceId');
  if (deviceId) return deviceId;
  const raw = `${Platform.OS}-${Platform.Version}-${Date.now()}`;
  deviceId = `device_${Buffer.from(raw).toString('base64')}`;
  await SecureStore.setItemAsync('deviceId', deviceId);
  return deviceId;
}


