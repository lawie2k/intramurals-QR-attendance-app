import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faListUl, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Login from "./screens/login";
import Signup from "./screens/signup";

export default function App() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {showSignup ? (
          <Signup />
        ) : (
          <Login onSignup={() => setShowSignup(true)} />
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
