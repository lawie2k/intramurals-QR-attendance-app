import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { getJson } from "../lib/api";
import dayjs from "dayjs";

type AttendanceRecord = {
  id: number;
  eventName: string;
  timestamp: string;
  faceVerified: boolean;
  faceScore: number | null;
  verifyMethod: string | null;
};

export default function AttendanceHistory() {
  const navigation = useNavigation();
  const { auth } = useAuth();
  const [attendances, setAttendances] = React.useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchAttendance = async () => {
      if (!auth.id) {
        setError("Please log in to view attendance history.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getJson<{ attendances: AttendanceRecord[] }>(
          `/api/students/me/attendance?studentId=${auth.id}`
        );
        setAttendances(data.attendances || []);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load attendance history.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [auth.id]);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-6 pt-6">
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft as IconProp}
              size={24}
              style={{ color: "#C70039" }}
            />
          </Pressable>
          <Text className="text-[24px] color-[#900C27] font-extrabold">Attendance History</Text>
          <View style={{ width: 24 }} />
        </View>

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#900C27" />
            <Text className="mt-4 text-gray-500">Loading attendance history...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-center text-red-600 font-semibold">{error}</Text>
          </View>
        ) : attendances.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-center text-gray-500 text-lg">
              No attendance records found.
            </Text>
          </View>
        ) : (
          <ScrollView className="flex-1 px-4 mt-4">
            {attendances.map((attendance) => (
              <View
                key={attendance.id}
                className="bg-white rounded-xl px-4 py-4 mb-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-[18px] font-bold text-[#900C27]">
                      {attendance.eventName}
                    </Text>
                    <Text className="text-[14px] text-gray-600 mt-1">
                      {dayjs(attendance.timestamp).format("MMM DD, YYYY • h:mm A")}
                    </Text>
                  </View>
                  {attendance.faceVerified ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      size={24}
                      style={{ color: "#22C55E" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      size={24}
                      style={{ color: "#EF4444" }}
                    />
                  )}
                </View>
                {attendance.faceVerified && attendance.faceScore && (
                  <View className="mt-2 flex-row items-center">
                    <Text className="text-[12px] text-gray-500">
                      Face verified ({Math.round(attendance.faceScore * 100)}% match)
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}