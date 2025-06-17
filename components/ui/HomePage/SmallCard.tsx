import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GraduationCapIcon from '@/components/icons/GraduationCapIcon';

interface SmallCardProps {
  title: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}

export default function SmallCard({ 
  title,
  icon,
  onPress 
}: SmallCardProps) {
  return (
    <TouchableOpacity 
      className="bg-white h-[136px] w-[171px] rounded-2xl shadow-sm border border-gray-200"
      onPress={onPress}
      data-name="UI/HomePage/SmallCard"
    >
      <View className="flex flex-col gap-[17px] h-[136px] items-start justify-start px-2 py-2.5 w-[171px]">
        <View className="bg-slate-800 rounded-xl">
          <View className="flex flex-row gap-2.5 items-center justify-start px-3 py-2.5">
            {icon || <GraduationCapIcon width={25} height={20} color="white" />}
          </View>
        </View>
        
        <Text className="font-bold text-[18px] text-slate-800 leading-normal w-full">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}