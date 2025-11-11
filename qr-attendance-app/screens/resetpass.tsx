import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Pressable, View, TextInput, Text, Alert} from "react-native";
import {FontAwesomeIcon}from "@fortawesome/react-native-fontawesome";
import {faArrowLeft}from "@fortawesome/free-solid-svg-icons";
import type {IconProp}from "@fortawesome/fontawesome-svg-core";
import {useNavigation}from "@react-navigation/native";
import React, {useState}from "react";
import {useAuth}from "../context/AuthContext";
import {postJsonAuth}from "../lib/api";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function ResetPass(){
    const navigation = useNavigation();
    const {auth} = useAuth();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (loading) return;
        if (!oldPassword.trim()) {
            Alert.alert('Missing info', 'Please enter your current password.');
            return;
        }
        if (!newPassword.trim()) {
            Alert.alert('Missing info', 'Please enter a new password.');
            return;
        }
        if (!PASSWORD_REGEX.test(newPassword)) {
            Alert.alert('Weak password', 'Password must have at least 8 characters, 1 uppercase letter, and 1 number.');
            return;
        }
        if (!confirmPassword.trim()) {
            Alert.alert('Missing info', 'Please confirm your new password.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Mismatch', 'New passwords do not match.');
            return;
        }
        if (!auth.token) {
            Alert.alert('Not logged in', 'Please log in again.');
            return;
        }
        try {
            setLoading(true);
            await postJsonAuth<{ ok: true }>(
                "/api/auth/reset-password",
                auth.token,
                { oldPassword, newPassword }
            );
            Alert.alert('Success', 'Password reset successfully.', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (e: any) {
            Alert.alert('Reset failed', e?.message ?? 'Please try again.');
        } finally {
            setLoading(false);
        }
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
                        className="bg-white w-[300px] h_[50px] mt-4 px-4 py-3 "
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
                        <Text className="text-white text-lg font-bold">
                            {loading ? "Resetting..." : "Reset Password"}
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
);
}

