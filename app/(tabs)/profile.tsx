import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/src/auth/AuthContext';
import { showConfirm, showError } from '@/src/utils/crossPlatformAlert';

export default function ProfileScreen() {
  const { logout } = useAuth();

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
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
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
    </SafeAreaView>
  );
}