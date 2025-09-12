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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
