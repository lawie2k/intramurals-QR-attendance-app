import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function Signup() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white justify-center">
        <View className=" ml-8 mt-10 ">
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft as IconProp}
              size={24}
              style={{ color: "#C70039" }}
            />
          </Pressable>
        </View>

        <View className="flex-1 mt-16 items-center">
          <Text className="text-center text-[#E03A2E] text-[36px] font-extrabold">
            UMTC <Text className="text-[#F6C667]">Intramurals</Text>
          </Text>

          <View>
            <Text className="font-extrabold text-start mt-10">
              Create your Account
            </Text>
            <TextInput
              className="bg-white w-[300px] h-[50px] mt-4 px-4 py-3"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              }}
              placeholder="First Name"
              placeholderTextColor="#9CA3AF"
              keyboardType="default"
              inputMode="text"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="given-name"
              textContentType="givenName"
              returnKeyType="next"
            ></TextInput>

            <TextInput
              className="bg-white w-[300px] h-[50px] mt-6 px-4 py-3"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              }}
              placeholder="Last Name"
              placeholderTextColor="#9CA3AF"
              keyboardType="default"
              inputMode="text"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="family-name"
              textContentType="familyName"
              returnKeyType="next"
            ></TextInput>

            <TextInput
              className="bg-white w-[300px] h-[50px] mt-6 px-4 py-3"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              }}
              placeholder="Umindanao Email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
            ></TextInput>

            <TextInput
              className="bg-white w-[300px] h-[50px] mt-6 px-4 py-3"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              }}
              placeholder="ID no."
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              inputMode="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              textContentType="none"
              returnKeyType="next"
            ></TextInput>

            <TextInput
              className="bg-white w-[300px] h-[50px] mt-6 px-4 py-3"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              }}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              textContentType="password"
              returnKeyType="done"
            ></TextInput>

            <TouchableOpacity
              className="mt-6 w-[300px] bg-[#900C27] py-3"
              onPress={() => {}}
            >
              <Text className="text-center text-white text-[17px] font-bold">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
