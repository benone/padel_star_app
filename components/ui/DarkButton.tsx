import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import SendArrowIcon from '@/components/icons/SendArrowIcon';

interface DarkButtonProps {
  title: string;
  showIcon?: boolean;
  onPress?: () => void;
  width?: number;
}

export default function DarkButton({ 
  title,
  showIcon = true,
  onPress,
  width = 312
}: DarkButtonProps) {
  return (
    <TouchableOpacity 
      className="bg-slate-800 h-[55px] rounded-xl flex flex-row gap-[13px] items-center justify-center"
      style={{ width }}
      onPress={onPress}
      data-name="UI/DarkButton"
    >
      <Text className="font-bold text-white text-[16px] leading-normal">
        {title}
      </Text>
      
      {showIcon && (
        <SendArrowIcon width={13} height={14} color="white" />
      )}
    </TouchableOpacity>
  );
}