import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function signup() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white justify-center">
        <View className="items-center">
          <Text className="text-center">hello world</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
