import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
      const [userToken, setUserToken] = useState<String>('');
    
  const router = useRouter();

  const checkUserSignedIn = async() => {
    const token = await AsyncStorage.getItem('token');
    if(token) {
      setUserToken(token);
      router.push('/home');
    } else {
      router.push('/sign-in');
    }
  
    }
  
    useEffect(() => {
     setTimeout(() => {
      checkUserSignedIn();
     }, 1500);
      
    },[userToken]);
  
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <View className="w-full h-full flex items-center justify-center">
      <View className="w-full h-full flex flex-row items-center justify-center mb-10 gap-1">
        <Text className="text-4xl font-rubik-bold text-black">Create.ai</Text>
        <Image
          source={images.sparkles}
          alt="sparkle"
          resizeMode="contain"
          className="mb-2 w-10 h-10"
        />
      </View>
      </View>
    </SafeAreaView>
  );
}
