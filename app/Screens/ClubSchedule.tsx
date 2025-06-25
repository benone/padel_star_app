import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

// SVG icons as strings
const heartIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="#6B7280" stroke-width="2" fill="none"/>
</svg>`;

const backArrowIcon = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 5L6 10L11 15" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const menuDotsIcon = `<svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="7.5" cy="4" r="2" fill="#000"/>
<circle cx="7.5" cy="10" r="2" fill="#000"/>
<circle cx="7.5" cy="16" r="2" fill="#000"/>
</svg>`;

export default function ClubScheduleScreen()  {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());
  const [selectedDate, setSelectedDate] = useState<string>('16'); // По умолчанию выбрана дата "16"
  
  const clubData = {
    id: params.clubId as string,
    name: params.clubName as string,
    city: params.clubCity as string,
    district: params.clubDistrict as string,
    description: params.clubDescription as string,
    rating: params.clubRating ? parseFloat(params.clubRating as string) : null,
    reviewCount: params.clubReviewCount ? parseInt(params.clubReviewCount as string) : 0,
    imagesUrls: params.clubImagesUrls ? JSON.parse(params.clubImagesUrls as string) : []
  };

  // Данные для дат
  const dates = [
    { dayName: "ПН", date: "16", month: "Июнь" },
    { dayName: "ВТ", date: "17", month: "Июнь" },
    { dayName: "СР", date: "18", month: "Июнь" },
    { dayName: "ЧТ", date: "19", month: "Июнь" },
    { dayName: "ПТ", date: "20", month: "Июнь" },
    { dayName: "СБ", date: "21", month: "Июнь" },
    { dayName: "ВС", date: "22", month: "Июнь" },
    { dayName: "ПН", date: "23", month: "Июнь" },
  ];

  const DateSelector = ({ 
    dayName, 
    date, 
    month 
  }: { 
    dayName: string, 
    date: string, 
    month: string 
  }) => {
    const isSelected = selectedDate === date;
    
    return (
      <Pressable 
        className="h-24 w-[60px]" 
        data-name="DateSelector"
        onPress={() => setSelectedDate(date)}
      >
        <View className="h-5 w-[30px] mx-auto">
          <Text className="text-sm text-gray-600 text-center leading-5">{dayName}</Text>
        </View>
        <View className={`w-12 h-12 rounded-full mx-auto mt-1.5 items-center justify-center ${
          isSelected ? 'bg-slate-800' : 'bg-gray-100'
        }`}>
          <Text className={`text-base font-medium ${
            isSelected ? 'text-white' : 'text-gray-600'
          }`}>{date}</Text>
        </View>
        <View className="h-5 w-[39px] mx-auto mt-1">
          <Text className="text-sm text-gray-600 text-center leading-5">{month}</Text>
        </View>
      </Pressable>
    );
  };

  const TimeSlot = ({ time }: { time: string }) => {
    const isSelected = selectedTimes.has(time);
    
    const handlePress = () => {
      setSelectedTimes(prev => {
        const newSet = new Set(prev);
        if (newSet.has(time)) {
          newSet.delete(time);
        } else {
          newSet.add(time);
        }
        return newSet;
      });
    };
    
    return (
      <Pressable 
        className={`h-12 rounded-lg w-[90px] items-center justify-center ${
          isSelected 
            ? 'bg-slate-800' 
            : 'bg-gray-100 border border-gray-200'
        }`}
        onPress={handlePress}
      >
        <Text className={`text-base font-medium ${
          isSelected ? 'text-white' : 'text-gray-700'
        }`}>
          {time}
        </Text>
      </Pressable>
    );
  };

  const TabButton = ({ 
    title, 
    isActive = false, 
    onPress 
  }: { 
    title: string, 
    isActive?: boolean, 
    onPress?: () => void 
  }) => (
    <Pressable 
      className={`px-4 py-[13px] ${isActive ? 'border-b-2 border-slate-800' : 'border-b-2 border-transparent'}`}
      onPress={onPress}
    >
      <Text className={`text-base ${
        isActive ? 'text-slate-800 font-medium' : 'text-gray-500'
      }`}>{title}</Text>
    </Pressable>
  );

  // Функция для форматирования диапазона времени
  const formatTimeRange = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    const nextHour = hour + 1;
    const nextTime = `${nextHour.toString().padStart(2, '0')}:00`;
    return `${time}-${nextTime}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white" data-name="Screen/ClubSchedule">
      <ScrollView className="flex-1">
        {/* Header Image */}
        <View className="h-[211px] relative" data-name="Images">
          <Image 
            source={require('@/assets/figma/club-court-image.png')}
            className="w-full h-80 absolute"
            resizeMode="cover"
          />
          
          {/* Top Controls */}
          <View className="absolute top-5 left-4 right-4 flex-row justify-between items-center" data-name="TopControls">
            <Pressable className="w-[30px] h-[30px] items-center justify-center bg-white/60 rounded-full"
              onPress={() => router.back()}
            >
              <SvgXml xml={backArrowIcon} width={17.5} height={20}/>
            </Pressable>
            <Pressable className="w-[30px] h-[30px] items-center justify-center bg-white/60 rounded-full">
              <SvgXml xml={menuDotsIcon} width={15} height={20} />
            </Pressable>
          </View>
        </View>

        {/* Content */}
        <View className="bg-white rounded-t-[24px] -mt-6 relative" data-name="Content">
          <View className="py-[19px] gap-[25px]">
            
            {/* Club Info */}
            <View className="flex-row items-center justify-between px-6">
              <View className="flex-1 mr-[37px]">
                <Text className="text-2xl font-semibold text-slate-800 leading-8">
                  {clubData.name}
                </Text>
                <Text className="text-base text-gray-600 leading-6 mt-1">
                  {clubData.city}
                </Text>
              </View>
              <Pressable className="w-6 h-6">
                <SvgXml xml={heartIcon} width={24} height={24} />
              </Pressable>
            </View>

            {/* Navigation Menu */}
            <View className="h-[50px] border-b border-gray-200" data-name="Menu">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row">
                  <TabButton title="Главная" />
                  <TabButton title="Бронирование" isActive />
                  <TabButton title="Открытые матчи" />
                  <TabButton title="Активные" />
                </View>
              </ScrollView>
            </View>

            {/* Date Selector */}
            <View className="px-6">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {dates.map((dateInfo, index) => (
                    <DateSelector 
                      key={index}
                      dayName={dateInfo.dayName} 
                      date={dateInfo.date} 
                      month={dateInfo.month} 
                    />
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Показываем выбранную дату (опционально) */}
            {selectedDate && (
              <View className="px-6 mt-2">
                <Text className="text-sm text-gray-600">
                  Выбранная дата: {selectedDate} июня
                </Text>
              </View>
            )}

            {/* Time Slots Grid */}
            <View className="px-6">
              <View className="flex-row flex-wrap gap-2.5 py-[5px]">
                <TimeSlot time="12:00" />
                <TimeSlot time="13:00" />
                <TimeSlot time="14:00" />
                <TimeSlot time="15:00" />
                <TimeSlot time="16:00" />
                <TimeSlot time="17:00" />
                <TimeSlot time="18:00" />
                <TimeSlot time="19:00" />
                <TimeSlot time="20:00" />
                <TimeSlot time="21:00" />
              </View>
              
              {/* Показываем выбранные времена (опционально) */}
              {selectedTimes.size > 0 && (
                <View className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <Text className="text-sm text-blue-800 font-medium mb-2">
                    Выбранное время:
                  </Text>
                  <Text className="text-sm text-blue-600">
                    {Array.from(selectedTimes).sort().map(time => {
                      // Парсим время (например, "14:00" -> 14)
                      const hour = parseInt(time.split(':')[0]);
                      const nextHour = hour + 1;
                      
                      // Форматируем следующее время (например, 15 -> "15:00")
                      const nextTime = `${nextHour.toString().padStart(2, '0')}:00`;
                      
                      return `${time}-${nextTime}`;
                    }).join(', ')}
                  </Text>
                </View>
              )}
            </View>

            {/* Booking Section */}
            <View className="px-6">
              <View className="mb-[9px]">
                <Text className="text-xl font-semibold text-slate-800 leading-7 mb-2">
                  Забронируй корт
                </Text>
                <Text className="text-base text-gray-600 leading-6">
                  Создай приватный матч, где ты можешь пригласить друзей
                </Text>
              </View>
            </View>

            {/* Priority Alerts Card */}
            <View className="px-6">
              <View className="bg-white border border-gray-200 rounded-2xl p-[17px]">
                <View className="flex-row">
                  <View className="w-6 mr-3 pt-1">
                    <Text className="text-2xl">🔔</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-medium text-slate-800 leading-7 mb-2">
                      Приоритетные уведомления
                    </Text>
                    <Text className="text-sm text-gray-600 leading-5 mb-4">
                      Настройте свои уведомления в один клик с вашими фильтрами
                    </Text>
                    <Pressable>
                      <Text className="text-base font-medium text-blue-500">
                        Управление уведомлениями
                      </Text>
                    </Pressable>
                  </View>
                  <View className="ml-3">
                    <Switch
                      value={false}
                      trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                      thumbColor="#FFFFFF"
                    />
                  </View>
                </View>
              </View>
            </View> 
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}