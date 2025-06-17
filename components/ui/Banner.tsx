import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ChartIcon from '@/components/icons/ChartIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

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
          <View className="absolute bg-slate-800 left-0 rounded-lg w-10 h-10 top-1 flex items-center justify-center">
            <ChartIcon width={14} height={14} color="#FACC15" />
          </View>
          
          <View className="absolute left-[57px] top-[0.5px] w-[245px] h-[132px]">
            <Text className="font-bold text-[18px] text-slate-800 leading-[28px] w-[199px]">
              {title}
            </Text>
            <Text className="font-normal text-[14px] text-gray-600 leading-[23px] w-[272px] absolute top-[33px]">
              {description}
            </Text>
          </View>
          
          <View className="absolute right-2.5 top-[3px] w-2.5 h-4 flex items-center justify-center">
            <ArrowRightIcon width={10} height={16} color="#9CA3AF" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}