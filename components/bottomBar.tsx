import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons/faCalendarDays";
import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

export default function BottomBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const tabIcons: Record<string, any> = {
    Home: faHouse,
    Events: faCalendarDays,
    Qr: faQrcode,
    Leaderboard: faTrophy,
    Profile: faUser,
  };

  return (
    <View className="flex-row bg-[#F1F8FD] border-t border-gray-200 py-3">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented)
            navigation.navigate(route.name);
        };
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center pb-12 pt-6"
          >
            <View
              className={`items-center px-4 py-2 w-[100px] h-[50px] rounded-xl ${
                isFocused ? "bg-[#900C27] w-[80px] " : ""
              }`}
            >
              <FontAwesomeIcon
                icon={tabIcons[route.name]}
                size={isFocused ? 30 : 20}
                color={isFocused ? "#F6C667" : "#9CA3AF"}
              />

              <Text
                className={
                  isFocused
                    ? "text-transparent "
                    : "text-[11px] mt-2 text-gray-500"
                }
              >
                {route.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
