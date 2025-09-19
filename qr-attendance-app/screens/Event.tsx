import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Event() {
  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          <View className=" flex mt-14">
            <Text className="text-[24px] font-extrabold ml-5">Events</Text>

            <View className="mt-14">
              <View
                className="flex w-[340px] h-[80px] bg-white self-center rounded-lg"
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,

                  elevation: 7,
                }}
              >
                <View className="flex-row justify-between px-4 pt-2">
                  <Text className="text-[16px] font-bold">Basketball</Text>
                  <Text className="text-[16px] font-bold text-gray-500">
                    3PM
                  </Text>
                </View>
                <View className="flex-row justify-center mt-1">
                  <Text className="text-[20px] font-bold">DASE</Text>
                  <Text className="text-[20px] font-bold"> VS </Text>
                  <Text className="text-[20px] font-bold">DCJE</Text>
                </View>
              </View>

              <View
                className="flex w-[340px] h-[80px] bg-white self-center rounded-lg mt-[20px]"
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,

                  elevation: 7,
                }}
              >
                <View className="flex-row justify-between px-4 pt-2">
                  <Text className="text-[16px] font-bold">Basketball</Text>
                  <Text className="text-[16px] font-bold text-gray-500">
                    4PM
                  </Text>
                </View>
                <View className="flex-row justify-center mt-1">
                  <Text className="text-[20px] font-bold">DEE</Text>
                  <Text className="text-[20px] font-bold"> VS </Text>
                  <Text className="text-[20px] font-bold">DHE</Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
}
