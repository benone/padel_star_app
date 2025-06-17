import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Image constants from local assets
const menuIconImg = require('@/assets/figma/menu-icon.svg');
const phoneIconImg = require('@/assets/figma/phone-icon.svg');
const russiaFlagImg = require('@/assets/figma/russia-flag.svg');
const arrowRightImg = require('@/assets/figma/arrow-right.svg');

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View
      className="bg-white relative rounded-lg flex-1"
      data-name="Screens/Login"
    >
      <View className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative flex-1">
        {/* Top Bar */}
        <View
          className="bg-slate-800 h-[63px] relative shrink-0 w-full"
          data-name="Top Bar"
        >
          <View className="relative flex-1">
            <View className="box-border content-stretch flex flex-row h-[63px] items-start justify-between px-3 py-[15px] relative w-full">
              <View
                className="bg-transparent relative w-[236px]"
                data-name="div"
              >
                <View className="box-border content-stretch flex flex-row items-center justify-start p-0 relative w-[236px]">
                  <Text className="font-bold h-[39px] leading-[32px] text-white text-[24px] text-left w-[236px]">
                    Добро пожаловать
                  </Text>
                </View>
              </View>
              <View
                className="bg-transparent h-7 relative w-[51px]"
                data-name="div"
              >
                <View
                  className="absolute h-5 left-[33.5px] top-[3.5px] w-[17.5px]"
                  data-name="Frame"
                >
                  <View className="box-border content-stretch flex flex-row h-5 items-center justify-center overflow-hidden p-0 relative w-[17.5px]">
                    <View
                      className="h-5 relative w-[17.5px]"
                      data-name="Frame"
                    >
                      <Image
                        source={menuIconImg}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Body */}
        <View
          className="basis-0 bg-transparent grow min-h-px min-w-px relative shrink-0 w-full"
          data-name="Body"
        >
          <View className="box-border content-stretch flex flex-row items-center justify-center p-0 relative flex-1">
            <View
              className="basis-0 bg-gray-100 grow h-full min-h-px min-w-px relative shrink-0"
              data-name="Container"
            >
              <View className="flex flex-col items-center justify-center overflow-clip relative flex-1">
                <View className="box-border content-stretch flex flex-col gap-[35px] items-center justify-center px-4 py-[84px] relative flex-1">
                  <View
                    className="bg-transparent relative shrink-0 w-full"
                    data-name="Container"
                  >
                    <View className="box-border content-stretch flex flex-col gap-6 items-center justify-start p-0 relative w-full">
                      <View
                        className="bg-slate-800 relative rounded-2xl shrink-0"
                        data-name="Icon Container"
                      >
                        <View className="flex flex-row items-center relative flex-1">
                          <View className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-[29px] py-[25px] relative">
                            <View
                              className="bg-transparent h-[30px] relative w-[22.5px]"
                              data-name="Icon"
                            >
                              <View
                                className="absolute h-[30px] left-0 top-0 w-[22.5px]"
                                data-name="Icon Frame"
                              >
                                <View className="box-border content-stretch flex flex-row h-[30px] items-center justify-center p-0 relative w-[22.5px]">
                                  <View
                                    className="h-[30px] relative w-[22.5px]"
                                    data-name="Icon Frame"
                                  >
                                    <Image
                                      source={phoneIconImg}
                                      className="w-full h-full"
                                      resizeMode="cover"
                                    />
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        className="bg-transparent relative shrink-0 w-full"
                        data-name="Text Container"
                      >
                        <View className="flex flex-col items-center justify-center relative flex-1">
                          <View className="box-border content-stretch flex flex-col gap-[22px] items-center justify-center px-[30px] py-[18px] relative text-center w-full">
                            <Text className="font-bold relative shrink-0 text-[24px] text-slate-800 w-full leading-normal">
                              Добро пожаловать!
                            </Text>
                            <Text className="font-normal h-6 relative shrink-0 text-[16px] text-gray-600 w-full leading-normal">
                              Введите номер телефона для входа в приложение
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    className="bg-white relative rounded-2xl shrink-0 w-full"
                    data-name="Container"
                  >
                    <View className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
                    <View className="flex flex-col items-center justify-center relative flex-1">
                      <View className="box-border content-stretch flex flex-col gap-6 items-center justify-center px-[23px] py-[25px] relative w-full">
                        <View
                          className="h-[90px] relative shrink-0 w-full"
                          data-name="Phone Number Input Container"
                        >
                          <View className="box-border content-stretch flex flex-col h-[90px] items-start justify-start p-0 relative w-full">
                            <View
                              className="basis-0 bg-transparent grow min-h-px min-w-px relative shrink-0 w-full"
                              data-name="Label Container"
                            >
                              <Text className="absolute font-bold h-7 left-0 text-[18px] text-left text-slate-800 top-[1.18px] w-[231px] leading-normal">
                                Введите номер телефона
                              </Text>
                            </View>
                            <View
                              className="bg-gray-50 relative rounded-xl shrink-0 w-full border border-gray-200"
                              data-name="Input Field Container"
                            >
                              <View className="flex flex-row items-center relative flex-1">
                                <View className="box-border content-stretch flex flex-row items-center justify-between px-[17px] py-[19px] relative w-full">
                                  <View
                                    className="bg-transparent relative shrink-0 size-6"
                                    data-name="Icon Container"
                                  >
                                    <View
                                      className="absolute left-[5px] w-3.5 h-3.5 top-[5px]"
                                      data-name="Icon Frame"
                                    >
                                      <View className="box-border content-stretch flex flex-row items-center justify-center overflow-hidden p-0 relative w-3.5 h-3.5">
                                        <View
                                          className="relative w-3.5 h-3.5"
                                          data-name="Icon Frame"
                                        >
                                          <Image
                                            source={russiaFlagImg}
                                            className="w-full h-full"
                                            resizeMode="cover"
                                          />
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                  <View
                                    className="bg-transparent h-6 relative w-[225px]"
                                    data-name="Phone Number Input Field"
                                  >
                                    <TextInput
                                      className="absolute flex flex-col font-normal h-6 justify-center left-0 text-[16px] text-left top-3 -translate-y-1/2 w-[152px] leading-[24px]"
                                      placeholder="+7 (999) 123-45-67"
                                      placeholderTextColor="#ADAEBC"
                                      value={phoneNumber}
                                      onChangeText={setPhoneNumber}
                                      keyboardType="phone-pad"
                                      style={{ color: phoneNumber ? '#374151' : '#ADAEBC' }}
                                    />
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View
                          className="bg-transparent relative shrink-0 w-full"
                          data-name="Confirmation Message Container"
                        >
                          <View className="flex flex-row items-center justify-center relative flex-1">
                            <View className="box-border content-center flex flex-wrap gap-2.5 items-center justify-center px-[3px] py-0 relative w-full">
                              <Text className="basis-0 font-normal grow leading-normal min-h-px min-w-px relative shrink-0 text-[14px] text-center text-gray-500">
                                Мы отправим сообщение с кодом подтверждения
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="bg-slate-800 h-[55px] relative rounded-xl w-[312px]"
                    data-name="Submit Button"
                    onPress={() => {
                      console.log('Phone number:', phoneNumber);
                    }}
                  >
                    <View className="box-border content-stretch flex flex-row gap-[13px] h-[55px] items-center justify-center p-0 relative w-[312px]">
                      <View
                        className="bg-transparent h-6 relative w-[120px]"
                        data-name="div"
                      >
                        <Text className="absolute font-bold h-6 left-[60.5px] text-white text-[16px] text-center top-[0.56px] -translate-x-1/2 w-[121px] leading-normal">
                          Отправить код
                        </Text>
                      </View>
                      <View
                        className="bg-transparent h-3.5 relative w-[12.25px]"
                        data-name="i"
                      >
                        <View
                          className="absolute h-3.5 left-0 top-0 w-[12.25px]"
                          data-name="svg"
                        >
                          <View className="box-border content-stretch flex flex-row h-3.5 items-center justify-center p-0 relative w-[12.25px]">
                            <View
                              className="h-3.5 relative w-[12.25px]"
                              data-name="Frame"
                            >
                              <Image
                                source={arrowRightImg}
                                className="w-full h-full"
                                resizeMode="cover"
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    className="relative shrink-0 w-full"
                    data-name="Terms Container"
                  >
                    <View className="flex flex-col items-center justify-center relative flex-1">
                      <View className="box-border content-stretch flex flex-col items-center justify-center px-0 py-[19px] relative w-full">
                        <Text className="font-normal leading-[1.52] text-center text-gray-500 w-full text-[13px]">
                          Продолжая, вы соглашаетесь с{' '}
                          <Text className="[text-decoration-line:underline] [text-decoration-skip-ink:none] [text-decoration-style:solid] [text-underline-position:from-font]">Условиями использования</Text>
                          {' '}и политикой{' '}
                          <Text className="[text-decoration-line:underline] [text-decoration-skip-ink:none] [text-decoration-style:solid] [text-underline-position:from-font]">конфиденциальности</Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
