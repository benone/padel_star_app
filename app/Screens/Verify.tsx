import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SvgXml } from 'react-native-svg';
import { useVerifyTelegramCodeMutation, useSendTelegramVerificationCodeMutation } from '@/src/generated/graphql';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/src/auth/AuthContext';
import { AnonymousGate } from '@/src/auth/AuthGate';
import { showError, showAlert } from '@/src/utils/crossPlatformAlert';

// SVG assets as constants
const menuHamburgerSvg = `<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 1C0 0.447715 0.447715 0 1 0H19C19.5523 0 20 0.447715 20 1C20 1.55228 19.5523 2 19 2H1C0.447715 2 0 1.55228 0 1Z" fill="white"/>
<path d="M0 7C0 6.44772 0.447715 6 1 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H1C0.447715 8 0 7.55228 0 7Z" fill="white"/>
<path d="M0 13C0 12.4477 0.447715 12 1 12H19C19.5523 12 20 12.4477 20 13C20 13.5523 19.5523 14 19 14H1C0.447715 14 0 13.5523 0 13Z" fill="white"/>
</svg>`;

const telegramIconSvg = `<svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.5 15C21.5 21.9036 16.9036 27.5 10 27.5C3.09644 27.5 -1.5 21.9036 -1.5 15C-1.5 8.09644 3.09644 2.5 10 2.5C16.9036 2.5 21.5 8.09644 21.5 15Z" fill="#229ED9" stroke="#229ED9"/>
<path d="M9.0625 19.4375L14.5625 12.8125L9.0625 10.5625V19.4375Z" fill="white"/>
</svg>`;

const sendArrowSvg = `<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.50001 2.33332L10.6667 7.00001L5.50001 11.6667M10.3333 7.00001H2.33334" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const smsIconSvg = `<svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H8.5C9.05228 1.5 9.5 1.94772 9.5 2.5V11.5C9.5 12.0523 9.05228 12.5 8.5 12.5H2.5C1.94772 12.5 1.5 12.0523 1.5 11.5V2.5Z" stroke="#374151" stroke-width="1.5"/>
<path d="M3.5 3.5H7.5" stroke="#374151" stroke-width="1.5" stroke-linecap="round"/>
<path d="M3.5 10.5H7.5" stroke="#374151" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

function VerifyForm() {
  const [code, setCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [requestId, setRequestId] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  
  // Load params from AsyncStorage
  React.useEffect(() => {
    const loadParams = async () => {
      const stored = await AsyncStorage.getItem('verificationParams');
      if (stored) {
        const params = JSON.parse(stored);
        setPhoneNumber(params.phoneNumber);
        setRequestId(params.requestId);
      }
    };
    loadParams();
  }, []);
  
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null)
  ];

  const [verifyCode] = useVerifyTelegramCodeMutation();
  const [resendVerificationCode] = useSendTelegramVerificationCodeMutation();

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto focus next input
    if (text && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace to focus previous input
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleLogin = async () => {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 4) {
      showError('Введите полный 4-значный код');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await verifyCode({
        variables: {
          phoneNumber,
          code: verificationCode,
          requestId
        }
      });
      
      if (result.data?.verifyTelegramCode?.success && result.data?.verifyTelegramCode?.token) {
        await login(result.data.verifyTelegramCode.token);
        // The redirect will happen automatically via AuthGate
      } else {
        showError(result.data?.verifyTelegramCode?.error || 'Неверный код');
      }
    } catch (error) {
      console.error('Verify error:', error);
      showError('Произошла ошибка при проверке кода');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendSMS = async () => {
    try {
      await resendVerificationCode({
        variables: { phoneNumber }
      });
      showAlert('Успешно', 'Код отправлен повторно');
    } catch (error) {
      showError('Не удалось отправить код повторно');
    }
  };

  const handleTelegramAccountPress = () => {
    // Handle telegram account navigation
  };

  const handleTermsPress = () => {
    // Handle terms of use
  };

  const handlePrivacyPress = () => {
    // Handle privacy policy
  };

  return (
    <SafeAreaView
      className="bg-white flex-1"
      data-name="Screens/Verify"
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
              <View className="items-center">
                <View className="flex flex-col gap-6 items-center justify-start">
                  {/* Icon Container */}
                  <View className="bg-slate-800 rounded-2xl px-[29px] py-[25px]">
                    <SvgXml xml={telegramIconSvg} width={22.5} height={30} />
                  </View>
                  
                  {/* Text Container */}
                  <View className="items-center">
                    <View className="flex flex-col gap-2 items-center justify-start px-[30px] py-[5px]">
                      <Text className="font-bold text-[24px] text-slate-800 text-center leading-normal w-[239px]">
                        Введите код
                      </Text>
                      <Text className="font-normal text-[16px] text-gray-600 text-center leading-normal w-[296px]">
                        <Text>Мы отправили код подтверждение в ваш Телеграм на номер </Text>
                        <Text className="font-bold">{phoneNumber}</Text>
                      </Text>
                    </View>
                  </View>

                  {/* OTP Input Container */}
                  <View className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-[26px]">
                    <View className="flex flex-col gap-[29px]">
                      <View className="flex flex-col gap-3 px-0 py-px">
                        {/* Label */}
                        <View className="w-full">
                          <Text className="font-bold text-[18px] text-slate-800 leading-normal">
                            Код подтверждения
                          </Text>
                        </View>

                        {/* OTP Input Fields */}
                        <View className="bg-gray-50 rounded-xl border border-gray-200 px-[41px] py-5">
                          <View className="flex flex-row gap-3 items-center justify-start">
                            {code.map((digit, index) => (
                              <TextInput
                                key={index}
                                ref={inputRefs[index]}
                                className="bg-white w-12 h-12 rounded-lg border border-gray-300 text-center text-[18px] font-bold text-slate-800"
                                value={digit}
                                onChangeText={(text) => handleCodeChange(text.slice(-1), index)}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                                keyboardType="numeric"
                                maxLength={1}
                                selectTextOnFocus
                              />
                            ))}
                          </View>
                        </View>

                        {/* Helper Text */}
                        <View className="w-full">
                          <View className="flex-row items-center justify-center px-[19px]">
                            <Text className="font-normal text-[14px] text-gray-500 text-center leading-normal w-[263px]">
                              Введите 4-значный код из сообщения
                            </Text>
                          </View>
                        </View>
                      </View>
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
                onPress={handleLogin}
                disabled={isLoading}
                data-name="Submit Button"
              >
                <Text className="font-bold text-[16px] text-white leading-normal">
                  {isLoading ? 'Проверка...' : 'Войти'}
                </Text>
                {!isLoading && <SvgXml xml={sendArrowSvg} width={12.25} height={14} />}
              </Pressable>

              {/* Alternative Option Container */}
              <View className="h-14 flex-row gap-[9px] items-center justify-center">
                <View className="w-[175px]">
                  <View className="flex-row items-center justify-center px-[62px]">
                    <Text className="font-normal text-[14px] text-gray-500 text-center leading-normal w-[149px]">
                      Не используете Telegram?
                    </Text>
                  </View>
                </View>
                
                <Pressable
                  className="bg-white h-[42px] w-[174px] rounded-xl border border-gray-300 flex-row items-center justify-center gap-1.5 px-[26px] py-2.5 active:bg-gray-50"
                  onPress={handleSendSMS}
                >
                  <Text className="font-normal text-[16px] text-slate-800 text-center leading-normal">
                    Отправить SMS
                  </Text>
                  <SvgXml xml={smsIconSvg} width={11} height={14} />
                </Pressable>
              </View>

              {/* Terms Container */}
              <View className="h-[118px] w-[358px] flex-row items-center justify-center px-0 py-[19px]">
                <Text className="font-normal text-[13px] text-gray-500 text-center leading-[1.52] flex-1">
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
    </SafeAreaView>
  );
}

export default function Verify() {
  return (
    <AnonymousGate>
      <VerifyForm />
    </AnonymousGate>
  );
}