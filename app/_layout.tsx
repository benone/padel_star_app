import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { Splash } from '@/components/Splash';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ApolloProvider } from '@/src/apollo/ApolloProvider';
import { AuthProvider, useAuth } from '@/src/auth/AuthContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ApolloProvider>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootNavigator />
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

function RootNavigator() {
  const { status } = useAuth();

  if (status === 'loading') {
    return <Splash />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Screens/Login" options={{ headerShown: false }} />
      <Stack.Screen name="Screens/Verify" options={{ headerShown: false }} />
      <Stack.Screen name="Screens/ClubsList" options={{ headerShown: false }} />
      <Stack.Screen name="Screens/ClubSchedule" options={{ headerShown: false }} />
      <Stack.Screen name="Screens/OpenMatchList" options={{ headerShown: false }} />
      <Stack.Screen name="Screens/OpenMatch" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
