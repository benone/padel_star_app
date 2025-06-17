import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NotificationBellIcon from '@/components/icons/NotificationBellIcon';
import MenuHamburgerIcon from '@/components/icons/MenuHamburgerIcon';

interface TopBarProps {
  welcomeText: string;
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
}

export default function TopBar({ 
  welcomeText,
  onNotificationPress,
  onMenuPress
}: TopBarProps) {
  return (
    <View 
      className="bg-slate-800 h-[63px] w-full"
      data-name="Top Bar"
    >
      <View className="flex flex-row h-[63px] items-start justify-between px-3 py-[15px] w-full">
        <View className="w-[236px]">
          <Text className="font-bold text-white text-[24px] leading-[32px] w-[236px]">
            {welcomeText}
          </Text>
        </View>
        
        <View className="h-7 w-[51px] flex flex-row items-center justify-between">
          <TouchableOpacity 
            className="w-[17.5px] h-5 flex items-center justify-center"
            onPress={onNotificationPress}
          >
            <NotificationBellIcon width={18} height={20} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="w-[17.5px] h-5 flex items-center justify-center"
            onPress={onMenuPress}
          >
            <MenuHamburgerIcon width={18} height={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}