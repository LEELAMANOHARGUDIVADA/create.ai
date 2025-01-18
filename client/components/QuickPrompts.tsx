import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import { Link } from "expo-router";

const QuickPrompts = () => {
  return (
    <View className="w-full mt-5 bg-white p-6 rounded-3xl">
      <Text className="text-xl font-rubik-semibold text-black">Quick Prompts</Text>

      <View className="mt-5 flex gap-3">
        <Link href={`/textgeneration`} className="w-full">
          <View className="w-full flex flex-row items-center justify-between border border-neutral-200 rounded-full p-1 bg-white">
            <View className=" p-3 rounded-full">
              <Image source={images.chat} className="w-7 h-7" tintColor={'#0f766e'} />
            </View>
            <Text className="text-sm">What is the best business to start in...</Text>
            <Image source={images.arrowup} className="w-5 h-5" />
          </View>
        </Link>
        
        <Link href={`/imagegeneration`} className="w-full">
          <View className="w-full flex flex-row items-center justify-between border border-neutral-200 rounded-full p-1 bg-white">
            <View className="p-3 rounded-full">
              <Image source={images.gallery} className="w-6 h-6" tintColor={'#f97316'} />
            </View>
 
            <Text className="text-sm">I need some wedding card inspiration...</Text>
            <Image source={images.arrowup} className="w-5 h-5" />
          </View>
        </Link>

        <Link href={`/videogeneration`} className="w-full">
          <View className="w-full flex flex-row items-center justify-between border border-neutral-200 rounded-full p-1  bg-white">
            <View className="p-3 rounded-full">
              <Image source={images.video} className="w-7 h-7" tintColor={'#8E5EF1'} />
            </View>
            <Text className="text-sm">Create me a short presentation on Li...</Text>
            <Image source={images.arrowup} className="w-5 h-5" />
          </View>
        </Link>
      </View>
    </View>
  );
};

export default QuickPrompts;
