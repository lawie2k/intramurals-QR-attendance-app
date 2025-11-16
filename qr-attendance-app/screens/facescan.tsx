import * as React from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
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

type FaceStatus = "searching" | "detected" | "ready";

const DETECTION_INTERVAL_MS = 800; // Reduced for faster response
const AUTO_CAPTURE_DELAY_MS = 1000; // Reduced delay

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
  const [cameraReady, setCameraReady] = React.useState(false);
  const [faceStatus, setFaceStatus] = React.useState<FaceStatus>("searching");
  const detectionIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const detectionInFlightRef = React.useRef(false);
  const faceReadyTimestampRef = React.useRef<number | null>(null);
  const handleCaptureRef = React.useRef<(() => void) | null>(null);

  const formData = route.params?.formData;


  const clearDetectionLoop = React.useCallback(() => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
  }, []);

  const runDetection = React.useCallback(async () => {
    if (
      !cameraReady ||
      !cameraRef.current ||
      detectionInFlightRef.current ||
      isSubmitting
    ) {
      return;
    }

    detectionInFlightRef.current = true;

    try {
      // Capture very low-quality preview for faster detection
      const preview = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.2, // Lower quality = faster processing
        skipProcessing: true,
        shutterSound: false,
      });

      if (!preview?.base64) {
        setFaceStatus("searching");
        faceReadyTimestampRef.current = null;
        return;
      }

      // Check if face is detected via backend
      const result = await postJson<{ detected: boolean; message: string }>(
        "/api/face/detect",
        { image: preview.base64 }
      );

      if (!result.detected) {
        setFaceStatus("searching");
        faceReadyTimestampRef.current = null;
        return;
      }

      // Face detected - show green and prepare for auto-capture
      setFaceStatus("detected");

      if (!faceReadyTimestampRef.current) {
        faceReadyTimestampRef.current = Date.now();
        return;
      }

      // Wait for stable detection before auto-capturing
      if (Date.now() - faceReadyTimestampRef.current >= AUTO_CAPTURE_DELAY_MS) {
        setFaceStatus("ready");
        faceReadyTimestampRef.current = null;
        clearDetectionLoop();
        // Auto-capture
        handleCaptureRef.current?.();
      }
    } catch (detectionError) {
      console.warn("Face detection failed", detectionError);
      setFaceStatus("searching");
      faceReadyTimestampRef.current = null;
    } finally {
      detectionInFlightRef.current = false;
    }
  }, [cameraReady, clearDetectionLoop, isSubmitting]);

  const startDetectionLoop = React.useCallback(() => {
    if (detectionIntervalRef.current || !cameraReady) {
      return;
    }

    detectionIntervalRef.current = setInterval(() => {
      runDetection().catch(() => {});
    }, DETECTION_INTERVAL_MS);
  }, [cameraReady, runDetection]);

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

    clearDetectionLoop();
    faceReadyTimestampRef.current = null;

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
        shutterSound: false,
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
      startDetectionLoop();
    } finally {
      setIsSubmitting(false);
    }
  }, [
    cameraRef,
    clearDetectionLoop,
    ensureSignup,
    formData,
    isSubmitting,
    navigation,
    startDetectionLoop,
  ]);

  React.useEffect(() => {
    handleCaptureRef.current = handleCaptureAndEnroll;
  }, [handleCaptureAndEnroll]);

  React.useEffect(() => {
    if (cameraReady && !isSubmitting) {
      startDetectionLoop();
    }
    return () => {
      clearDetectionLoop();
    };
  }, [cameraReady, isSubmitting, startDetectionLoop, clearDetectionLoop]);

  const statusColor =
    faceStatus === "ready" || faceStatus === "detected"
      ? "#22C55E"
      : "#EF4444";
  const statusMessage =
    faceStatus === "ready"
      ? "Hold still — capturing automatically..."
      : faceStatus === "detected"
      ? "Face detected — hold still..."
      : "Align your face in the center of the frame.";

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
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-6 pt-6">
          <Pressable
            disabled={isSubmitting}
            onPress={() => navigation.goBack()}
          >
            <FontAwesomeIcon
              icon={faArrowLeft as IconProp}
              size={24}
              style={{ color: "#000000" }}
            />
          </Pressable>
          <Text className="text-white text-lg font-semibold">
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <View className="items-center justify-center mt-6">
          <View 
            className="overflow-hidden border-2 border-white/20"
            style={{
              width: 300,
              height: 300,
              borderRadius: 150,
            }}
          >
            <CameraView
              ref={cameraRef}
              style={{ width: 300, height: 300 }}
              facing="front"
              mirror
              onCameraReady={() => setCameraReady(true)}
            />
            <View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFillObject,
                {
                  borderColor: statusColor,
                  borderWidth: 4,
                  borderRadius: 150,
                },
              ]}
            />
          </View>
        </View>

        <View className="px-6 py-6 bg-white rounded-t-3xl">
          <Text
            className="text-center text-base font-semibold"
            style={{ color: statusColor }}
          >
            {statusMessage}
          </Text>
          <Text className="mt-2 text-center text-sm text-gray-500">
            {faceStatus === "ready" || faceStatus === "detected"
              ? "Hold still — capturing automatically..."
              : "Make sure your face is well-lit and clearly visible in the frame."}
          </Text>
          {error ? (
            <Text className="mt-3 text-center text-sm text-red-600">{error}</Text>
          ) : null}
          {isSubmitting && (
            <View className="mt-6 w-full items-center justify-center rounded-xl bg-[#A55F70] py-4">
              <ActivityIndicator color="#FFFFFF" />
              <Text className="text-white text-sm font-semibold mt-2">
                Processing...
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
