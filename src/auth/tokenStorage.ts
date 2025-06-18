import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const ACCESS_KEY = 'ps.accessToken.v1';

// Web fallback storage
const webStorage = {
  setItem: async (key: string, value: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  },
  getItem: async (key: string): Promise<string | null> => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  deleteItem: async (key: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  },
};

export async function saveAccessToken(token: string) {
  if (Platform.OS === 'web') {
    await webStorage.setItem(ACCESS_KEY, token);
  } else {
    await SecureStore.setItemAsync(ACCESS_KEY, token);
  }
  inMemory.token = token;
}

export async function deleteAccessToken() {
  if (Platform.OS === 'web') {
    await webStorage.deleteItem(ACCESS_KEY);
  } else {
    await SecureStore.deleteItemAsync(ACCESS_KEY);
  }
  inMemory.token = null;
}

export async function loadAccessToken(): Promise<string | null> {
  let stored: string | null = null;
  
  if (Platform.OS === 'web') {
    stored = await webStorage.getItem(ACCESS_KEY);
  } else {
    stored = await SecureStore.getItemAsync(ACCESS_KEY);
  }
  
  inMemory.token = stored;
  return stored;
}

export const inMemory = { token: null as string | null };