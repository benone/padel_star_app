import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/HapticTab';
import { HomeIcon, CommunityIcon, ProfileIcon } from '@/components/ui/TabBarIcons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AuthGate } from '@/src/auth/AuthGate';

export default function TabLayout() {
  const tintColorActive = useThemeColor({}, 'text');
  const tintColorInactive = useThemeColor({}, 'tabIconDefault');

  return (
    <AuthGate>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarActiveTintColor: tintColorActive,
          tabBarInactiveTintColor: tintColorInactive,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              borderTopWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: 'white',
              height: 85,
              paddingTop: 8,
              paddingBottom: 25,
            },
            default: {
              borderTopWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: 'white',
              height: 85,
              paddingTop: 8,
              paddingBottom: 20,
            },
          }),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Inter',
            fontWeight: '500',
            marginTop: 10,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <HomeIcon color={color} size={23} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Community',
            tabBarIcon: ({ color }) => <CommunityIcon color={color} size={25} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <ProfileIcon color={color} size={18} />,
          }}
        />
        </Tabs>
      </SafeAreaView>
    </AuthGate>
  );
}