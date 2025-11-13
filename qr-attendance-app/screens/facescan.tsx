import * as React from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";

import { postJson } from "../lib/api";

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  department: string;
  password: string;
};

type SignupResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  department: string | null;
};

type FacescanRouteParams = {
  formData: SignupFormData;
};

type RootStackParamList = {
  Facescan: FacescanRouteParams;
};

export default function FaceScan() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, "Facescan">>();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = React.useRef<CameraView | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [createdStudentId, setCreatedStudentId] = React.useState<number | null>(
    null
  );

  const formData = route.params?.formData;

  React.useEffect(() => {
    if (permission?.status === "undetermined") {
      requestPermission();
    }
  }, [permission?.status, requestPermission]);

  const ensureSignup = React.useCallback(async () => {
    if (createdStudentId) {
      return createdStudentId;
    }
    if (!formData) {
      throw new Error("Registration details missing.");
    }
    const response = await postJson<SignupResponse>(
      "/api/auth/signup",
      formData
    );
    setCreatedStudentId(response.id);
    return response.id;
  }, [createdStudentId, formData]);

  const handleCaptureAndEnroll = React.useCallback(async () => {
    if (!cameraRef.current || isSubmitting) {
      return;
    }

    if (!formData) {
      Alert.alert(
        "Missing details",
        "We couldn't find your registration details. Please start over."
      );
      navigation.navigate("Signup" as never);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const capture = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.7,
        skipProcessing: true,
      });

      if (!capture?.base64) {
        throw new Error("Failed to capture image. Please try again.");
      }

      const studentId = await ensureSignup();

      await postJson<{ ok: boolean; templateId: number }>(
        "/api/face/enroll",
        {
          studentId,
          image: capture.base64,
        }
      );

      Alert.alert("Success", "Face enrollment completed.", [
        {
          text: "Continue",
          onPress: () => navigation.navigate("Scansuccess" as never),
        },
      ]);
    } catch (e: any) {
      const message = e?.message ?? "Unable to enroll face. Please try again.";
      setError(message);
      Alert.alert("Enrollment failed", message);
    } finally {
      setIsSubmitting(false);
    }
  }, [cameraRef, ensureSignup, formData, isSubmitting, navigation]);

  if (!formData) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-lg font-semibold">
            Registration details missing.
          </Text>
          <TouchableOpacity
            className="mt-6 bg-[#900C27] px-6 py-3 rounded-lg"
            onPress={() => navigation.navigate("Signup" as never)}
          >
            <Text className="text-white font-bold">Back to Signup</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (!permission) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#900C27" />
          <Text className="mt-4 font-semibold">Checking camera permissions…</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-lg font-semibold">
            Camera access is required to enroll your face.
          </Text>
          <TouchableOpacity
            className="mt-6 bg-[#900C27] px-6 py-3 rounded-lg"
            onPress={requestPermission}
          >
            <Text className="text-white font-bold">Enable Camera</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-row items-center justify-between px-6 pt-6">
          <Pressable
            disabled={isSubmitting}
            onPress={() => navigation.goBack()}
          >
            <FontAwesomeIcon
              icon={faArrowLeft as IconProp}
              size={24}
              style={{ color: "#FFFFFF" }}
            />
          </Pressable>
          <Text className="text-white text-lg font-semibold">
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <View className="flex-1 mt-6 mx-4 overflow-hidden rounded-3xl border-2 border-white/20">
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing="front"
          />
        </View>

        <View className="px-6 py-6 bg-white rounded-t-3xl">
          <Text className="text-center text-base font-semibold text-gray-700">
          </Text>
          {error ? (
            <Text className="mt-3 text-center text-sm text-red-600">{error}</Text>
          ) : null}
          <TouchableOpacity
            className={`mt-6 w-full items-center justify-center rounded-xl ${
              isSubmitting ? "bg-[#A55F70]" : "bg-[#900C27]"
            } py-4`}
            disabled={isSubmitting}
            onPress={handleCaptureAndEnroll}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-lg font-bold">
                Capture & Register
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
