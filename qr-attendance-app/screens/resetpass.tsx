import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Pressable, View, TextInput, Text} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import type {IconProp} from "@fortawesome/fontawesome-svg-core";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";


export default function resetpass(){
    const navigation = useNavigation();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = () => {
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            alert('New password must be at least 6 characters');
            return;
        }
        // Add your password reset logic here
        alert('Password reset successfully!');
        navigation.goBack();
    };

    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <View className=" ml-8 mt-10 ">
                    <Pressable onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon
                            icon={faArrowLeft as IconProp}
                            size={24}
                            style={{ color: "#C70039" }}
                        />
                    </Pressable>
                </View>
                <View className="flex items-center pb-6">
                    <Text className="text-[#900C27] text-[28px] py-4 font-bold">Reset Password</Text>
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
                        placeholder="Old Password"
                        placeholderTextColor="#9CA3AF"
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="password"
                        textContentType="password"
                        returnKeyType="next"
                    />
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
                        placeholder="New Password"
                        placeholderTextColor="#9CA3AF"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="password"
                        textContentType="password"
                        returnKeyType="next"
                    />
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
                        placeholder="Confirm New Password"
                        placeholderTextColor="#9CA3AF"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="password"
                        textContentType="password"
                        returnKeyType="done"
                    />
                    <Pressable 
                        onPress={handleResetPassword}
                        className="w-[310px] h-[50px] bg-[#900C27] rounded-full mt-8 flex items-center justify-center"
                    >
                        <Text className="text-white text-lg font-bold">Reset Password</Text>
                    </Pressable>


                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}