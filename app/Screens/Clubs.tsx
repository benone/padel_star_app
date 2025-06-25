import { AuthGate } from '@/src/auth/AuthGate';
import { useGetClubsQuery } from '@/src/generated/graphql';
import { showError } from '@/src/utils/crossPlatformAlert';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

function ClubsScreen() {
  const router = useRouter();
  const { data, loading, error } = useGetClubsQuery();

  const handleBackPress = () => {
    router.back();
  };

  const handleClubPress = (clubId: string) => {
    // Здесь можно добавить навигацию к детальной странице клуба
    console.log('Club pressed:', clubId);
  };

  const getCourtText = (count: number) => {
    if (count === 1) return 'корт';
    if (count < 5) return 'корта';
    return 'кортов';
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="light" />
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-600">Загрузка клубов...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    showError('Не удалось загрузить клубы');
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="light" />
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-red-600">Ошибка загрузки</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      
      <View className="flex-1 flex flex-col">
        {/* Top Bar */}
        <View className="bg-slate-800 h-[63px] flex-row items-center justify-between px-4 py-[15px]">
          <TouchableOpacity
            className="h-8 w-8 items-center justify-center"
            onPress={handleBackPress}
          >
            <Text className="text-white text-2xl">←</Text>
          </TouchableOpacity>
          
          <Text className="font-bold text-[20px] text-white leading-[28px]">
            Клубы
          </Text>
          
          <View className="h-8 w-8" />
        </View>

        {/* Content */}
        <ScrollView 
          className="flex-1 bg-gray-50"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 py-6">
            <Text className="text-2xl font-bold text-gray-900 mb-6">
              Выберите клуб для бронирования
            </Text>

            {data?.clubs && data.clubs.length > 0 ? (
              <View style={{ gap: 16 }}>
                {data.clubs.map((club) => (
                  <TouchableOpacity
                    key={club.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                    onPress={() => handleClubPress(club.id)}
                  >
                    {/* Club Image */}
                    {club.imagesUrls && club.imagesUrls.length > 0 && (
                      <Image
                        source={{ uri: club.imagesUrls[0] }}
                        className="w-full h-48"
                        resizeMode="cover"
                      />
                    )}

                    {/* Club Info */}
                    <View className="p-4">
                      <Text className="text-xl font-bold text-gray-900 mb-2">
                        {club.name}
                      </Text>

                      {/* Location */}
                      {club.city && (
                        <View className="flex-row items-center mb-2">
                          <Text className="text-gray-500 mr-1">📍</Text>
                          <Text className="text-gray-600 text-sm">
                            {club.city}
                          </Text>
                          {club.district && (
                            <Text className="text-gray-600 text-sm">
                              {`, ${club.district}`}
                            </Text>
                          )}
                        </View>
                      )}

                      {/* Rating */}
                      {club.rating && (
                        <View className="flex-row items-center mb-3">
                          <Text className="text-yellow-500 mr-1">⭐</Text>
                          <Text className="text-gray-700 font-medium">
                            {club.rating.toFixed(1)}
                          </Text>
                          <Text className="text-gray-500 text-sm ml-1">
                            ({club.reviewCount} отзывов)
                          </Text>
                        </View>
                      )}

                      {/* Description */}
                      {club.description && (
                        <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
                          {club.description}
                        </Text>
                      )}

                      {/* Courts Info */}
                      {club.courts && club.courts.length > 0 && (
                        <View className="flex-row items-center justify-between">
                          <Text className="text-gray-700 font-medium">
                            {club.courts.length} {getCourtText(club.courts.length)}
                          </Text>
                          <Text className="text-blue-600 font-medium">
                            Выбрать клуб {'>'}{'>'}
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View className="items-center justify-center py-12">
                <Text className="text-lg text-gray-500 text-center">
                  Клубы не найдены
                </Text>
                <Text className="text-sm text-gray-400 text-center mt-2">
                  Попробуйте обновить страницу
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default function Clubs() {
  return (
    <AuthGate>
      <ClubsScreen />
    </AuthGate>
  );
} 