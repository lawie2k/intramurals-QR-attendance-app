import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image, Pressable, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useNavigation } from "@react-navigation/native";

export default function FaceScan() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className=" ml-8 mt-10 ">
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft as IconProp}
              size={24}
              style={{ color: "#C70039" }}
            />
          </Pressable>
        </View>
        <View className=" mt-10 flex items-center ">
          <Image
            source={require("../assets/scanIMG.png")}
            className="w-[308px] h-[320px] mt-2 rounded-full"
            resizeMode="contain"
          />
          <Pressable
            onPress={() => navigation.navigate("Scansuccess" as never)}
          >
            <Text className="text-[32px] font-bold mt-8">Scanning Face</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
