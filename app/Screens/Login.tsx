import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SvgXml } from 'react-native-svg';
import { useSendTelegramVerificationCodeMutation } from '@/src/generated/graphql';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnonymousGate } from '@/src/auth/AuthGate';

// SVG assets as constants
const menuHamburgerSvg = `<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 1C0 0.447715 0.447715 0 1 0H19C19.5523 0 20 0.447715 20 1C20 1.55228 19.5523 2 19 2H1C0.447715 2 0 1.55228 0 1Z" fill="white"/>
<path d="M0 7C0 6.44772 0.447715 6 1 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H1C0.447715 8 0 7.55228 0 7Z" fill="white"/>
<path d="M0 13C0 12.4477 0.447715 12 1 12H19C19.5523 12 20 12.4477 20 13C20 13.5523 19.5523 14 19 14H1C0.447715 14 0 13.5523 0 13Z" fill="white"/>
</svg>`;

const phoneIconContainerSvg = `<svg width="79" height="80" viewBox="0 0 79 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="79" height="80" rx="16" fill="#334155"/>
<path d="M31 37C31 35.8954 31.8954 35 33 35H45C46.1046 35 47 35.8954 47 37V53C47 54.1046 46.1046 55 45 55H33C31.8954 55 31 54.1046 31 53V37Z" stroke="white" stroke-width="2"/>
<path d="M35 39H43" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M35 51H43" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const phoneIconInputSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 3C5.44772 3 5 3.44772 5 4V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3H6Z" stroke="#6B7280" stroke-width="2"/>
<path d="M8 5H16" stroke="#6B7280" stroke-width="2" stroke-linecap="round"/>
<path d="M8 19H16" stroke="#6B7280" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const sendArrowSvg = `<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.50001 2.33332L10.6667 7.00001L5.50001 11.6667M10.3333 7.00001H2.33334" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const [sendVerificationCode] = useSendTelegramVerificationCodeMutation();

  const handleSendCode = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Ошибка', 'Введите номер телефона');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await sendVerificationCode({
        variables: { phoneNumber }
      });
      
      if (result.data?.sendTelegramVerificationCode?.success) {
        const requestId = result.data.sendTelegramVerificationCode.requestId;
        
        // Store params and navigate
        await AsyncStorage.setItem('verificationParams', JSON.stringify({
          phoneNumber,
          requestId
        }));
        
        router.push('/Screens/Verify');
      } else {
        Alert.alert('Ошибка', result.data?.sendTelegramVerificationCode?.error || 'Не удалось отправить код');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка при отправке кода');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsPress = () => {
    console.log('Terms of use pressed');
  };

  const handlePrivacyPress = () => {
    console.log('Privacy policy pressed');
  };

  return (
    <SafeAreaView
      className="bg-white flex-1"
      data-name="Screens/Login"
    >
      <StatusBar style="light" />
      
      <View className="flex-1 flex flex-col">
        {/* Top Bar */}
        <View
          className="bg-slate-800 h-[63px] flex-row items-center justify-between px-3 py-[15px]"
          data-name="Top Bar"
        >
          <Text className="font-bold text-[24px] text-white leading-[32px] w-[236px]">
            Добро пожаловать
          </Text>
          <View className="h-7 w-[51px] items-end justify-center">
            <SvgXml xml={menuHamburgerSvg} width={17.5} height={20} />
          </View>
        </View>

        {/* Body */}
        <View className="flex-1 bg-gray-100">
          <View className="flex-1 items-center justify-center px-4 py-[84px]">
            <View className="flex flex-col gap-[35px] items-center justify-center w-full">
              
              {/* Header Section */}
              <View className="w-full">
                <View className="flex flex-col gap-6 items-center justify-start">
                  {/* Icon Container */}
                  <View className="h-20 w-[78.625px]">
                    <SvgXml xml={phoneIconContainerSvg} width={78.625} height={80} />
                  </View>
                  
                  {/* Text Container */}
                  <View className="w-full">
                    <View className="flex flex-col gap-[22px] items-center justify-center px-[30px] py-[18px]">
                      <Text className="font-bold text-[24px] text-slate-800 text-center w-full leading-normal">
                        Добро пожаловать!
                      </Text>
                      <Text className="font-normal text-[16px] text-gray-600 text-center w-full leading-normal">
                        Введите номер телефона для входа в приложение
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Input Container */}
              <View className="bg-white rounded-2xl w-full shadow-sm border border-gray-200">
                <View className="flex flex-col gap-6 items-center justify-center px-[23px] py-[25px]">
                  
                  {/* Phone Number Input Container */}
                  <View className="h-[90px] w-full">
                    <View className="flex flex-col h-[90px] justify-start w-full">
                      {/* Label Container */}
                      <View className="flex-1 justify-start">
                        <Text className="font-bold text-[18px] text-slate-800 leading-normal mt-[1.18px]">
                          Введите номер телефона
                        </Text>
                      </View>
                      
                      {/* Input Field Container */}
                      <View className="bg-gray-50 rounded-xl border border-gray-200 flex-row items-center px-[17px] py-[19px]">
                        <View className="w-6 h-6 mr-3">
                          <SvgXml xml={phoneIconInputSvg} width={24} height={24} />
                        </View>
                        <TextInput
                          className="flex-1 text-[16px] text-gray-900 leading-[24px]"
                          placeholder="+7 (999) 123-45-67"
                          placeholderTextColor="#ADAEBC"
                          value={phoneNumber}
                          onChangeText={setPhoneNumber}
                          keyboardType="phone-pad"
                        />
                      </View>
                    </View>
                  </View>

                  {/* Confirmation Message Container */}
                  <View className="w-full">
                    <View className="flex-row items-center justify-center px-[3px]">
                      <Text className="font-normal text-[14px] text-gray-500 text-center leading-normal flex-1">
                        Мы отправим сообщение с кодом подтверждения
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Submit Button */}
              <Pressable
                className={`h-[55px] w-[312px] rounded-xl flex-row items-center justify-center gap-[13px] ${
                  isLoading 
                    ? 'bg-slate-600' 
                    : 'bg-slate-800 active:bg-slate-700'
                }`}
                onPress={handleSendCode}
                disabled={isLoading}
                data-name="Submit Button"
              >
                <Text className="font-bold text-[16px] text-white leading-normal">
                  {isLoading ? 'Отправка...' : 'Отправить код'}
                </Text>
                {!isLoading && <SvgXml xml={sendArrowSvg} width={12.25} height={14} />}
              </Pressable>

              {/* Terms Container */}
              <View className="w-full">
                <View className="flex flex-col items-center justify-center py-[19px]">
                  <Text className="font-normal text-[13px] text-gray-500 text-center leading-[1.52]">
                    <Text>Продолжая, вы соглашаетесь с </Text>
                    <Text 
                      className="underline"
                      onPress={handleTermsPress}
                    >
                      Условиями использования
                    </Text>
                    <Text> и политикой </Text>
                    <Text 
                      className="underline"
                      onPress={handlePrivacyPress}
                    >
                      конфиденциальности
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function Login() {
  return (
    <AnonymousGate>
      <LoginForm />
    </AnonymousGate>
  );
}