import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import images from "@/constants/images";

const QuickLinks = () => {
  return (
    <View className="my-10 px-5 h-60 flex flex-row items-center gap-3 justify-center">
      <View className="bg-green-100 w-1/2 h-64 rounded-3xl shadow-md flex items-start justify-between px-6 py-4">
      <Link href='/textgeneration' className="w-full h-full">
      <View className="h-full flex flex-col items-start justify-between">
        <View className=" w-full flex flex-row items-center justify-between">
          <View className="bg-green-200 p-3 rounded-full">
          <Image source={images.chat} className="w-7 h-7" />
          </View>
          <Image source={images.arrowup} className="w-7 h-7" />
        </View>
        <View>
          <Text className="text-3xl font-rubik-bold">Chat</Text>
          <Text className="text-3xl font-rubik-bold">with AI</Text>
        </View>
      </View>
      </Link>
      </View>
      <View className="w-1/2 h-full flex flex-col gap-2">
        <View className="bg-pink-200/90 w-full h-1/2 rounded-3xl shadow-md flex items-start justify-between px-5 py-3">
      <Link href='/imagegeneration'>
          <View className="h-full flex items-start justify-between">
          <View className=" w-full flex flex-row items-center justify-between">
            <View className="bg-pink-300 p-3 rounded-full">
            <Image source={images.gallery} className="w-7 h-7" />
            </View>
            
            <Image source={images.arrowup} className="w-7 h-7" />
          </View>
          <Text className="text-lg font-rubik-semibold mt-3">Create AI Image</Text>
          </View>
      </Link>
        </View>
        <View className="bg-rose-100 w-full h-1/2 rounded-3xl shadow-md flex items-start justify-between px-5 py-3 ">
      <Link href='/videogeneration'>
          <View className="h-full flex items-start justify-between">
          <View className=" w-full flex flex-row items-center justify-between">
            <View className="bg-rose-200 p-3 rounded-full">
              <Image source={images.video} className="w-7 h-7" />
            </View>
            
            <Image source={images.arrowup} className="w-7 h-7" />
          </View>
          <Text className="text-lg font-rubik-semibold mt-3">Create AI Video</Text>
          </View>
      </Link>
        </View>
      </View>
    </View>
  );
};

export default QuickLinks;
