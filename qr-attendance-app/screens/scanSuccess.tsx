import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {View, Text, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {useNavigation} from "@react-navigation/native";

export default function ScanSuccess () {
    const navigation = useNavigation();
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View className="flex items-center justify-center mt-32">
                    <Text className="text-[64px] font-extrabold text-[#900C27]">SCAN</Text>
                    <Text className="text-[64px] font-extrabold text-[#900C27]">SUCCESS</Text>

                    <FontAwesomeIcon icon={faCircleCheck}
                                     size={256}
                                     style={{color: "#63E6BE", marginTop:50}} />
                    <TouchableOpacity className='w-[310px] h-[50px] bg-[#900C27] py-4 mt-36'
                                      onPress={() => {navigation.navigate("Login" as never)}}>
                        <Text className="flex text-center font-bold text-[17px] text-white">Confirm</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}