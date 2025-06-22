import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

// SVG icons as strings
const menuCloseIcon = `<svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5 18L7.5 12L13.5 6" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const menuItemIcon = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 19.5C17.3284 19.5 18 18.8284 18 18V4C18 3.17157 17.3284 2.5 16.5 2.5H1.5C0.671573 2.5 0 3.17157 0 4V18C0 18.8284 0.671573 19.5 1.5 19.5H16.5ZM1.5 4H16.5V18H1.5V4ZM4.5 7.5C4.5 7.22386 4.72386 7 5 7H13C13.2761 7 13.5 7.22386 13.5 7.5C13.5 7.77614 13.2761 8 13 8H5C4.72386 8 4.5 7.77614 4.5 7.5ZM4.5 10.5C4.5 10.2239 4.72386 10 5 10H13C13.2761 10 13.5 10.2239 13.5 10.5C13.5 10.7761 13.2761 11 13 11H5C4.72386 11 4.5 10.7761 4.5 10.5ZM4.5 13.5C4.5 13.2239 4.72386 13 5 13H10C10.2761 13 10.5 13.2239 10.5 13.5C10.5 13.7761 10.2761 14 10 14H5C4.72386 14 4.5 13.7761 4.5 13.5Z" fill="#6B7280"/>
</svg>`;

const menuArrowIcon = `<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2L8 8L2 14" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default function MenuScreen() {
  const MenuItemRow = ({ title, description, onPress }: { title: string, description: string, onPress?: () => void }) => (
    <Pressable 
      className="flex-row items-center py-4 border-b border-gray-100"
      onPress={onPress}
      data-name="div"
    >
      <View className="w-[17.5px] h-5 mr-4" data-name="Frame">
        <SvgXml xml={menuItemIcon} width="100%" height="100%" />
      </View>
      <View className="flex-1" data-name="div">
        <Text className="text-base font-medium text-gray-800 leading-6">{title}</Text>
        <Text className="text-sm text-gray-500 leading-5">{description}</Text>
      </View>
      <View className="w-2.5 h-4 ml-4" data-name="Frame">
        <SvgXml xml={menuArrowIcon} width="100%" height="100%" />
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" data-name="Screen/Menu">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100" data-name="Container">
          <View className="w-[18px] h-6" data-name="Frame">
            <SvgXml xml={menuCloseIcon} width="100%" height="100%" />
          </View>
          <View className="w-2 h-2 bg-orange-400 rounded-full" data-name="Icon Container" />
        </View>

        {/* User Profile Section */}
        <View className="px-6 py-6" data-name="div">
          <View className="flex-row items-center justify-between">
            <View className="flex-1" data-name="div">
              <Text className="text-[30px] font-bold text-gray-800 leading-9">Kirill</Text>
              <Text className="text-base text-gray-600 leading-6">Standard account</Text>
            </View>
            <View className="w-[66px] h-[66px] bg-slate-800 rounded-full items-center justify-center" data-name="div">
              <Text className="text-2xl font-bold text-white">K</Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View className="px-6" data-name="div">
          <Text className="text-2xl font-bold text-gray-800 mb-6">Твой аккаунт</Text>
          
          <View data-name="div">
            <MenuItemRow 
              title="Edit profile" 
              description="Name, email, phone, location, gender,..."
              onPress={() => console.log('Edit profile pressed')}
            />
            <MenuItemRow 
              title="Edit profile" 
              description="Name, email, phone, location, gender,..."
              onPress={() => console.log('Edit profile pressed')}
            />
            <MenuItemRow 
              title="Edit profile" 
              description="Name, email, phone, location, gender,..."
              onPress={() => console.log('Edit profile pressed')}
            />
            <MenuItemRow 
              title="Edit profile" 
              description="Name, email, phone, location, gender,..."
              onPress={() => console.log('Edit profile pressed')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}