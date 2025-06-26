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

interface PlayerSlotProps {
  avatar?: any;
  name?: string;
  level?: string;
  isAvailable?: boolean;
}

function PlayerSlot({ avatar, name, level, isAvailable = false }: PlayerSlotProps) {
  if (isAvailable) {
    return (
      <View className="items-center w-16">
        <Pressable className="w-12 h-12 bg-gray-100 rounded-full border-2 border-dashed border-gray-300 items-center justify-center mb-2">
          <Ionicons name="add" size={20} color="#9ca3af" />
        </Pressable>
        <Text className="text-blue-500 text-sm text-center">Available</Text>
      </View>
    );
  }

  return (
    <View className="items-center w-16">
      {avatar ? (
        <Image source={avatar} className="w-12 h-12 rounded-full mb-2" resizeMode="cover" />
      ) : (
        <View className="w-12 h-12 bg-slate-700 rounded-full items-center justify-center mb-2">
          <Text className="text-white text-sm font-bold">{name?.slice(0, 2).toUpperCase()}</Text>
        </View>
      )}
      <Text className="text-black text-sm font-medium text-center">{name}</Text>
      {level && (
        <View className="bg-yellow-400 rounded px-2 py-1 mt-1">
          <Text className="text-black text-xs">{level}</Text>
        </View>
      )}
    </View>
  );
}

interface MatchCardProps {
  date: string;
  type: string;
  level: string;
  players: PlayerSlotProps[];
  location: string;
  distance: string;
  price: string;
  duration: string;
  showStartButton?: boolean;
}

function MatchCard({ 
  date, 
  type, 
  level, 
  players, 
  location, 
  distance, 
  price, 
  duration,
  showStartButton = false 
}: MatchCardProps) {
  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-gray-900 text-lg font-semibold mb-2">{date}</Text>
        <View className="flex-row items-center">
          <View className="flex-row items-center mr-6">
            <Ionicons name="trophy" size={16} color="#6b7280" style={{ marginRight: 8 }} />
            <Text className="text-gray-600 text-sm">{type}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="bar-chart" size={16} color="#6b7280" style={{ marginRight: 8 }} />
            <Text className="text-gray-600 text-sm">{level}</Text>
          </View>
        </View>
      </View>

      {/* Players */}
      <View className="flex-row justify-between mb-6">
        {players.map((player, index) => (
          <PlayerSlot key={index} {...player} />
        ))}
      </View>

      {/* Location and Price */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Ionicons name="location" size={12} color="#6b7280" style={{ marginRight: 8 }} />
            <Text className="text-gray-900 text-base font-medium">{location}</Text>
          </View>
          <Text className="text-gray-600 text-sm ml-5">{distance}</Text>
        </View>
        <View className="items-end">
          <Text className="text-blue-500 text-lg font-bold">{price}</Text>
          <Text className="text-blue-500 text-sm">{duration}</Text>
        </View>
      </View>

      {/* Start Button */}
      {showStartButton && (
        <Pressable className="bg-blue-500 rounded-lg h-12 flex-row items-center justify-center">
          <Ionicons name="add" size={16} color="white" style={{ marginRight: 8 }} />
          <Text className="text-white text-base font-medium">Start a match</Text>
        </Pressable>
      )}
    </View>
  );
}

export default function OpenMatchesList() {
  const matches: MatchCardProps[] = [
    {
      date: "Monday, June 16 | 20:30",
      type: "Competitive",
      level: "0.79 - 1.79",
      players: [
        { 
          avatar: require('@/assets/figma/alberto-avatar.png'), 
          name: "Nicolas", 
          level: "1.04" 
        },
        { isAvailable: true },
        { isAvailable: true },
        { isAvailable: true }
      ],
      location: "Carrer de Les Barraques del Figu...",
      distance: "4km • València",
      price: "€2",
      duration: "90min"
    },
    {
      date: "Tuesday, June 17 | 09:00",
      type: "Competitive",
      level: "0.91 - 1.91",
      players: [
        { 
          avatar: require('@/assets/figma/aris-avatar.png'), 
          name: "Aris", 
          level: "1.16" 
        },
        { isAvailable: true },
        { 
          avatar: require('@/assets/figma/mateja-avatar.png'), 
          name: "Mateja", 
          level: "1.14" 
        },
        { name: "Louis", level: "1.12" }
      ],
      location: "SUMA Pàdel Patacona",
      distance: "5km • Alboraya",
      price: "€4.20",
      duration: "90min",
      showStartButton: true
    }
  ];

  return (
    <View className="bg-white relative rounded-lg flex-1" data-name="Screen/OpenMatchesList">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-4 py-4">
          <View className="flex-row items-center">
            <Pressable className="mr-4">
              <Ionicons name="chevron-back" size={20} color="#1f2937" />
            </Pressable>
            <Text className="text-gray-900 text-xl font-bold">Available</Text>
          </View>
        </View>

        {/* Filter Bar */}
        <View className="bg-white px-4 py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <Ionicons name="options" size={16} color="#6b7280" style={{ marginRight: 8 }} />
            
            <View className="flex-row gap-2">
              <View className="bg-gray-800 rounded-full px-4 py-2 flex-row items-center">
                <Text className="text-white text-sm">Padel</Text>
                <Ionicons name="close" size={12} color="white" style={{ marginLeft: 8 }} />
              </View>
              
              <View className="bg-gray-800 rounded-full px-4 py-2 flex-row items-center">
                <Text className="text-white text-sm">2 Clubs</Text>
                <Ionicons name="close" size={12} color="white" style={{ marginLeft: 8 }} />
              </View>
              
              <View className="bg-gray-800 rounded-full px-4 py-2">
                <Text className="text-white text-sm">Sun-Mon-Tue</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="px-4 py-5">
          {/* Section Title */}
          <View className="mb-4">
            <Text className="text-gray-900 text-2xl font-bold mb-3">For your level</Text>
            <Text className="text-gray-600 text-base leading-6">
              These matches fit your search and your level perfectly
            </Text>
          </View>

          {/* Matches List */}
          <View>
            {matches.map((match, index) => (
              <MatchCard key={index} {...match} />
            ))}
            
            {/* Compact Card */}
            <View className="bg-white rounded-lg p-4 shadow-sm">
              <View className="mb-4">
                <Text className="text-gray-900 text-lg font-semibold mb-2">
                  Tuesday, June 17 | 10:00
                </Text>
                <View className="flex-row items-center">
                  <View className="flex-row items-center mr-6">
                    <Ionicons name="happy" size={20} color="#6b7280" style={{ marginRight: 8 }} />
                    <Text className="text-gray-600 text-sm">Friendly</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="bar-chart" size={16} color="#6b7280" style={{ marginRight: 8 }} />
                    <Text className="text-gray-600 text-sm">0.74 - 3</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}