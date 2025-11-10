import { GestureHandlerRootView } from "react-native-gesture-handler";
import Login from "./screens/login";
import Signup from "./screens/signup";
import Homemenu from "./screens/HomeMenu";
import Event from "./screens/Event";
import Qr from "./screens/QR";
import Leaderboard from "./screens/Leaderboard";
import Profile from "./screens/Profile";
import FaceScan from "./screens/facescan";
import ScanSuccess from "./screens/scanSuccess";
import ResetPass from "./screens/resetpass";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomBar from "./components/bottomBar";
import { AuthProvider } from "./context/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomBar {...props} />}
    >
      <Tab.Screen name="Home" component={Homemenu as any} />
      <Tab.Screen name="Events" component={Event as any} />
      <Tab.Screen name="Qr" component={Qr as any} />
      <Tab.Screen name="Leaderboard" component={Leaderboard as any} />
      <Tab.Screen name="Profile" component={Profile as any} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login as any} />
            <Stack.Screen name="Signup" component={Signup as any} />
            <Stack.Screen name="Facescan" component={FaceScan as any} />
            <Stack.Screen name="Scansuccess" component={ScanSuccess as any} />
            <Stack.Screen name="Resetpass" component={ResetPass as any} />
            <Stack.Screen name="Main" component={Tabs as any} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
