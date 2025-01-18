import Header from "@/components/Header";
import QuickLinks from "@/components/QuickLinks";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QuickPrompts from "@/components/QuickPrompts";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import images from "@/constants/images";
import icons from "@/constants/icons";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string>('');
  const router = useRouter();

  // Load data from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const name = await AsyncStorage.getItem("name");
        const savedToken = await AsyncStorage.getItem("token");
        if (name) {
          setUsername(name);
        }
        if (savedToken) {
          setToken(savedToken);
        } else {
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Failed to load AsyncStorage data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <SafeAreaView className="w-full h-full">
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5">
        <View className="w-full h-52 bg-[#8E5EF1]/85 mt-5 rounded-3xl p-6 flex flex-row items-center justify-between overflow-hidden">
           <View className="">
           <Text className="text-3xl text-white font-rubik-medium">Create with</Text>
           <Text className="text-3xl text-white font-rubik-medium">generative AI</Text>
           <Text className="text-white mt-2 text-sm font-rubik">Try out the latest innovations.</Text>
            <Link href={`/magic`} className="mt-5">
           <View className="bg-white w-36 h-10 rounded-full flex flex-row items-center justify-center gap-1">
            <Image source={images.sparkles} tintColor={`#8E5EF1`} className="w-6 h-6" />
            <Text className="text-center text-[#8E5EF1]/85 font-rubik-medium">Generate</Text>
           </View>
            </Link>
           </View>
           <View className="mt-28 ml-10">
            <Image source={icons.collage} className=" w-96 h-96 rotate-[30deg] " />
           </View>
        </View>
        </View>
        {/* <QuickLinks /> */}
        <View className="px-5">
        <View className="w-full bg-white p-6 mt-5 flex items-start justify-center gap-2 rounded-3xl">
          <Text className="text-xl font-rubik-semibold">Explore Our AI Tools</Text>
          <View className="flex flex-row items-center justify-center mt-5 gap-3">
          <Link href={'/textgeneration'} className="w-1/2">
          <View className="bg-white w-full h-14 p-4 rounded-2xl flex flex-row items-center justify-center gap-2 border border-neutral-200 shadow-sm">
            <Image source={images.chat} className="w-7 h-7" tintColor={'#0f766e'} />
            <Text className="text-sm font-rubik-medium">Text Generation</Text>
          </View>
          </Link>
          <Link href={'/imagegeneration'} className="w-1/2">
          <View className="bg-white w-full h-14 p-4 rounded-2xl flex flex-row items-center justify-center gap-2 border border-neutral-200 shadow-sm">
            <Image source={images.gallery} className="w-5 h-5" tintColor={'#f97316'} />
            <Text className="text-sm font-rubik-medium">Image Generation</Text>
          </View>
          </Link>
          </View>
          <View className="flex flex-row items-center justify-center mt-2 gap-3">
          <Link href={'/videogeneration'} className="w-1/2">
          <View className="bg-white w-full h-14 p-4 rounded-2xl flex flex-row items-center justify-center gap-2 border border-neutral-200 shadow-sm">
            <Image source={images.video} className="w-7 h-7" tintColor={'#8E5EF1'} />
            <Text className="text-sm font-rubik-medium">Video Generation</Text>
          </View>
          </Link>
          <View className="bg-white w-1/2 h-14 p-4 rounded-2xl flex flex-row items-center justify-center gap-2 border border-neutral-200 shadow-sm">
            <Image source={images.code} className="w-5 h-5" tintColor={'#facc15'} />
            <Text className="text-sm font-rubik-medium">Code Generation</Text>
          </View>
          </View>

        </View>
        </View>
        <View className="px-5 mb-28">
        <QuickPrompts />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
