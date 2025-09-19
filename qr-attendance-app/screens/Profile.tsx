import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="mt-14">
          <Text className="text-[24px] font-extrabold ml-5">Profile</Text>
        </View>

          <View className=" items-center mt-8">
              <View className="w-[380px] h-[136px] bg-white rounded-xl px-4 py-8"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,

                        elevation: 7,
                    }}>
                  <Text className="text-[20px] font-bold">Justin Nabunturan</Text>
                  <Text className="text-[16px] font-bold mt-1">143903</Text>
                  <Text className="text-[16px] font-bold mt-1">@umindanao.edu.ph</Text>
              </View>
          </View>

          <View className="items-center mt-7">
              <View className="w-[380px] h-[40px] bg-white rounded-xl"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,

                        elevation: 7,
                    }}>
                  <Text className="text-[16px] font-bold px-4 py-3">Password</Text>
              </View>
          </View>

          <View className="items-center mt-4">
              <View className="w-[380px] h-[40px] bg-white rounded-xl"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,

                        elevation: 7,
                    }}>
                  <Text>
                      <TouchableOpacity>
                          <Text className="text-[16px] font-bold px-4 py-3">Log out</Text>
                      </TouchableOpacity>
                  </Text>
              </View>
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
