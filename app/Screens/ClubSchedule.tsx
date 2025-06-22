import { View, Text, Pressable, ScrollView, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

// SVG icons as strings
const heartIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="#6B7280" stroke-width="2" fill="none"/>
</svg>`;

const backArrowIcon = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 5L6 10L11 15" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const menuDotsIcon = `<svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="7.5" cy="4" r="2" fill="#6B7280"/>
<circle cx="7.5" cy="10" r="2" fill="#6B7280"/>
<circle cx="7.5" cy="16" r="2" fill="#6B7280"/>
</svg>`;

export default function ClubScheduleScreen() {
  const DateSelector = ({ 
    dayName, 
    date, 
    month, 
    isSelected = false 
  }: { 
    dayName: string, 
    date: string, 
    month: string, 
    isSelected?: boolean 
  }) => (
    <Pressable className="h-24 w-[60px]" data-name="DateSelector">
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

  const TimeSlot = ({ time }: { time: string }) => (
    <Pressable className="bg-slate-800 h-12 rounded-lg w-[90px] items-center justify-center">
      <Text className="text-white text-base font-medium">{time}</Text>
    </Pressable>
  );

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
      className={`px-4 py-[13px] ${isActive ? 'border-b-2 border-slate-800' : ''}`}
      onPress={onPress}
    >
      <Text className={`text-base ${
        isActive ? 'text-slate-800 font-medium' : 'text-gray-500'
      }`}>{title}</Text>
    </Pressable>
  );

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
            <Pressable className="w-[30px] h-[30px] items-center justify-center">
              <SvgXml xml={backArrowIcon} width={17.5} height={20} />
            </Pressable>
            <Pressable className="w-[25px] h-[34px] items-center justify-center">
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
                  Forus Rambleta Valencia
                </Text>
                <Text className="text-base text-gray-600 leading-6 mt-1">
                  Carrer Pio IX, S/N, , Valencia
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
                  <TabButton title="Home" />
                  <TabButton title="Reserve" isActive />
                  <TabButton title="Open matches" />
                  <TabButton title="Active" />
                </View>
              </ScrollView>
            </View>

            {/* Date Selector */}
            <View className="px-6">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  <DateSelector dayName="ПН" date="16" month="Июн" isSelected />
                  <DateSelector dayName="ВСК" date="15" month="Июнь" isSelected />
                  <DateSelector dayName="ВСК" date="15" month="Июнь" />
                  <DateSelector dayName="ВСК" date="15" month="Июнь" />
                  <DateSelector dayName="ВСК" date="15" month="Июнь" />
                  <DateSelector dayName="ВСК" date="15" month="Июнь" isSelected />
                  <DateSelector dayName="ВСК" date="15" month="Июнь" />
                  <DateSelector dayName="ВСК" date="15" month="Июнь" />
                  <DateSelector dayName="ВСК" date="15" month="Июнь" />
                </View>
              </ScrollView>
            </View>

            {/* Time Slots Grid */}
            <View className="px-6">
              <View className="flex-row flex-wrap gap-2.5 py-[5px]">
                <TimeSlot time="12:00" />
                <TimeSlot time="12:00" />
                <TimeSlot time="12:00" />
                <TimeSlot time="12:00" />
                <TimeSlot time="12:00" />
                <TimeSlot time="12:00" />
                <TimeSlot time="12:00" />
                <TimeSlot time="12:00" />
                <TimeSlot time="12:00" />
              </View>
            </View>

            {/* Booking Section */}
            <View className="px-6">
              <View className="mb-[9px]">
                <Text className="text-xl font-semibold text-slate-800 leading-7 mb-2">
                  Забронируй корт
                </Text>
                <Text className="text-base text-gray-600 leading-6">
                  Create a private match where you can invite
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
                      Priority alerts
                    </Text>
                    <Text className="text-sm text-gray-600 leading-5 mb-4">
                      Configure your alert in one click with your predefined filters
                    </Text>
                    <Pressable>
                      <Text className="text-base font-medium text-blue-500">
                        Manage alerts
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

            {/* Bottom Indicator */}
            <View className="items-center py-4">
              <View className="w-32 h-1 bg-black rounded-full" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}