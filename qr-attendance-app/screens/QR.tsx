import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function QR() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="mt-14">
          <Text className="text-[24px] font-extrabold ml-5">QR</Text>
        </View>

        <View
          className="flex self-center bg-white mt-[38px] w-[340px] h-[340px] rounded-xl"
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
        ></View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
