import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import GraduationCapIcon from '@/components/icons/GraduationCapIcon';
import Banner from '@/components/ui/Banner';
import CardWithImage from '@/components/ui/HomePage/CardWithImage';
import SmallCard from '@/components/ui/HomePage/SmallCard';
import TopBar from '@/components/ui/TopBar';

export default function Home() {
  return (
    <View
      className="flex-1 bg-white rounded-lg shadow-lg"
      data-name="Screens/Home"
    >
      <StatusBar style="light" />

      <View className="flex-1 bg-gray-100">
        <View className="flex flex-col flex-1">
          {/* Top Bar */}
          <TopBar
            welcomeText="Привет, Кирилл 👋"
            onNotificationPress={() => console.log('Notification pressed')}
            onMenuPress={() => router.push('/system-preview')}
          />

          {/* Main Content */}
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingHorizontal: 9, paddingVertical: 0, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex flex-col gap-[33px] items-center">
              {/* Banner */}
              <View className="mt-3.5">
                <Banner
                  onPress={() => console.log('Banner pressed')}
                />
              </View>

              {/* Homepage Cards Section */}
              <View className="w-[358px]">
                {/* Section Title */}
                <View className="mb-2.5">
                  <Text className="font-bold text-[24px] text-slate-800 leading-[32px] w-[361px]">
                    Сыграй свой лучший матч
                  </Text>
                </View>

                {/* Cards Grid */}
                <View className="flex-row flex-wrap gap-4">
                  {/* Court Booking Card */}
                  <CardWithImage
                    title="Бронь корта"
                    description="Если ты уже знаешь, с кем хочешь играть"
                    imageSource={require('@/assets/figma/padel-court-image.png')}
                    onPress={() => console.log('Court booking pressed')}
                  />

                  {/* Open Match Card */}
                  <CardWithImage
                    title="Открытый матч"
                    description="Найти соперников"
                    imageSource={require('@/assets/figma/players-playing-padel.png')}
                    onPress={() => console.log('Open match pressed')}
                  />

                  {/* Trainer Sessions Card */}
                  <SmallCard
                    title="Занятия с тренером"
                    icon={<GraduationCapIcon width={25} height={20} color="white" />}
                    onPress={() => console.log('Trainer sessions pressed')}
                  />

                  {/* Tournaments Card */}
                  <SmallCard
                    title="Турниры"
                    icon={<GraduationCapIcon width={25} height={20} color="white" />}
                    onPress={() => console.log('Tournaments pressed')}
                  />
                </View>
              </View>

              {/* Your Clubs Section */}
              <View className="w-[358px] h-[184px]">
                <Text className="font-bold text-[24px] text-slate-800 leading-[32px] w-[124px] mb-[22px]">
                  Your clubs
                </Text>

                <View className="flex-row gap-4">
                  <TouchableOpacity
                    className="bg-white h-32 w-[171px] rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                    onPress={() => console.log('Club 1 pressed')}
                  >
                    <Image
                      source={require('@/assets/figma/club-image-1.png')}
                      className="h-32 w-[171px]"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-white h-32 w-[171px] rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                    onPress={() => console.log('Club 2 pressed')}
                  >
                    <Image
                      source={require('@/assets/figma/club-image-2.png')}
                      className="h-32 w-[171px]"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
