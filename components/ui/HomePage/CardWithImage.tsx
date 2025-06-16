import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface CardWithImageProps {
  title: string;
  description: string;
  imageSource?: any;
  onPress?: () => void;
}

export default function CardWithImage({ 
  title, 
  description, 
  imageSource,
  onPress 
}: CardWithImageProps) {
  return (
    <TouchableOpacity 
      className="h-[264px] w-[171px]"
      onPress={onPress}
      data-name="UI/HomePage/CardWithImage"
    >
      <View className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-full">
        <View className="h-32 w-[171px] relative">
          <Image 
            source={imageSource || require('@/assets/figma/padel-court-image.png')}
            className="h-32 w-[171px] absolute top-0 left-0"
            resizeMode="cover"
          />
          <View className="absolute bg-slate-800 h-11 w-[46px] left-3 top-[72px] rounded-xl">
            <Image 
              source={require('@/assets/figma/search-icon.svg')}
              className="w-[18px] h-[18px] absolute left-[13px] top-3"
              resizeMode="contain"
            />
          </View>
        </View>
        
        <View className="h-32 w-[171px] px-[9px] py-[13px]">
          <Text className="font-bold text-[18px] text-slate-800 leading-[28px] w-[154px]">
            {title}
          </Text>
          <Text className="font-normal text-[14px] text-gray-600 leading-[20px] w-[150px] mt-[13px]">
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}