import { useGetClubsQuery } from '@/src/generated/graphql';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';


// SVG assets as constants
const frameBackSvg = `<svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style="display: block;" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Frame">
<path id="Vector" d="M10 1L2 9L10 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`;

const searchIconSvg = `<svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style="display: block;" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Frame">
<path id="Vector" d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#6B7280" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector_2" d="M14.0001 14.0001L11.1001 11.1001" stroke="#6B7280" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`;

const locationPinSvg = `<svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style="display: block;" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Frame">
<path id="Vector" d="M12.6667 6.66667C12.6667 11.3333 7 15.3333 7 15.3333C7 15.3333 1.33333 11.3333 1.33333 6.66667C1.33333 5.16232 1.93155 3.71885 2.99442 2.65598C4.05729 1.59311 5.50076 0.994886 7.00511 0.994886C8.50946 0.994886 9.95293 1.59311 11.0158 2.65598C12.0787 3.71885 12.6769 5.16232 12.6769 6.66667H12.6667Z" stroke="#6B7280" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector_2" d="M7 8.66667C8.10457 8.66667 9 7.77124 9 6.66667C9 5.5621 8.10457 4.66667 7 4.66667C5.89543 4.66667 5 5.5621 5 6.66667C5 7.77124 5.89543 8.66667 7 8.66667Z" stroke="#6B7280" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`;

const filterIconSvg = `<svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style="display: block;" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Frame">
<path id="Vector" d="M2.66667 2.66667H13.3333L8.66667 8.4V12.6667L5.33333 10.6667V8.4L2.66667 2.66667Z" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`;

const closeXSvg = `<svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style="display: block;" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Frame">
<path id="Vector" d="M9 3L3 9M3 3L9 9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`;

const heartIconSvg = `<svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style="display: block;" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Frame">
<path id="Vector" d="M13.9133 2.84667C13.6725 2.60578 13.3849 2.41519 13.0679 2.28564C12.751 2.15609 12.4105 2.09009 12.0667 2.09009C11.7229 2.09009 11.3823 2.15609 11.0654 2.28564C10.7485 2.41519 10.4608 2.60578 10.22 2.84667L9.55333 3.51334L8.88666 2.84667C8.39746 2.35746 7.73751 2.08344 7.04666 2.08344C6.35582 2.08344 5.69587 2.35746 5.20666 2.84667C4.71746 3.33587 4.44344 3.99582 4.44344 4.68667C4.44344 5.37751 4.71746 6.03746 5.20666 6.52667L5.87333 7.19334L9.55333 10.8733L13.2333 7.19334L13.9 6.52667C14.1409 6.28578 14.3315 5.99819 14.461 5.68123C14.5906 5.36428 14.6566 5.02378 14.6566 4.68C14.6566 4.33622 14.5906 3.99572 14.461 3.67877C14.3315 3.36181 14.1409 3.07422 13.9 2.83334L13.9133 2.84667Z" stroke="#6B7280" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`;

const heartFilledSvg = `<svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style="display: block;" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Frame">
<path id="Vector" d="M13.9133 2.84667C13.6725 2.60578 13.3849 2.41519 13.0679 2.28564C12.751 2.15609 12.4105 2.09009 12.0667 2.09009C11.7229 2.09009 11.3823 2.15609 11.0654 2.28564C10.7485 2.41519 10.4608 2.60578 10.22 2.84667L9.55333 3.51334L8.88666 2.84667C8.39746 2.35746 7.73751 2.08344 7.04666 2.08344C6.35582 2.08344 5.69587 2.35746 5.20666 2.84667C4.71746 3.33587 4.44344 3.99582 4.44344 4.68667C4.44344 5.37751 4.71746 6.03746 5.20666 6.52667L5.87333 7.19334L9.55333 10.8733L13.2333 7.19334L13.9 6.52667C14.1409 6.28578 14.3315 5.99819 14.461 5.68123C14.5906 5.36428 14.6566 5.02378 14.6566 4.68C14.6566 4.33622 14.5906 3.99572 14.461 3.67877C14.3315 3.36181 14.1409 3.07422 13.9 2.83334L13.9133 2.84667Z" fill="#EF4444" stroke="#EF4444" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`;

// Club images
const clubImages = [
  require('@/assets/figma/club-image-1.png'),
  require('@/assets/figma/club-image-2.png'),
  require('@/assets/figma/club-image-3.png'),
  require('@/assets/figma/club-image-4.png'),
];

interface ClubCardProps {
  club: {
    id: string;
    name: string;
    city?: string | null;
    district?: string | null;
    description?: string | null;
    imagesUrls: string[];
    rating?: number | null;
    reviewCount: number;
  };
  index: number;
  isLiked: boolean;
  onToggleLike: () => void;
}

function ClubCard({ club, index, isLiked, onToggleLike, ...props }: ClubCardProps) {
  const router = useRouter();
  const clubImage = clubImages[index % clubImages.length];
  const timeSlots = index === 0 ? ['12:00'] : index === 1 ? ['14:30', '16:00'] : index === 2 ? ['13:00', '15:30', '17:00'] : ['11:00', '18:30'];
  const prices = ['1200₽', '1500₽', '1800₽', '2000₽'];
  const distances = ['2км - Черная речка', '5км - Академическая', '1.2км - Дыбенко', '8км - Купчино'];
  const timeFroms = ['1ч от', '45мин от', '20мин от', '35мин от'];

  return (
    <Pressable 
      className="bg-white rounded-2xl mb-4 mx-4 shadow-sm border border-gray-200 overflow-hidden"
      data-name="div"
      onPress={() => router.push({
        pathname: '/Screens/ClubSchedule',
        params: {
          clubId: club.id,
          clubName: club.name,
          clubCity: club.city || '',
          clubDistrict: club.district || '',
          clubDescription: club.description || '',
          clubRating: club.rating?.toString() || '',
          clubReviewCount: club.reviewCount.toString(),
          clubImagesUrls: JSON.stringify(club.imagesUrls)
        }
      })}
    >
      {/* Image Container */}
      <View className="relative h-48 w-full">
        <Image 
          source={clubImage}
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {/* Like Button */}
        <Pressable
          className="absolute top-4 right-4 bg-white/90 w-10 h-10 rounded-full items-center justify-center"
          onPress={onToggleLike}
        >
          <SvgXml xml={isLiked ? heartFilledSvg : heartIconSvg} width={16} height={16} />
        </Pressable>
        
        {/* Time From Badge */}
        <View className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-lg">
          <Text className="text-white text-sm font-normal">{timeFroms[index % timeFroms.length]}</Text>
        </View>
      </View>

      {/* Content Container */}
      <View className="p-4">
        {/* Title and Price Row */}
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-xl font-bold text-gray-900 flex-1 mr-2" numberOfLines={1}>
            {club.name}
          </Text>
          <Text className="text-xl font-bold text-gray-900">
            {prices[index % prices.length]}
          </Text>
        </View>
        
        {/* Location */}
        <Text className="text-base text-gray-500 mb-6">
          {distances[index % distances.length]}
        </Text>
        
        {/* Time Slots */}
        <View className="flex-row gap-2">
          {timeSlots.map((time, timeIndex) => (
            <View key={timeIndex} className="bg-gray-100 px-3 py-2 rounded-lg">
              <Text className="text-base font-medium text-gray-700">{time}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

export default function ClubsList() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [likedClubs, setLikedClubs] = useState<Set<string>>(new Set());
  const { data: clubsData, loading, error } = useGetClubsQuery();

  const clubs = clubsData?.clubs || [];

  const toggleLike = (clubId: string) => {
    setLikedClubs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clubId)) {
        newSet.delete(clubId);
      } else {
        newSet.add(clubId);
      }
      return newSet;
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        className="flex-1 bg-white rounded-lg shadow-lg"
        data-name="Screens/ClubsList"
      >
        <StatusBar style="light" />

        <View className="flex-1 bg-gray-50">
          <View className="flex flex-col flex-1">
            {/* Header */}
            <View className="bg-white h-16 flex-row items-center justify-between px-4">
              <Pressable 
                className="w-8 h-8 items-center justify-center"
                onPress={() => router.back()}
              >
                <SvgXml xml={frameBackSvg} width={11} height={18} />
              </Pressable>
              
              <Text className="text-xl font-semibold text-gray-900">Поиск</Text>
              
              <Pressable>
                <Text className="text-base font-medium text-blue-500">На карте</Text>
              </Pressable>
            </View>
            
            {/* Search Bar */}
            <View className="bg-white h-16 px-4 justify-center">
              <View className="bg-gray-100 h-12 rounded-2xl flex-row items-center px-4">
                <SvgXml xml={searchIconSvg} width={16} height={16} />
                <TextInput
                  className="flex-1 ml-3 text-base text-gray-900"
                  placeholder="Клубы в этом районе"
                  placeholderTextColor="#ADAEBC"
                  value={searchText}
                  onChangeText={setSearchText}
                />
                <SvgXml xml={locationPinSvg} width={14} height={16} />
                <View className="ml-3">
                  <SvgXml xml={filterIconSvg} width={16} height={16} />
                </View>
              </View>
            </View>
            
            {/* Filters */}
            <View className="bg-white h-[69px] border-b border-gray-100 px-4 justify-center">
              <View className="flex-row items-center">
                <SvgXml xml={filterIconSvg} width={16} height={16} />
                <View className="ml-3 flex-row gap-3">
                  <View className="bg-gray-800 px-4 py-2 rounded-full flex-row items-center">
                    <Text className="text-sm font-medium text-white mr-2">Падл</Text>
                    <SvgXml xml={closeXSvg} width={12} height={12} />
                  </View>
                  <View className="bg-gray-800 px-4 py-2 rounded-full flex-row items-center">
                    <Text className="text-sm font-medium text-white mr-2">15 июня | 12 - 17</Text>
                    <SvgXml xml={closeXSvg} width={12} height={12} />
                  </View>
                </View>
              </View>
            </View>
            
            {/* Clubs List */}
            <ScrollView 
              className="flex-1"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 16 }}
            >
              {loading ? (
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-gray-500">Загрузка клубов...</Text>
                </View>
              ) : error ? (
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-red-500">Ошибка загрузки клубов</Text>
                </View>
              ) : (
                clubs.map((club, index) => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    index={index}
                    isLiked={likedClubs.has(club.id)}
                    onToggleLike={() => toggleLike(club.id)}
                  />
                ))
              )}
              
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}