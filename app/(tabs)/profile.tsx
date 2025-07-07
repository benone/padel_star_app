import TopBar from '@/components/ui/TopBar';
import { useAuth } from '@/src/auth/AuthContext';
import { useGetCurrentPlayerQuery } from '@/src/generated/graphql';
import { showConfirm, showError } from '@/src/utils/crossPlatformAlert';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { data, loading, error } = useGetCurrentPlayerQuery();
  const player = data?.currentPlayer;
  
  const handleLogout = () => {
    showConfirm(
      'Выход',
      'Вы уверены, что хотите выйти?',
      async () => {
        try {
          await logout();
        } catch (error) {
          showError('Не удалось выйти из аккаунта', 'Ошибка');
        }
      },
      undefined,
      'Выйти',
      'Отмена'
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="flex-1 bg-gray-100">
          <View className="flex-row justify-end items-center">
            <TopBar
              welcomeText={`Профиль`}
              onNotificationPress={() => console.log('Notification pressed')}
            />
          </View>
        </View>
        {loading ? (
          <View className="items-center py-12"><Text>Загрузка...</Text></View>
        ) : error ? (
          <View className="items-center py-12"><Text className="text-red-500">Ошибка загрузки профиля</Text></View>
        ) : player && (
        <View className="px-6 mt-6">
          <View className="flex-row items-center">
            <View className="w-24 h-24 rounded-full bg-slate-900 items-center justify-center mb-2 overflow-hidden">
              {/* {player.avatarUrl ? (
                <Image source={{ uri: player.avatarUrl }} className="w-24 h-24 rounded-full" />
              ) : ( */}
                <Text className="text-white text-4xl font-bold">{player.name?.[0] || '?'}</Text>
              {/* )} */}
            </View>
            <View className="flex-col items-center ml-4">  
              <Text className="text-2xl font-bold text-slate-900">{player.name}</Text>
              <Text className="text-base text-blue-600 mt-1 mb-4">{'Add my location'}</Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center mb-6 mt-2">
            <View className="flex-1 items-center">
              <Text className="text-base text-gray-700 mt-1">Матчи</Text>
              <Text className="text-sm text-gray-500 mt-1">{0}</Text>
            </View>
            <View className="w-px h-8 bg-gray-200 mx-2" />
            <View className="flex-1 items-center">
              <Text className="text-base text-gray-700 mt-1">Подписчики</Text>
              <Text className="text-sm text-gray-500 mt-1">{0}</Text>
            </View>
            <View className="w-px h-8 bg-gray-200 mx-2" />
            <View className="flex-1 items-center">
              <Text className="text-base text-gray-700 mt-1">Подписки</Text>
              <Text className="text-sm text-gray-500 mt-1">{0}</Text>
            </View>
          </View>
          <View className="flex-row gap-3 mb-8">
            <Pressable className="flex-1 border-2 border-blue-600 rounded-full py-3 items-center">
              <Text className="text-blue-600 text-base font-semibold">Редактировать профиль</Text>
            </Pressable>
            <Pressable className="flex-1 bg-slate-900 rounded-full py-3 items-center">
              <Text className="text-base font-semibold text-yellow-300">Премиум</Text>
            </Pressable>
          </View>
        </View>
        )}
        {/* Остальной контент профиля */}
        <View className="px-4 py-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Профиль</Text>
          <Text className="text-base text-gray-600 mb-8">
            Здесь вы можете управлять своим аккаунтом и настройками
          </Text>
          <View className="mt-8">
            <Pressable
              className="bg-red-600 active:bg-red-700 px-6 py-3 rounded-lg items-center"
              onPress={handleLogout}
            >
              <Text className="text-white text-base font-semibold">Выйти</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}