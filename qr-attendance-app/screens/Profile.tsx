import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";

import {useAuth} from "../context/AuthContext";

export default function Profile() {
    const navigation = useNavigation();
    const {auth} = useAuth();


  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="mt-14">
          <Text className="text-[24px] font-extrabold ml-5">Profile</Text>
        </View>

          <View className=" items-center mt-8">
              <View className="w-[380px] h-[136px] bg-white rounded-xl px-4 py-4"
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
                  <Text className="text-[26px] font-bold pb-1">{auth.firstName} {auth.lastName}</Text>
                  <Text className="text-[16px] font-bold mt-1">{auth.email}</Text>
                  <Text className="text-[16px] font-bold mt-1">{auth.studentId}</Text>
                  <Text className="text-[16px] font-bold mt-1">{auth.department}</Text>
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
                 <TouchableOpacity onPress={()=>{navigation.navigate("Resetpass" as never)}}>
                     <Text className="text-[16px] font-bold px-4 py-3">Password</Text>
                 </TouchableOpacity>
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
                      <TouchableOpacity onPress={()=>{navigation.navigate("Login"as never)}}>
                          <Text className="text-[16px] font-bold px-4 py-3">Log out</Text>
                      </TouchableOpacity>
                  </Text>
              </View>
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
