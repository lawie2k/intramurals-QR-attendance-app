import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import { getJson } from "../lib/api";

const isUmEmail = (value: string) => {
    const trimmed = value.trim();
    const atIndex = trimmed.lastIndexOf("@");
    if (atIndex <= 0) return false;
    const domain = trimmed.slice(atIndex + 1).toLowerCase();
    return domain === "umindanao.edu.ph";
};

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  department: string;
  password: string;
};

export default function Signup() {
  const navigation = useNavigation<any>();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
    const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isStrongPassword = (pw: string) => PASSWORD_REGEX.test(pw);
    const [pwError, setPwError] = React.useState("");
  const [studentId, setStudentId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [deptOpen, setDeptOpen] = React.useState(false);
  const [departmentOptions, setDepartmentOptions] = React.useState<string[]>([]);
  const [deptLoading, setDeptLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setDeptLoading(true);
        const data = await getJson<{ departments: string[] }>("/api/departments");
        if (Array.isArray(data.departments)) {
          setDepartmentOptions(data.departments);
        } else {
          setDepartmentOptions([]);
        }
      } catch (e: any) {
        console.warn("Failed to load departments", e?.message);
        setDepartmentOptions([]);
      } finally {
        setDeptLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  function validateForm(): boolean {
    if (!firstName || !lastName || !email || !studentId || !password || !department) {
      Alert.alert(
        "Missing info",
        "First Name, Last Name, Email, Student ID, Department and Password are required."
      );
      return false;
    }
    if (!isUmEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid Umindanao email.");
      return false;
    }
    if (!isStrongPassword(password)) {
      setPwError("Min 8 chars, 1 uppercase, 1 number");
      Alert.alert(
        "Invalid Password",
        "Password must have at least 8 characters, 1 uppercase letter, and 1 number."
      );
      return false;
    }
    setPwError("");
    if (!confirmPassword.trim()) {
      Alert.alert("Missing info", "Please confirm your password.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match", "Passwords do not match.");
      return false;
    }
    return true;
  }

  function handleRegister() {
    if (!validateForm()) {
      return;
    }

    const formData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      studentId: studentId.trim(),
      department,
      password,
    };

    navigation.navigate("Facescan" as never, { formData } as never);
  }
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
              value={firstName}
              onChangeText={setFirstName}
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
              value={lastName}
              onChangeText={setLastName}
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
              value={email}
              onChangeText={setEmail}
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
              value={studentId}
              onChangeText={setStudentId}
            ></TextInput>

            <View className="mt-4">
              <Pressable
                className="bg-white w-[300px] h-[50px] px-4 py-3 justify-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
                onPress={() => {
                  if (!deptLoading && departmentOptions.length > 0) {
                    setDeptOpen((o) => !o);
                  }
                }}
              >
                {deptLoading ? (
                  <ActivityIndicator color="#900C27" />
                ) : (
                  <Text className={department ? "text-black" : "text-[#9CA3AF]"}>
                    {department || "Select Department"}
                  </Text>
                )}
              </Pressable>
              {deptOpen && (
                <View
                  className="bg-white w-[300px] mt-2 rounded-md"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 4,
                  }}
                >
                  {departmentOptions.length === 0 ? (
                    <Text className="px-4 py-3 text-[#9CA3AF]">No departments found</Text>
                  ) : (
                    departmentOptions.map((opt) => (
                      <Pressable
                        key={opt}
                        className="px-4 py-3"
                        onPress={() => {
                          setDepartment(opt);
                          setDeptOpen(false);
                        }}
                      >
                        <Text className="text-black">{opt}</Text>
                      </Pressable>
                    ))
                  )}
                </View>
              )}
            </View>

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
              value={password}
              onChangeText={setPassword}
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
                  placeholder="Confirm Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                  textContentType="password"
                  returnKeyType="done"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
              ></TextInput>

            <TouchableOpacity
              className="mt-6 w-[300px] bg-[#900C27] py-3"
              onPress={handleRegister}
            >
              <Text className="text-center text-white text-[17px] font-bold">
                Continue to Face Scan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
