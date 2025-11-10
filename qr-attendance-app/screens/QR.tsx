import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import { getJson } from "../lib/api";
import { useAuth } from "../context/AuthContext";

type QrResponse = {
  qr: string;
  token: string;
};

export default function QR() {
  const { auth } = useAuth();
  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchQr = React.useCallback(async () => {
    if (!auth.id) {
      setError("Please log in to view your QR code.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await getJson<QrResponse>(
        `/api/students/me/qr?studentId=${auth.id}`
      );
      setQrDataUrl(data.qr);
      setToken(data.token);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load QR code.");
    } finally {
      setLoading(false);
    }
  }, [auth.id]);

  React.useEffect(() => {
    fetchQr();
  }, [fetchQr]);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <View className="mt-14 px-5">
          <Text className="text-[24px] font-extrabold">My Attendance QR</Text>
          <Text className="text-gray-500 mt-1">
            Present this code when an admin scans your attendance.
          </Text>
        </View>

        <View className="flex-1 justify-center items-center px-4">
          {loading && <ActivityIndicator size="large" color="#900C27" />}

          {!loading && error && (
            <View className="items-center">
              <Text className="text-red-600 font-semibold text-center">
                {error}
              </Text>
              <TouchableOpacity
                className="mt-4 bg-[#900C27] px-6 py-2 rounded-lg"
                onPress={fetchQr}
              >
                <Text className="text-white font-bold">Try again</Text>
              </TouchableOpacity>
            </View>
          )}

          {!loading && !error && qrDataUrl && (
            <View className="items-center">
              <View
                className="bg-white p-6 rounded-2xl"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 6,
                }}
              >
                <QRCode
                  value={token ?? ""}
                  size={240}
                  backgroundColor="white"
                  color="#000000"
                />
              </View>
              <TouchableOpacity
                className="mt-6 bg-[#900C27] px-6 py-2 rounded-lg"
                onPress={fetchQr}
              >
                <Text className="text-white font-bold">Refresh QR</Text>
              </TouchableOpacity>
              <Text className="mt-3 text-gray-500 text-center">
                This code refreshes periodically for security.
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
