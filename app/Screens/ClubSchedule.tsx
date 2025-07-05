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
  const date = new Date();
  const today = date.getDate().toString();
  const [selectedDate, setSelectedDate] = useState<string>(today); 
  const [activeTab, setActiveTab] = useState<string>('Бронирование'); // Добавляем состояние для активного таба
  
  const clubData = {
    id: params.clubId as string,
    name: params.clubName as string,
    city: params.clubCity as string,
    district: params.clubDistrict as string,
    description: params.clubDescription as string,
    rating: params.clubRating ? parseFloat(params.clubRating as string) : null,
    reviewCount: params.clubReviewCount ? parseInt(params.clubReviewCount as string) : 0,
    imagesUrls: params.clubImagesUrls ? JSON.parse(params.clubImagesUrls as string) : [],
    amenities: params.amenities ? JSON.parse(params.amenities as string) : [],
    phone: params.phone as string || null,
    email: params.email as string || null,
    website: params.website as string || null,
    workingHours: params.workingHours ? JSON.parse(params.workingHours as string) : null
  };
  
  // Функция для генерации дат на 2 месяца вперед
  const generateDates = () => {
    const dates = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 60; i++) { // 60 дней = 2 месяца
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      
      const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' }).toUpperCase();
      const dayDate = date.getDate().toString();
      const month = date.toLocaleDateString('ru-RU', { month: 'long' });
      
      dates.push({
        dayName,
        date: dayDate,
        month
      });
    }
    
    return dates;
  };

  const dates = generateDates();

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
        <View className="h-5 w-[55px] mx-auto mt-1">
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

  // Функция для перевода и получения иконок удобств
  const getAmenityInfo = (amenityKey: string) => {
    const amenityMap: { [key: string]: { name: string; icon: string } } = {
      cafe: { name: 'Кафе', icon: '☕' },
      shower: { name: 'Душ', icon: '🚿' },
      lockers: { name: 'Раздевалки', icon: '🗄️' },
      parking: { name: 'Парковка', icon: '🚗' },
      equipment_rental: { name: 'Аренда инвентаря', icon: '🎾' },
      wifi: { name: 'Wi-Fi', icon: '📶' },
      air_conditioning: { name: 'Кондиционер', icon: '❄️' },
      pro_shop: { name: 'Магазин', icon: '🛍️' },
      restaurant: { name: 'Ресторан', icon: '🍽️' },
      bar: { name: 'Бар', icon: '🍺' },
      spa: { name: 'СПА', icon: '💆' },
      gym: { name: 'Тренажерный зал', icon: '💪' },
      pool: { name: 'Бассейн', icon: '🏊' },
      sauna: { name: 'Сауна', icon: '🌡️' },
      massage: { name: 'Массаж', icon: '💆‍♀️' },
      physio: { name: 'Физиотерапия', icon: '🏥' },
      coaching: { name: 'Тренер', icon: '👨‍🏫' },
      tournament: { name: 'Турниры', icon: '🏆' },
      membership: { name: 'Членство', icon: '🎫' },
      online_booking: { name: 'Онлайн бронирование', icon: '📱' }
    };
    
    return amenityMap[amenityKey] || { name: amenityKey, icon: '✅' };
  };

  const renderAmenities = () => {
    if (!clubData?.amenities) return null;
  
    if (typeof clubData.amenities === 'object' && !Array.isArray(clubData.amenities)) {
      // Получаем только доступные удобства (где значение true)
      const availableAmenities = Object.entries(clubData.amenities)
        .filter(([key, value]) => value === true)
        .map(([key, value]) => key);
      
      return (
        <View className="">
          <View className="flex-row flex-wrap gap-2 mb-6">
            {availableAmenities.map((amenityKey, index) => {
              const amenityInfo = getAmenityInfo(amenityKey);
              return (
                <View key={index} className="bg-gray-100 rounded-lg p-3 flex-row items-center">
                  <Text className="text-lg mr-2">{amenityInfo.icon}</Text>
                  <Text className="text-sm text-gray-700 font-medium">{amenityInfo.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      );
    }
  };

  // Функция для отображения времени работы
  const renderWorkingHours = () => {
    
    if (!clubData.workingHours) {
      console.log('No working hours data');
      return null;
    }
    
    const workingHours = typeof clubData.workingHours === 'string' 
      ? JSON.parse(clubData.workingHours) 
      : clubData.workingHours;
    
    console.log('Parsed workingHours:', workingHours);
    
    const daysMap: { [key: string]: string } = {
      monday: 'Понедельник',
      tuesday: 'Вторник', 
      wednesday: 'Среда',
      thursday: 'Четверг',
      friday: 'Пятница',
      saturday: 'Суббота',
      sunday: 'Воскресенье'
    };
    
    return (
      <View className="mb-6">
        <Text className="text-lg font-semibold text-slate-800 mb-3">
          Время работы
        </Text>
        <View className="space-y-2">
          {Object.entries(workingHours).map(([day, hours]) => (
            <View key={day} className="flex-row justify-between items-center py-2 border-b border-gray-100">
              <Text className="text-sm text-gray-600">{daysMap[day] || day}</Text>
              <Text className="text-sm font-medium text-slate-800">{hours as string}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Функция для отображения контактной информации
  const renderContactInfo = () => {
    
    return (
      <View className="mb-6">
        <Text className="text-lg font-semibold text-slate-800 mb-3">
          Контактная информация
        </Text>
        
        <View className="space-y-3">
          {clubData.city && (
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-600">Город: </Text>
              <Text className="text-sm font-medium text-slate-800">{clubData.city}</Text>
            </View>
          )}
          
          {clubData.district && (
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-600">Район: </Text>
              <Text className="text-sm font-medium text-slate-800">{clubData.district}</Text>
            </View>
          )}
          
          {clubData.phone && (
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-600">Телефон: </Text>
              <Text className="text-sm font-medium text-slate-800">{clubData.phone}</Text>
            </View>
          )}
          
          {clubData.email && (
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-600">Email: </Text>
              <Text className="text-sm font-medium text-slate-800">{clubData.email}</Text>
            </View>
          )}
          
          {clubData.website && (
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-600">Веб-сайт: </Text>
              <Text className="text-sm font-medium text-blue-600">{clubData.website}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  // Функция для рендеринга контента в зависимости от активного таба
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Главная':
        return (
          <View className="px-6"> 
            {renderAmenities()}
            {renderWorkingHours()}
            {renderContactInfo()}
          </View>
        );
      
      case 'Бронирование':
        return (
          <View>
            {/* Date Selector */}
            <View className="px-6 mb-4">
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
                      const hour = parseInt(time.split(':')[0]);
                      const nextHour = hour + 1;
                      const nextTime = `${nextHour.toString().padStart(2, '0')}:00`;
                      return `${time}-${nextTime}`;
                    }).join(', ')}
                  </Text>
                </View>
              )}

              {/* Кнопка "Далее" */}
              {selectedTimes.size > 0 && (
                <View className="mt-6">
                  <Pressable 
                    className="bg-slate-800 py-4 rounded-xl items-center"
                    onPress={() => {
                      console.log('Выбранные времена:', Array.from(selectedTimes));
                      console.log('Выбранная дата:', selectedDate);
                      router.push({
                        pathname: "/Screens/OpenMatchesList",
                        params: {
                          clubId: clubData.id,
                          clubName: clubData.name,
                        }
                      });
                    }}
                  >
                    <Text className="text-white text-lg font-semibold">
                      Далее
                    </Text>
                  </Pressable>
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
        );
      
      case 'Открытые матчи':
        return (
          <View className="px-6">
            <Text className="text-lg font-medium text-slate-800 mb-4">
              Открытые матчи
            </Text>
            <Text className="text-base text-gray-600 leading-6">
              Здесь будут отображаться открытые матчи, к которым можно присоединиться.
            </Text>
          </View>
        );
      
      case 'Активные':
        return (
          <View className="px-6">
            <Text className="text-lg font-medium text-slate-800 mb-4">
              Активные матчи
            </Text>
            <Text className="text-base text-gray-600 leading-6">
              Здесь будут отображаться ваши активные матчи и бронирования.
            </Text>
          </View>
        );
      
      default:
        return null;
    }
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
                  <TabButton 
                    title="Главная" 
                    isActive={activeTab === 'Главная'}
                    onPress={() => setActiveTab('Главная')}
                  />
                  <TabButton 
                    title="Бронирование" 
                    isActive={activeTab === 'Бронирование'}
                    onPress={() => setActiveTab('Бронирование')}
                  />
                  <TabButton 
                    title="Открытые матчи" 
                    isActive={activeTab === 'Открытые матчи'}
                    onPress={() => setActiveTab('Открытые матчи')}
                  />
                  <TabButton 
                    title="Активные" 
                    isActive={activeTab === 'Активные'}
                    onPress={() => setActiveTab('Активные')}
                  />
                </View>
              </ScrollView>
            </View>

            {/* Tab Content */}
            {renderTabContent()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}