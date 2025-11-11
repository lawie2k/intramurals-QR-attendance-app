import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Pressable } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { postJson } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigation = useNavigation();
  const [signUpPressed, setSignUpPressed] = useState(false);
  const [loginPressed, setloginPressed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Missing info", "Email and Password are required.");
      return;
    }
    try {
      setLoading(true);
      const data = await postJson<{ token: string; id: number; studentId: string; firstName: string; lastName: string; email: string; department: string }>(
        "/api/auth/login",
        {
          email,
          password,
        }
      );
      setAuth({
        email: data.email,
        token: data.token,
        id: data.id,
        studentId: data.studentId,
        firstName: data.firstName,
        lastName: data.lastName,
        department: data.department,
      });
      // You can store data.token in secure storage later
      setloginPressed(true);
      navigation.navigate("Main" as never);
    } catch (e: any) {
      Alert.alert("Login failed", e?.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white justify-center">
        <View className="flex-1 items-center mt-28">
          <Text className="text-center text-[#E03A2E] text-[36px] font-extrabold">
            UMTC <Text className="text-[#F6C667]">Intramurals</Text>
          </Text>

          <View className="flex-1 mt-24">
            <Text className=" text-[16px] font-extrabold">
              Login to your Account
            </Text>
            <TextInput
              className="bg-white w-[300px] h-[50px] mt-4 px-4 py-3 "
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
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              className="bg-white w-[300px] h-[50px] mt-4 px-4 py-3 "
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
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              textContentType="password"
              returnKeyType="done"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              className="mt-6 w-[300px] bg-[#900C27] py-3"
              disabled={loading}
              onPress={handleLogin}
            >
              <Text className="text-center text-white text-[17px] font-bold">
                {loading ? "Logging in..." : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center items-center mb-6">
            <Text className="text-[16px] font-medium">
              Dont have an account?{" "}
            </Text>
            <Pressable
              accessibilityRole="button"
              hitSlop={10}
              onPress={() => {
                setSignUpPressed(true);
                navigation.navigate("Signup" as never);
              }}
            >
              <Text className="text-[16px] font-bold text-[#900C27]">
                Sign up
              </Text>
            </Pressable>
            {signUpPressed}
            {loginPressed}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
