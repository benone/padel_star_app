import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Modal, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import all screens
import Home from './Screens/Home';
import Login from './Screens/Login';
import TabTwoScreen from './(tabs)/explore';
import ProfileScreen from './(tabs)/profile';

interface ScreenInfo {
  name: string;
  component: React.ComponentType;
  description: string;
  status: 'complete' | 'in-progress' | 'planned';
}

const screens: ScreenInfo[] = [
  {
    name: 'Login',
    component: Login,
    description: 'Phone number authentication screen',
    status: 'complete'
  },
  {
    name: 'Home',
    component: Home,
    description: 'Main dashboard with court booking and matches',
    status: 'complete'
  },
  {
    name: 'Explore',
    component: TabTwoScreen,
    description: 'Discovery and information screen',
    status: 'complete'
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    description: 'User profile and settings',
    status: 'complete'
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    complete: 'bg-green-500',
    'in-progress': 'bg-yellow-500',
    planned: 'bg-gray-400'
  };
  
  return (
    <View className={`${colors[status as keyof typeof colors]} px-2 py-1 rounded-full`}>
      <Text className="text-white text-xs font-medium">{status}</Text>
    </View>
  );
};

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
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-6 py-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-900">System Preview</Text>
            <Text className="text-sm text-gray-600 mt-1">All app screens overview</Text>
          </View>
          <View className="bg-blue-100 px-3 py-2 rounded-lg">
            <Text className="text-blue-800 font-medium">{screens.length} Screens</Text>
          </View>
        </View>
      </View>

      {/* Stats Cards */}
      <View className="px-6 py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-4">
          <View className="bg-white rounded-xl p-4 border border-gray-200 mr-3 min-w-[120px]">
            <Text className="text-2xl font-bold text-green-600">
              {screens.filter(s => s.status === 'complete').length}
            </Text>
            <Text className="text-gray-600 text-sm">Complete</Text>
          </View>
          <View className="bg-white rounded-xl p-4 border border-gray-200 mr-3 min-w-[120px]">
            <Text className="text-2xl font-bold text-yellow-600">
              {screens.filter(s => s.status === 'in-progress').length}
            </Text>
            <Text className="text-gray-600 text-sm">In Progress</Text>
          </View>
          <View className="bg-white rounded-xl p-4 border border-gray-200 mr-3 min-w-[120px]">
            <Text className="text-2xl font-bold text-gray-600">
              {screens.filter(s => s.status === 'planned').length}
            </Text>
            <Text className="text-gray-600 text-sm">Planned</Text>
          </View>
        </ScrollView>
      </View>

      {/* Screens Grid */}
      <ScrollView className="flex-1 px-6">
        <View className="gap-4 pb-8">
          {screens.map((screen, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
              onPress={() => openScreen(screen)}
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    {screen.name}
                  </Text>
                  <Text className="text-gray-600 text-sm leading-5">
                    {screen.description}
                  </Text>
                </View>
                <StatusBadge status={screen.status} />
              </View>
              
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="phone-portrait-outline" size={16} color="#6B7280" />
                  <Text className="text-gray-500 text-xs ml-1">React Native</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-blue-600 text-sm font-medium mr-1">Preview</Text>
                  <Ionicons name="chevron-forward" size={16} color="#2563EB" />
                </View>
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
        <SafeAreaView className="flex-1 bg-black">
          {/* Modal Header */}
          <View className="bg-gray-900 px-4 py-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={closeModal}
                className="mr-4 p-2 -ml-2"
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
              <Text className="text-white text-lg font-medium">
                {selectedScreen?.name}
              </Text>
            </View>
            <StatusBadge status={selectedScreen?.status || 'complete'} />
          </View>

          {/* Screen Preview */}
          <View className="flex-1 bg-white">
            {selectedScreen && (
              <selectedScreen.component />
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}