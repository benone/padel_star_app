import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Import all screens
import Home from './Screens/Home';
import Login from './Screens/Login';
import Verify from './Screens/Verify';
import ClubsList from './Screens/ClubsList';
import Menu from './Screens/Menu';

// Simple wrapper for Explore screen to avoid navigation context issues
const ExploreWrapper = () => (
  <View className="items-center justify-center flex-1 bg-gray-100">
    <Text className="mb-4 text-2xl font-bold text-gray-800">Explore Screen</Text>
    <Text className="px-8 text-center text-gray-600">
      This is the Explore tab screen. It uses ParallaxScrollView which requires
      Bottom Tab Navigator context to display properly.
    </Text>
  </View>
);

// Simple wrapper for Profile screen
const ProfileWrapper = () => (
  <View className="items-center justify-center flex-1 bg-gray-100">
    <Text className="mb-4 text-2xl font-bold text-gray-800">Profile Screen</Text>
    <Text className="px-8 text-center text-gray-600">
      This is the Profile tab screen. It also uses ParallaxScrollView which requires
      Bottom Tab Navigator context to display properly.
    </Text>
  </View>
);

interface ScreenInfo {
  name: string;
  component: React.ComponentType;
}

const screens: ScreenInfo[] = [
  { name: 'Login', component: Login },
  { name: 'Verify', component: Verify },
  { name: 'Home', component: Home },
  { name: 'ClubsList', component: ClubsList },
  { name: 'Menu', component: Menu },
  { name: 'Explore', component: ExploreWrapper },
  { name: 'Profile', component: ProfileWrapper }
];

export default function SystemPreview() {
  const [selectedScreen, setSelectedScreen] = useState<ScreenInfo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openScreen = (screen: ScreenInfo) => {
    setSelectedScreen(screen);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedScreen(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-900">Screens Preview</Text>
      </View>

      {/* Screens List */}
      <ScrollView className="flex-1">
        <View className="gap-3 p-4">
          {screens.map((screen, index) => (
            <TouchableOpacity
              key={index}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              onPress={() => openScreen(screen)}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-gray-900">
                  {screen.name}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Full Screen Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SafeAreaView className="flex-1">
          {/* Screen Preview */}
          <View className="flex-1">
            {selectedScreen && <selectedScreen.component />}
          </View>

          {/* Floating Return Button */}
          <TouchableOpacity 
            onPress={closeModal} 
            className="absolute top-12 right-4 bg-black/50 rounded-full p-3 z-10"
            style={{ opacity: 0.7 }}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
