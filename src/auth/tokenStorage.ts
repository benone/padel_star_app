import * as SecureStore from 'expo-secure-store';

const ACCESS_KEY = 'ps.accessToken.v1';

export async function saveAccessToken(token: string) {
  await SecureStore.setItemAsync(ACCESS_KEY, token);
  inMemory.token = token;
}

export async function deleteAccessToken() {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  inMemory.token = null;
}

export async function loadAccessToken(): Promise<string | null> {
  const stored = await SecureStore.getItemAsync(ACCESS_KEY);
  inMemory.token = stored;
  return stored;
}

export const inMemory = { token: null as string | null };