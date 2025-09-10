import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Homemenu() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <View className="ml-5">
            <Text className="text-[#E03A2E] text-[20px] font-extrabold">
              UMTC <Text className="text-[#F6C667]">Intramurals</Text>
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-[24px] font-bold ml-5 mt-[29px]">Home</Text>
          <View className="flex-row gap-[16px] justify-center mt-[23px]">
            <TouchableOpacity
              className="bg-[#900C27] w-[120px] h-[55px] justify-center rounded-xl"
              onPress={() => navigation.navigate("Qr" as never)}
            >
              <View className="flex-row justify-center gap-1">
                <Text className=" text-white font-extrabold">Scan QR</Text>
                <FontAwesomeIcon icon={faQrcode} style={{ color: "#ffffff" }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#900C27] w-[120px] h-[55px] justify-center rounded-xl"
              onPress={() => navigation.navigate("Leaderboard" as never)}
            >
              <View className="flex-row justify-center gap-1">
                <Text className="text-white font-extrabold">Leaderboard</Text>
                <FontAwesomeIcon
                  icon={faChartSimple}
                  style={{ color: "#ffffff" }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className=" bg-[#900C27] w-[120px] h-[55px] justify-center rounded-xl"
              onPress={() => navigation.navigate("Profile" as never)}
            >
              <View className="flex-row justify-center gap-2">
                <Text className="text-white font-extrabold">Profile</Text>
                <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-[50px]">
            <Text className="text-[20px] font-bold ml-5">Upcoming Events</Text>

            <View className="flex-row gap-8 justify-center mt-[10px]">
              <View
                className="w-[160px] h-[80px] bg-white px-3 pt-2 rounded-lg"
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
                <Text className="font-bold text-[13px] mb-3">Basketball</Text>
                <View>
                  <Text className="font-bold text-center ">DASE VS DCJE</Text>
                </View>
                <Text className="font-bold text-gray-500 text-[11px] mt-3 text-right">
                  3PM
                </Text>
              </View>

              <View
                className="w-[160px] h-[80px] bg-white px-3 pt-2 rounded-lg"
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
                <Text className="font-bold text-[13px] mb-3">Basketball</Text>
                <View>
                  <Text className="font-bold text-center ">DASE VS DCJE</Text>
                </View>
                <Text className="font-bold text-gray-500 text-[11px] mt-3 text-right">
                  3PM
                </Text>
              </View>
            </View>

            <View>
              <Text></Text>
            </View>
          </View>
          <View className="mt-[40px]">
            <Text className="text-[20px] ml-5 font-bold">Announcement</Text>

            <View className="flex-row justify-center">
              <View
                className="w-[340px] h-[60px] bg-white px-3 pt-2 rounded-lg mt-[10px] justify-center"
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
                <Text className="font-bold text-[16px] text-center mb-3">
                  Basketball finals today at 3 PM!
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
