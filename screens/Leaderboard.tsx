import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Leaderboard() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="mt-14">
          <Text className="text-[24px] font-extrabold ml-5">Leaderboard</Text>
        </View>

        <View>
          {/*-------------------------DASE------------------------------- */}
        </View>
        <View
          className="flex w-[340px] h-[80px] bg-white self-center rounded-lg mt-14"
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
          <View className="flex-1 justify-center px-4">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-[20px] font-bold mt-3">DASE</Text>
              </View>
              <View className="flex-row items-center">
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../assets/gold.png")}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[40px] font-bold mr-5">5</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../assets/silver.png")}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[40px] font-bold mr-5">2</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../assets/bronze.png")}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[40px] font-bold">1</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          {/*-------------------------END------------------------------- */}
        </View>

        <View>
          {/*-------------------------DCJE------------------------------- */}
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
          <View className="flex-1 justify-center px-4">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-[20px] font-bold mt-3">DCJE</Text>
              </View>
              <View className="flex-row items-center">
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../assets/gold.png")}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[40px] font-bold mr-5">4</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../assets/silver.png")}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[40px] font-bold mr-5">3</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../assets/bronze.png")}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[40px] font-bold">0</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          {/*-------------------------END------------------------------- */}
        </View>

        <View>
          {/*-------------------------DEE------------------------------- */}
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
          <View className="flex-1 justify-center px-4">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-[20px] font-bold mt-3">DEE</Text>
              </View>
              <View className="flex-row items-center">
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../assets/gold.png")}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[40px] font-bold mr-5">2</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../assets/silver.png")}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[40px] font-bold mr-5">3</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../assets/bronze.png")}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[40px] font-bold">5</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          {/*-------------------------END------------------------------- */}
        </View>

        <View>
          {/*-------------------------DHE------------------------------- */}
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
          <View className="flex-1 justify-center px-4">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-[20px] font-bold mt-3">DHE</Text>
              </View>
              <View className="flex-row items-center">
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../assets/gold.png")}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[40px] font-bold mr-5">1</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../assets/silver.png")}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[40px] font-bold mr-5">0</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../assets/bronze.png")}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[40px] font-bold">0</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          {/*-------------------------END------------------------------- */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
