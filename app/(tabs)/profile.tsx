import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/src/auth/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Ошибка', 'Не удалось выйти из аккаунта');
            }
          }
        }
      ]
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