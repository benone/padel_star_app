import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  Pressable, 
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OpenMatch() {
  return (
    <View
      className="bg-white relative rounded-lg flex-1"
      data-name="Screen/OpenMatch"
    >
      <StatusBar barStyle="light-content" />
      
      <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
        {/* Header with background image */}
        <View className="relative h-[220px] w-full">
          <Image
            source={require('@/assets/figma/open-match-bg.png')}
            className="h-[220px] w-full"
            resizeMode="cover"
          />
          
          {/* Dark overlay */}
          <View className="absolute inset-0 bg-black/10" />
          
          {/* Status bar area */}
          <View className="absolute top-0 left-0 right-0 h-10 flex-row items-center justify-between px-4">
            {/* Time indicator */}
            <View className="bg-green-500 rounded-full px-2 py-0.5">
              <Text className="text-white text-xs font-bold">09:54</Text>
            </View>
            
            {/* Right status indicators */}
            <View className="flex-row items-center">
              <Text className="text-white text-sm mr-2">5G</Text>
              <Ionicons name="cellular" size={14} color="white" style={{ marginRight: 8 }} />
              <Ionicons name="wifi" size={14} color="white" />
            </View>
          </View>
          
          {/* Navigation buttons */}
          <View className="absolute top-16 left-4 right-4 flex-row justify-between">
            <Pressable className="bg-white/20 rounded-full w-10 h-10 items-center justify-center">
              <Ionicons name="chevron-back" size={20} color="white" />
            </Pressable>
            
            <View className="flex-row gap-3">
              <Pressable className="bg-white/20 rounded-full w-10 h-10 items-center justify-center">
                <Ionicons name="share-outline" size={20} color="white" />
              </Pressable>
              <Pressable className="bg-white/20 rounded-full w-10 h-10 items-center justify-center">
                <Ionicons name="ellipsis-vertical" size={20} color="white" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="px-4 pb-28">
          {/* Warning banner */}
          <View className="bg-yellow-50 rounded-lg p-4 mb-4 flex-row items-center shadow-sm">
            <View className="bg-yellow-200 rounded-full w-6 h-6 items-center justify-center mr-3">
              <Ionicons name="warning" size={14} color="#d97706" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 text-sm font-medium">
                The registration for this match ends
              </Text>
              <Text className="text-gray-700 text-sm font-medium">today</Text>
            </View>
          </View>

          {/* Match details card */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            {/* Header */}
            <View className="flex-row items-center mb-5">
              <View className="w-8 h-6 mr-4 items-center justify-center">
                <Ionicons name="basketball" size={24} color="#6b7280" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 text-lg font-bold">PADEL</Text>
                <Text className="text-gray-500 text-sm">Thursday, June 26 17:30 - 19:00</Text>
              </View>
            </View>

            {/* Divider */}
            <View className="h-px bg-gray-200 mb-5" />

            {/* Details row */}
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-gray-500 text-xs">Gender</Text>
                <Text className="text-gray-800 text-base font-semibold mt-1">All players</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-500 text-xs">Level</Text>
                <Text className="text-gray-800 text-base font-semibold mt-1">3.97-5.88</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-500 text-xs">Price</Text>
                <Text className="text-gray-800 text-base font-semibold mt-1">€8.99</Text>
              </View>
            </View>
          </View>

          {/* Match type card */}
          <View className="bg-white rounded-xl p-3 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="people" size={16} color="#4b5563" style={{ marginRight: 12 }} />
                <Text className="text-gray-800 text-base font-medium">Open Match</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={16} color="#059669" style={{ marginRight: 8 }} />
                <Text className="text-gray-600 text-sm">Court reserved</Text>
              </View>
            </View>
          </View>

          {/* Reliability card */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full items-center justify-center">
                  <Text className="text-indigo-600 text-xs font-bold">0%</Text>
                </View>
                <Text className="text-gray-800 text-base font-medium ml-3">Reliability ok!</Text>
              </View>
              <Ionicons name="information-circle-outline" size={16} color="#6b7280" />
            </View>
            
            {/* Progress bar */}
            <View className="bg-gray-200 h-2 rounded-full mb-2">
              <View className="bg-indigo-600 h-2 w-1 rounded-full" />
              <View className="absolute -top-1 -left-1 bg-white w-4 h-4 rounded-full border-2 border-indigo-600" />
            </View>
          </View>

          {/* Players card */}
          <View className="bg-white rounded-xl mb-4 shadow-sm overflow-hidden">
            <View className="p-4 pb-0">
              <Text className="text-gray-900 text-lg font-bold">Players</Text>
            </View>
            
            {/* Team headers */}
            <View className="flex-row h-10">
              <View className="flex-1 items-center justify-center border-r border-gray-200">
                <Text className="text-gray-400 text-base font-bold">A</Text>
              </View>
              <View className="flex-1 items-center justify-center">
                <Text className="text-gray-400 text-base font-bold">B</Text>
              </View>
            </View>
            
            {/* Players */}
            <View className="border-t border-gray-200">
              <View className="flex-row h-29">
                {/* Alberto */}
                <View className="w-22 items-center py-2 border-r border-gray-200">
                  <Image
                    source={require('@/assets/figma/alberto-avatar.png')}
                    className="w-12 h-12 rounded-full mb-2"
                    resizeMode="cover"
                  />
                  <Text className="text-gray-800 text-sm font-semibold">Alberto</Text>
                  <View className="bg-lime-200 rounded-full px-2 py-0.5 mt-1">
                    <Text className="text-lime-800 text-xs font-bold">5.88</Text>
                  </View>
                </View>
                
                {/* Juan */}
                <View className="w-22 items-center py-2 border-r border-gray-200">
                  <View className="w-12 h-12 bg-slate-700 rounded-full items-center justify-center mb-2">
                    <Text className="text-white text-lg font-bold">JL</Text>
                  </View>
                  <Text className="text-gray-800 text-sm font-semibold">Juan</Text>
                  <View className="bg-lime-200 rounded-full px-2 py-0.5 mt-1">
                    <Text className="text-lime-800 text-xs font-bold">3.97</Text>
                  </View>
                </View>
                
                {/* Available slot 1 */}
                <View className="w-22 items-center py-2 border-r border-gray-200">
                  <Pressable className="w-12 h-12 bg-gray-100 rounded-full border-2 border-dashed border-gray-300 items-center justify-center mb-2">
                    <Ionicons name="add" size={20} color="#9ca3af" />
                  </Pressable>
                  <Text className="text-gray-500 text-sm">Available</Text>
                </View>
                
                {/* Available slot 2 */}
                <View className="w-22 items-center py-2">
                  <Pressable className="w-12 h-12 bg-gray-100 rounded-full border-2 border-dashed border-gray-300 items-center justify-center mb-2">
                    <Ionicons name="add" size={20} color="#9ca3af" />
                  </Pressable>
                  <Text className="text-gray-500 text-sm">Available</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Chat button */}
          <Pressable className="bg-indigo-600 rounded-full h-12 flex-row items-center justify-center mb-4 shadow-lg">
            <Ionicons name="chatbubble-outline" size={16} color="white" style={{ marginRight: 8 }} />
            <Text className="text-white text-base font-semibold">Chat</Text>
          </Pressable>

          {/* Location card */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row">
              <View className="w-20 h-20 rounded-lg overflow-hidden mr-4">
                <Image
                  source={require('@/assets/figma/club-location-image.png')}
                  className="w-20 h-20"
                  resizeMode="cover"
                />
              </View>
              
              <View className="flex-1 justify-center">
                <Text className="text-gray-900 text-base font-bold mb-1">
                  Family Sport Center...
                </Text>
                <Text className="text-gray-500 text-sm mb-2">
                  Calle Barranco numero 50, 4...
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-indigo-600 text-sm font-semibold">More info</Text>
                  <Ionicons name="chevron-forward" size={12} color="#4f46e5" style={{ marginLeft: 4 }} />
                </View>
              </View>
              
              <Pressable className="bg-indigo-600 rounded-full w-12 h-12 items-center justify-center ml-2">
                <Ionicons name="map-outline" size={20} color="white" />
              </Pressable>
            </View>
          </View>

          {/* Information card */}
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <Text className="text-gray-900 text-lg font-bold mb-4">Information</Text>
            
            <View className="space-y-4">
              {/* Court name */}
              <View className="flex-row items-center">
                <Ionicons name="information-circle-outline" size={16} color="#6b7280" style={{ marginRight: 16 }} />
                <View>
                  <Text className="text-gray-500 text-xs">Court name</Text>
                  <Text className="text-gray-800 text-base font-semibold">PISTA 13</Text>
                </View>
              </View>
              
              {/* Type of court */}
              <View className="flex-row items-center">
                <Ionicons name="home-outline" size={16} color="#6b7280" style={{ marginRight: 16 }} />
                <View>
                  <Text className="text-gray-500 text-xs">Type of court</Text>
                  <Text className="text-gray-800 text-base font-semibold">Indoor, Panoramic, Double</Text>
                </View>
              </View>
              
              {/* End registration */}
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={16} color="#6b7280" style={{ marginRight: 16 }} />
                <View>
                  <Text className="text-gray-500 text-xs">End registration</Text>
                  <Text className="text-gray-800 text-base font-semibold">Today at 16:30</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed bottom button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
        <Pressable className="bg-indigo-600 rounded-full h-14 items-center justify-center shadow-lg">
          <Text className="text-white text-lg font-bold">Reserve place - €8.99</Text>
        </Pressable>
        
        <View className="bg-gray-300 rounded-full h-1.5 w-32 self-center mt-3" />
      </View>
    </View>
  );
}