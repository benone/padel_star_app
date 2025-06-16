import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface BannerProps {
  title?: string;
  description?: string;
  onPress?: () => void;
}

export default function Banner({ 
  title = "Будь на шаг впереди",
  description = "Получайте уведомления о доступных кортах, повышайте видимость своих матчей и изучайте расширенную статистику.",
  onPress 
}: BannerProps) {
  return (
    <TouchableOpacity 
      className="bg-white h-[166px] w-[358px] rounded-2xl shadow-sm border border-gray-200"
      onPress={onPress}
      data-name="UI/Banner"
    >
      <View className="flex flex-col h-[166px] items-center justify-center p-0 w-[358px]">
        <View className="h-[133px] w-[324px]">
          <View className="absolute bg-slate-800 left-0 rounded-lg w-10 h-10 top-1">
            <Image 
              source={require('@/assets/figma/chart-icon.svg')}
              className="w-3.5 h-3.5 absolute left-2 top-2"
              resizeMode="contain"
            />
          </View>
          
          <View className="absolute left-[57px] top-[0.5px] w-[245px] h-[132px]">
            <Text className="font-bold text-[18px] text-slate-800 leading-[28px] w-[199px]">
              {title}
            </Text>
            <Text className="font-normal text-[14px] text-gray-600 leading-[23px] w-[272px] absolute top-[33px]">
              {description}
            </Text>
          </View>
          
          <View className="absolute right-2.5 top-[3px] w-2.5 h-4">
            <Image 
              source={require('@/assets/figma/arrow-right.svg')}
              className="w-2.5 h-4"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}