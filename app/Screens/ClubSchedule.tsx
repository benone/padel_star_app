import { useGetMatchesQuery } from '@/src/generated/graphql';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState<string>('Бронирование');
  const [selectedSport, setSelectedSport] = useState<'padel' | 'tennis' | 'squash'>('padel');
  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [hideUnavailableSlots, setHideUnavailableSlots] = useState(false);
  const [expandedCourtId, setExpandedCourtId] = useState<string | null>(null); // Добавляем состояние для раскрытого корта
  
  // GraphQL запрос для получения матчей
  const { data: matchesData, loading: matchesLoading, error: matchesError } = useGetMatchesQuery({
    variables: {
      upcoming: true,
      status: 'open'
    }
  });

  let amenitiesRaw = params.amenities ? JSON.parse(params.amenities as string) : [];
  let amenities: string[] = [];
  if (Array.isArray(amenitiesRaw)) {
    amenities = amenitiesRaw;
  } else if (typeof amenitiesRaw === 'object' && amenitiesRaw !== null) {
    amenities = Object.keys(amenitiesRaw).filter(key => amenitiesRaw[key]);
  }
  
  const clubData = {
    id: params.clubId as string,
    name: params.clubName as string,
    city: params.clubCity as string,
    district: params.clubDistrict as string,
    description: params.clubDescription as string,
    rating: params.clubRating ? parseFloat(params.clubRating as string) : null,
    reviewCount: params.clubReviewCount ? parseInt(params.clubReviewCount as string) : 0,
    imagesUrls: params.clubImagesUrls ? JSON.parse(params.clubImagesUrls as string) : [],
    amenities,
    phone: params.phone as string || null,
    email: params.email as string || null,
    website: params.website as string || null,
    workingHours: params.workingHours ? JSON.parse(params.workingHours as string) : null,
    courts: params.courts ? JSON.parse(params.courts as string) : [], // Изменено с clubCourts на courts
    latitude: params.latitude ? parseFloat(params.latitude as string) : 39.4375,
    longitude: params.longitude ? parseFloat(params.longitude as string) : -0.3275,
  };
  
  const sports = [
    { key: 'padel', label: 'Падел', icon: '🎾' },
    { key: 'tennis', label: 'Теннис', icon: '🏸' },
    { key: 'squash', label: 'Сквош', icon: '🥎' },
  ];

  const daysMapRu: { [key: string]: string } = {
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    saturday: 'Суббота',
    sunday: 'Воскресенье',
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
      
      // Используем полную дату как уникальный идентификатор
      const dateId = date.toISOString().split('T')[0]; // формат YYYY-MM-DD
      
      dates.push({
        dayName,
        date: dayDate,
        month,
        dateId // добавляем уникальный идентификатор
      });
    }
    
    return dates;
  };

  const dates = generateDates();

  const DateSelector = ({ 
    dayName, 
    date, 
    month,
    dateId 
  }: { 
    dayName: string, 
    date: string, 
    month: string,
    dateId: string
  }) => {
    const isSelected = selectedDate === dateId; // используем dateId вместо date
    
    return (
      <Pressable 
        className="h-24 w-[60px]" 
        data-name="DateSelector"
        onPress={() => setSelectedDate(dateId)} // используем dateId
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
    
    return (
      <View className="mb-6">
        <Text className="text-lg font-semibold text-slate-800 mb-3">
          Время работы
        </Text>
        <View className="space-y-2">
          {Object.entries(workingHours).map(([day, hours]) => (
            <View key={day} className="flex-row justify-between items-center py-2 border-b border-gray-100">
              <Text className="text-sm text-gray-600">{daysMapRu[day] || day}</Text>
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

  // Селектор спорта с иконкой ракетки
  const SportDropdown = () => {
    // Получаем текущий выбранный спорт
    const currentSport = sports.find(sport => sport.key === selectedSport);
    
    return (
      <View>
        <TouchableOpacity
          onPress={() => setSportModalVisible(true)}
          className="w-12 h-12 rounded-lg bg-gray-100 items-center justify-center mr-2 mt-6 mb-2"
          style={{ marginRight: 8 }}
        >
          <Text style={{ fontSize: 24 }}>{currentSport?.icon || '🎾'}</Text>
        </TouchableOpacity>
        
        <Text style={{ fontSize: 12 }}>{currentSport?.label || ''}</Text>
        <Modal
          visible={sportModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setSportModalVisible(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.4)',
              justifyContent: 'flex-end',
            }}
            activeOpacity={1}
            onPress={() => setSportModalVisible(false)}
          >
            <View
              style={{
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingTop: 20,
                paddingBottom: 40,
                paddingHorizontal: 20,
                minHeight: 200,
              }}
            >
              {/* Заголовок */}
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-semibold text-slate-800">
                  Выберите вид спорта
                </Text>
                <TouchableOpacity
                  onPress={() => setSportModalVisible(false)}
                  className="w-8 h-8 items-center justify-center"
                >
                  <Text className="text-2xl text-gray-500">×</Text>
                </TouchableOpacity>
              </View>

              {/* Список видов спорта */}
              <View className="space-y-3">
                {sports.map((sport) => (
                  <TouchableOpacity
                    key={sport.key}
                    className={`flex-row items-center p-4 rounded-xl mb-4 ${
                      selectedSport === sport.key 
                        ? 'bg-slate-800' 
                        : 'bg-gray-100'
                    }`}
                    onPress={() => {
                      setSelectedSport(sport.key as 'padel' | 'tennis' | 'squash');
                      setSportModalVisible(false);
                    }}
                  >
                    <Text className="text-2xl mr-4">{sport.icon}</Text>
                    <Text className={`text-lg font-medium ${
                      selectedSport === sport.key 
                        ? 'text-white' 
                        : 'text-gray-700'
                    }`}>
                      {sport.label}
                    </Text>
                    {selectedSport === sport.key && (
                      <View className="ml-auto">
                        <Text className="text-white text-lg">✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  // Компонент карточки матча
  const MatchCard = ({ match }: { match: any }) => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', { weekday: 'long', day: '2-digit', month: 'long' }) +
        ' | ' +
        date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    // Собираем участников и свободные места
    const players = match.participants || [];
    const totalSlots = match.playersNeeded || 4;
    const slots = [];
    for (let i = 0; i < totalSlots; i++) {
      slots.push(players[i] || null);
    }

    return (
      <View className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-4 mb-4">
        {/* Дата и время */}
        <Text className="text-base font-semibold text-slate-800 mb-2">
          {formatDate(match.matchDate)}
        </Text>
        {/* Инфо о матче */}
        <View className="flex-row items-center mb-3 space-x-4">
          {match.competitive && (
            <Text className="text-xs text-slate-700">🏆 Competitive</Text>
          )}
          <Text className="text-xs text-slate-700">
            📈 {match.levelMin?.toFixed(2)} – {match.levelMax?.toFixed(2)}
          </Text>
          {match.genderPreference === 'male' && (
            <Text className="text-xs text-slate-700">♂ Men only</Text>
          )}
          {match.genderPreference === 'female' && (
            <Text className="text-xs text-slate-700">♀ Women only</Text>
          )}
        </View>
        {/* Игроки */}
        <View className="flex-row items-center justify-between mb-3">
          {slots.map((player, idx) =>
            player ? (
              <View key={player.id} className="items-center flex-1">
                <Image
                  source={{ uri: player.avatarUrl || 'https://via.placeholder.com/40' }}
                  className="w-10 h-10 rounded-full mb-1"
                />
                <Text className="text-xs font-medium text-slate-800">{player.name}</Text>
                {player.level && (
                  <Text className="text-xs bg-yellow-200 rounded px-1 mt-1">{player.level}</Text>
                )}
              </View>
            ) : (
              <View key={idx} className="items-center flex-1 opacity-60">
                <View className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 items-center justify-center mb-1">
                  <Text className="text-2xl text-gray-400">+</Text>
                </View>
                <Text className="text-xs text-blue-500">Available</Text>
              </View>
            )
          )}
        </View>
        {/* Клуб и цена */}
        <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
          <View>
            <Text className="text-sm font-medium text-slate-800">{match.club?.name}</Text>
            <Text className="text-xs text-gray-500">{match.club?.city}</Text>
          </View>
          <View className="items-end">
            <Text className="text-base font-semibold text-blue-700">
              {match.pricePerPerson ? `${match.pricePerPerson} €` : 'Бесплатно'}
            </Text>
            <Text className="text-xs text-blue-700">{match.duration}min</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderMainTab = () => (
    <View className="px-0">
      

      {/* Sport and courts */}
      <View className="px-6 flex-row items-center mb-2">
        <Text className="text-lg mr-2">🎾</Text>
        <Text className="text-base text-gray-700 mr-4">{clubData.amenities?.includes('padel') ? 'Падел' : 'Вид спорта'}</Text>
        <Text className="text-base text-gray-500">{clubData.courts?.length || 0} доступных кортов</Text>
      </View>

      {/* Amenities */}
      <View className="px-6 flex-row flex-wrap gap-2 mb-4">
        {Array.isArray(clubData.amenities) && clubData.amenities.map((amenity, idx) => (
          <View key={idx} className="bg-gray-100 rounded-xl px-3 py-2 flex-row items-center">
            <Text className="text-base mr-2">{getAmenityInfo(amenity).icon}</Text>
            <Text className="text-xs text-gray-700 font-medium">{getAmenityInfo(amenity).name}</Text>
          </View>
        ))}
      </View>

      {/* Directions/Web/Call */}
      <View className="flex-row justify-center items-center gap-x-6 mb-4 px-2">
        <View className="items-center">
          <View className="w-12 h-12 rounded-full bg-slate-900 items-center justify-center mb-1">
            <Text className="text-white text-xl">↗️</Text>
          </View>
          <Text className="text-xs font-semibold text-slate-800">МАРШРУТ</Text>
        </View>
        <View className="items-center">
          <View className="w-12 h-12 rounded-full bg-slate-900 items-center justify-center mb-1">
            <Text className="text-white text-xl">🔗</Text>
          </View>
          <Text className="text-xs font-semibold text-slate-800">САЙТ</Text>
        </View>
        <View className="items-center">
          <View className="w-12 h-12 rounded-full bg-slate-900 items-center justify-center mb-1">
            <Text className="text-white text-xl">📞</Text>
          </View>
          <Text className="text-xs font-semibold text-slate-800">ПОЗВОНИТЬ</Text>
        </View>
      </View>

      {/* Map (placeholder) */}
      <View className="h-40 rounded-2xl mx-4 mb-4 overflow-hidden">
     <MapView
       style={{ flex: 1 }}
       initialRegion={{
         latitude: clubData.latitude, // Пример: координаты Валенсии
         longitude: clubData.longitude,
         latitudeDelta: 0.01,
         longitudeDelta: 0.01,
       }}
     >
       <Marker  
         coordinate={{
           latitude: clubData.latitude,
           longitude: clubData.longitude,
         }}
         title={clubData.name}
         description={clubData.city}
       />
     </MapView>
   </View>

      {/* Opening hours */}
      <View className="px-6 mb-6">
        <Text className="text-lg font-bold text-slate-900 mb-3 text-center">Время работы</Text>
        {clubData.workingHours && Object.entries(clubData.workingHours).map(([day, hours]) => (
          <View key={day} className="flex-row justify-between items-center py-1">
            <Text className="text-base text-gray-700">{daysMapRu[day] || day}</Text>
            <Text className="text-base text-gray-900 font-semibold">{hours as string}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  // Функция для генерации временных слотов на основе workingHours
  const generateTimeSlots = () => {
    if (!clubData.workingHours) {
      // Если нет данных о времени работы, возвращаем стандартные слоты с шагом 30 мин
      return [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
        '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
        '21:00', '21:30', '22:00'
      ];
    }

    // Определяем день недели для выбранной даты
    const selectedDateObj = new Date(selectedDate);
    const dayOfWeek = selectedDateObj.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    // Получаем время работы для этого дня
    const workingHours = typeof clubData.workingHours === 'string' 
      ? JSON.parse(clubData.workingHours) 
      : clubData.workingHours;
    
    const todayHours = workingHours[dayOfWeek];
    
    if (!todayHours || todayHours === 'Closed' || todayHours === 'Закрыто') {
      return []; // Клуб закрыт в этот день
    }

    // Парсим время работы (например, "09:00-22:00")
    const timeRange = todayHours.split('-');
    if (timeRange.length !== 2) {
      return [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
        '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
        '21:00', '21:30', '22:00'
      ];
    }

    const startTime = timeRange[0].trim();
    const endTime = timeRange[1].trim();
    
    // Парсим часы и минуты
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    // Конвертируем в минуты для удобства
    const startMinutes = startHour * 60 + (startMinute || 0);
    const endMinutes = endHour * 60 + (endMinute || 0);
    
    // Генерируем слоты времени с интервалом в 30 минут
    const timeSlots = [];
    for (let minutes = startMinutes; minutes < endMinutes; minutes += 30) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(timeSlot);
    }
    
    return timeSlots.length > 0 ? timeSlots : [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
      '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
      '21:00', '21:30', '22:00'
    ];
  };

  const timeSlots = generateTimeSlots();

  // Функция для получения временных слотов с матчами
  const getTimeSlotsWithMatches = () => {
    const timeSlotsWithMatches = new Set<string>();
    
    if (clubData.courts && clubData.courts.length > 0) {
      clubData.courts.forEach((court: any) => {
        if (court.matches && court.matches.length > 0) {
          court.matches.forEach((match: any) => {
            const matchDate = new Date(match.matchDate);
            const matchDateString = matchDate.toISOString().split('T')[0];
            
            // Проверяем, что матч на выбранную дату
            if (matchDateString === selectedDate) {
              const matchTimeString = matchDate.toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit' 
              });
              timeSlotsWithMatches.add(matchTimeString);
            }
          });
        }
      });
    }
    
    return timeSlotsWithMatches;
  };

  // Автоматический выбор первого доступного времени при загрузке и изменении даты
  useEffect(() => {
    if (timeSlots.length > 0 && selectedTimes.size === 0) {
      // Выбираем первое доступное время
      setSelectedTimes(new Set([timeSlots[0]]));
    }
  }, [timeSlots, selectedDate]);

  const TimeSlot = ({ time }: { time: string }) => {
    const isSelected = selectedTimes.has(time);
    const hasMatches = getTimeSlotsWithMatches().has(time);

    const handlePress = () => {
      setSelectedTimes(prev => {
        if (prev.has(time)) {
          return new Set();
        } else {
          return new Set([time]);
        }
      });
    };

    return (
      <Pressable 
        className={`h-12 rounded-lg w-[85px] items-center justify-center relative ${
          isSelected 
            ? 'bg-slate-800' 
            : hasMatches
            ? 'bg-blue-50 border-2 border-blue-300'
            : 'bg-gray-100 border border-gray-200'
        }`}
        onPress={handlePress}
      >
        <Text className={`text-base font-medium ${
          isSelected 
            ? 'text-white' 
            : hasMatches 
            ? 'text-blue-700' 
            : 'text-gray-700'
        }`}>
          {time}
        </Text>
        
        {/* Индикатор матчей */}
        {hasMatches && !isSelected && (
          <View className="absolute -top-1 -right-1 w-3 h-3 border-2 border-blue-300 rounded-full items-center justify-center">
            <Text className="text-white text-xs font-bold bg- rounded-full p-1">🎾</Text>
          </View>
        )}
      </Pressable>
    );
  };

  // Функция для проверки доступности корта на выбранное время
  const isCourtAvailable = (court: any) => {
    // Если не выбрано время, показываем все корты
    if (selectedTimes.size === 0) {
      return true;
    }

    // Проверяем доступность для бронирования на 60 или 90 минут
    const isAvailableFor60 = checkBookingAvailability(court, 60);
    const isAvailableFor90 = checkBookingAvailability(court, 90);

    // Показываем корт только если доступно бронирование хотя бы на одну продолжительность
    return isAvailableFor60 || isAvailableFor90;
  };

  // Функция для проверки доступности времени для бронирования
  const checkBookingAvailability = (court: any, duration: number) => {
    // Если не выбрано время, возвращаем false
    if (selectedTimes.size === 0) {
      return false;
    }

    // Если у корта нет матчей, время доступно
    if (!court.matches || court.matches.length === 0) {
      return true;
    }

    // Проверяем каждое выбранное время
    for (const selectedTime of selectedTimes) {
      const [selectedHour, selectedMinute] = selectedTime.split(':').map(Number);
      const bookingStartTime = new Date(selectedDate);
      bookingStartTime.setHours(selectedHour, selectedMinute, 0, 0);
      
      const bookingEndTime = new Date(bookingStartTime.getTime() + duration * 60 * 1000);

      // Проверяем, есть ли конфликтующие матчи
      const hasConflict = court.matches.some((match: any) => {
        const matchDate = new Date(match.matchDate);
        const matchDateString = matchDate.toISOString().split('T')[0];
        
        // Проверяем совпадение даты
        if (matchDateString !== selectedDate) {
          return false;
        }

        const matchStartTime = new Date(match.matchDate);
        const matchDuration = match.duration || 60;
        const matchEndTime = new Date(matchStartTime.getTime() + matchDuration * 60 * 1000);

        // Проверяем перекрытие времени
        return (bookingStartTime < matchEndTime && bookingEndTime > matchStartTime);
      });

      if (hasConflict) {
        return false;
      }
    }

    return true;
  };

  // Функция для рендеринга контента в зависимости от активного таба
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Главная':
        return renderMainTab();
      
      case 'Бронирование':
        return (
          <View>
            {/* Селектор спорта и скролл с датами */}
            <View className="px-6 mb-4 flex-row items-center -mt-4">
              <SportDropdown />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {dates.map((dateInfo, index) => (
                    <DateSelector 
                      key={index}
                      dayName={dateInfo.dayName} 
                      date={dateInfo.date} 
                      month={dateInfo.month} 
                      dateId={dateInfo.dateId}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Time Slots Grid */}
            <View className="px-6 mb-4">
              {/* Переключатель для скрытия недоступных слотов */}
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm text-gray-600">Скрыть недоступные слоты</Text>
                <Switch
                  value={hideUnavailableSlots}
                  onValueChange={setHideUnavailableSlots}
                  trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <View className="flex-row flex-wrap gap-2 py-[5px]">
                {timeSlots.map((time, index) => (
                  <TimeSlot key={index} time={time} />
                ))}
                </View>
              
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

            {/* Courts List */}
            <View className="px-6 mt-4">
              <Text className="text-lg font-semibold text-slate-800 mb-3">
                Доступные корты
              </Text>
              {clubData.courts && clubData.courts.length > 0 ? (
                <View className="space-y-3">
                  {clubData.courts
                    .filter(isCourtAvailable) // Фильтруем корты по доступности на выбранное время
                    .map((court: any, index: number) => {
                    const isExpanded = expandedCourtId === court.id;
                    return (
                      <View key={court.id || index} className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
                        {/* Основная информация о корте */}
                        <Pressable
                          onPress={() => {
                            setExpandedCourtId(isExpanded ? null : court.id);
                          }}
                          className="p-4"
                        >
                          <View className="flex-row justify-between items-start">
                            <View className="flex-1">
                              <Text className="text-base font-medium text-slate-800 mb-1">
                                {court.name || `Корт ${index + 1}`}
                              </Text>
                              <View className="flex-col items-start space-x-3">
                                {court.surface && (
                                  <View className="flex-row items-center">
                                    <Text className="text-sm text-gray-500">Покрытие: </Text>
                                    <Text className="text-sm font-medium text-slate-700 ml-1">
                                      {court.surface}
                                    </Text>
                                  </View>
                                )}
                                {court.indoor !== undefined && (
                                  <View className="flex-row items-center">
                                    <Text className="text-sm text-gray-500">Тип: </Text>
                                    <Text className="text-sm font-medium text-slate-700 ml-1">
                                      {court.indoor ? 'Крытый' : 'Открытый'}
                                    </Text>
                                  </View>
                                )}
                              </View>
                            </View>
                            <View className="ml-3 flex-row items-center">
                              <Text className="text-gray-400 text-lg">
                                {isExpanded ? '▼' : '▶'}
                              </Text>
                            </View>
                          </View>
                        </Pressable>

                        {/* Выпадающая информация */}
                        {isExpanded && (
                          <View className="border-t border-gray-100 bg-gray-50 p-4">
                            <View className="space-y-3">
                              {court.lighting !== undefined && (
                                <View className="flex-row justify-between items-center">
                                  <Text className="text-sm text-gray-500">Освещение:</Text>
                                  <Text className="text-sm font-medium text-slate-700">
                                    {court.lighting ? 'Есть' : 'Нет'}
                                  </Text>
                                </View>
                              )}

                              {court.maintenanceNotes && (
                                <View>
                                  <Text className="text-sm text-gray-500 mb-2">Заметки по обслуживанию:</Text>
                                  <Text className="text-sm text-slate-700 bg-white p-3 rounded-lg border">
                                    {court.maintenanceNotes}
                                  </Text>
                                </View>
                              )}

                              {/* Матчи на корте */}
                              {court.matches && court.matches.length > 0 && (() => {
                                // Фильтруем матчи по выбранной дате и времени
                                const filteredMatches = court.matches.filter((match: any) => {
                                  const matchDate = new Date(match.matchDate);
                                  const matchDateString = matchDate.toISOString().split('T')[0]; // YYYY-MM-DD
                                  const matchTimeString = matchDate.toLocaleTimeString('ru-RU', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  });
                                  
                                  // Проверяем совпадение даты
                                  const dateMatches = matchDateString === selectedDate;
                                  
                                  // Проверяем совпадение времени (если выбрано время)
                                  const timeMatches = selectedTimes.size === 0 || selectedTimes.has(matchTimeString);
                                  
                                  return dateMatches && timeMatches;
                                });
                                
                                return filteredMatches.length > 0 ? (
                                  <View className="mt-4">
                                    <Text className="text-sm font-medium text-slate-800 mb-3">
                                      Матчи на корте {selectedDate} {selectedTimes.size > 0 ? `в ${Array.from(selectedTimes).join(', ')}` : ''} ({filteredMatches.length})
                                    </Text>
                                    <View className="space-y-2">
                                      {filteredMatches.map((match: any, matchIndex: number) => {
                                      const matchDate = new Date(match.matchDate);
                                      const formattedDate = matchDate.toLocaleDateString('ru-RU', { 
                                        weekday: 'short', 
                                        day: '2-digit', 
                                        month: 'short' 
                                      });
                                      const formattedTime = matchDate.toLocaleTimeString('ru-RU', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                      });
                                      
                                      return (
                                        <View key={match.id || matchIndex} className="bg-white border border-gray-200 rounded-lg p-3">
                                          <View className="flex-row justify-between items-start mb-2">
                                            <Text className="text-sm font-medium text-slate-800">
                                              {match.description || `Матч ${matchIndex + 1}`}
                                            </Text>
                                            <Text className={`text-xs px-2 py-1 rounded-full ${
                                              match.status === 'open' 
                                                ? 'text-green-600 bg-green-100' 
                                                : match.status === 'full'
                                                ? 'text-blue-600 bg-blue-100'
                                                : 'text-gray-600 bg-gray-100'
                                            }`}>
                                              {match.status === 'open' ? 'Открыт' : 
                                               match.status === 'full' ? 'Полный' : 
                                               match.status === 'cancelled' ? 'Отменен' : match.status}
                                            </Text>
                                          </View>
                                          
                                          <View className="space-y-1">
                                            <View className="flex-row justify-between">
                                              <Text className="text-xs text-gray-500">Дата:</Text>
                                              <Text className="text-xs font-medium text-slate-700">
                                                {formattedDate} в {formattedTime}
                                              </Text>
                                            </View>
                                            
                                            <View className="flex-row justify-between">
                                              <Text className="text-xs text-gray-500">Длительность:</Text>
                                              <Text className="text-xs font-medium text-slate-700">
                                                {match.duration} мин
                                              </Text>
                                            </View>
                                            
                                            <View className="flex-row justify-between">
                                              <Text className="text-xs text-gray-500">Игроки:</Text>
                                              <Text className="text-xs font-medium text-slate-700">
                                                {match.totalPlayers - match.spotsAvailable}/{match.totalPlayers} ({match.spotsAvailable} мест)
                                              </Text>
                                            </View>
                                            
                                            {match.levelMin && match.levelMax && (
                                              <View className="flex-row justify-between">
                                                <Text className="text-xs text-gray-500">Уровень:</Text>
                                                <Text className="text-xs font-medium text-slate-700">
                                                  {match.levelMin}-{match.levelMax}
                                                </Text>
                                              </View>
                                            )}
                                            
                                            {match.pricePerPerson && (
                                              <View className="flex-row justify-between">
                                                <Text className="text-xs text-gray-500">Цена:</Text>
                                                <Text className="text-xs font-medium text-slate-700">
                                                  {match.pricePerPerson} €
                                                </Text>
                                              </View>
                                            )}
                                            
                                            {match.competitive && (
                                              <View className="flex-row justify-between">
                                                <Text className="text-xs text-gray-500">Тип:</Text>
                                                <Text className="text-xs font-medium text-slate-700">
                                                  🏆 Соревновательный
                                                </Text>
                                              </View>
                                            )}
                                          </View>
                                          
                                          {match.status === 'open' && match.spotsAvailable > 0 && (
                                            <TouchableOpacity
                                              className="bg-blue-600 py-2 rounded-lg items-center mt-2"
                                              onPress={() => {
                                                console.log('Присоединиться к матчу:', match.id);
                                                // Здесь можно добавить логику присоединения к матчу
                                              }}
                                            >
                                              <Text className="text-white text-xs font-medium">
                                                Присоединиться
                                              </Text>
                                            </TouchableOpacity>
                                          )}
                                        </View>
                                      );
                                    })}
                                  </View>
                                </View>
                              ) : null;
                              })()}

                              {/* Кнопки бронирования */}
                              <View className="mt-3">
                                <View className="flex-row gap-2 justify-start">
                                  {checkBookingAvailability(court, 60) && (
                                    <TouchableOpacity
                                      className="bg-blue-600 py-3 px-6 rounded-xl items-center"
                                      onPress={() => {
                                        console.log('Бронирование корта на 60 минут:', court.id);
                                        // Здесь можно добавить логику бронирования
                                      }}
                                    >
                                      <Text className="text-white text-lg font-bold">
                                        12,95₽
                                      </Text>
                                      <Text className="text-white text-sm">
                                        60 мин
                                      </Text>
                                    </TouchableOpacity>
                                  )}

                                  {checkBookingAvailability(court, 90) && (
                                    <TouchableOpacity
                                      className="bg-blue-600 py-3 px-6 rounded-xl items-center"
                                      onPress={() => {
                                        console.log('Бронирование корта на 90 минут:', court.id);
                                        // Здесь можно добавить логику бронирования
                                      }}
                                    >
                                      <Text className="text-white text-lg font-bold">
                                        19,42₽
                                      </Text>
                                      <Text className="text-white text-sm">
                                        90 мин
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}
                  {/* Проверяем, есть ли доступные корты после фильтрации */}
                  {clubData.courts.filter(isCourtAvailable).length === 0 && (
                    <View className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <Text className="text-sm text-gray-500 text-center">
                        {selectedTimes.size > 0 
                          ? `Нет доступных кортов на ${selectedDate} в ${Array.from(selectedTimes).join(', ')}`
                          : 'Нет доступных кортов для бронирования'
                        }
                      </Text>
                      {selectedTimes.size > 0 && (
                        <Text className="text-xs text-gray-400 text-center mt-2">
                          Корты могут быть заняты матчами, которые перекрывают выбранное время для бронирования на 60 или 90 минут
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              ) : (
                <View className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <Text className="text-sm text-gray-500 text-center">
                    Информация о кортах недоступна
                  </Text>
                </View>
              )}
            </View>
            {/* Удалено модальное окно Court Details Modal */}
          </View>
        );
      
      case 'Открытые матчи':
        return (
          <View>
            {/* Селектор спорта и скролл с датами */}
            <View className="px-6 mb-4 flex-row items-center -mt-4">
              <SportDropdown />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {dates.map((dateInfo, index) => (
                    <DateSelector 
                      key={index}
                      dayName={dateInfo.dayName} 
                      date={dateInfo.date} 
                      month={dateInfo.month} 
                      dateId={dateInfo.dateId}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Time Slots Grid */}
            <View className="px-6 mb-4">
              {/* Переключатель для скрытия недоступных слотов */}
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm text-gray-600">Скрыть недоступные слоты</Text>
                <Switch
                  value={hideUnavailableSlots}
                  onValueChange={setHideUnavailableSlots}
                  trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <View className="flex-row flex-wrap gap-2 py-[5px]">
                {timeSlots.map((time, index) => (
                  <TimeSlot key={index} time={time} />
                ))}
              </View>
            </View>

            {/* Карточки открытых матчей */}
            <View className="px-6">
              {matchesLoading && (
                <Text className="text-center text-gray-500 my-6">Загрузка матчей...</Text>
              )}
              {matchesError && (
                <Text className="text-center text-red-500 my-6">Ошибка загрузки матчей</Text>
              )}
              {matchesData?.matches?.length === 0 && !matchesLoading && (
                <Text className="text-center text-gray-500 my-6">Нет открытых матчей</Text>
              )}
              {matchesData?.matches?.map((match: any) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </View>
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
                <View className="flex-row items-center gap-x-1">
                <Text className="text-base text-gray-600 leading-6 mt-1">
                  {clubData.city + " - "}
                </Text>
                  <Text className="text-base text-gray-400 leading-6 mt-1">
                    {clubData.district}
                </Text>
                </View>
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