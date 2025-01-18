import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import axios from "axios";
import Header from "@/components/Header";

const UNSPLASH_API_BASE_URL = "https://api.unsplash.com";
const ACCESS_KEY = "envWeFzdEP7TZFj6NUkMrra75IUhI6axEfu2yDhsr5w";

export const unsplashApi = axios.create({
  baseURL: UNSPLASH_API_BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

const ImageGeneration = () => {
  const [firstTimeLogin, setFirstTimeLogin] = useState<Boolean>(true);
  const [prompt, setPrompt] = useState<string>("");
  const [photos, setPhotos] = useState();
  const [imageGenerating, setImageGenerating] = useState(false);

  const searchPhotos = async () => {
    if(prompt.length <3) {
      return;
    }
    setImageGenerating(true);

    try {
      const response = await unsplashApi.get("/search/photos", {
        params: {
          query: prompt,
          per_page: 1,
        },
      });
      setPhotos(response.data.results[0]);
      // console.log(photos);
      setPrompt('');
      setImageGenerating(false);
    } catch (error) {
      console.error("Error searching photos:", error);
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-white">
      {!firstTimeLogin ? (
        <View className="w-full h-full flex items-start justify-start">
          {/* Header  */}
          <Header />
          <ScrollView className="w-full">
            <View className="px-5 w-full flex items-start justify-start mt-5">
              <Text className="text-xl font-rubik-semibold">
                Enter a prompt
              </Text>
              <View className="mt-3 h-60 w-full bg-neutral-100 rounded-2xl p-5 border-2 border-neutral-200">
                <View className="w-full h-full">
                  <TextInput
                    className="font-medium w-full"
                    placeholder="Describe your dream image..."
                    multiline
                    value={prompt}
                    onChangeText={(text) => setPrompt(text)}
                  />
                </View>
              </View>
            </View>
            <View className=" w-full px-5">
                <TouchableOpacity className="w-full h-12 mt-5" onPress={searchPhotos}>
                  <View className="bg-black w-full h-full rounded-2xl flex items-center justify-center">
                    <Text
                      className="text-white text-center font-rubik-semibold"
                    >
                      Generate
                    </Text>
                  </View>
                </TouchableOpacity>
              {photos && (
                <View>
                  <View className=" mt-5 rounded-2xl w-full bg-neutral-100 border border-neutral-200">
                    {imageGenerating ? <View className="h-96 flex items-center justify-center">
                      <ActivityIndicator color={'#000'} />
                    </View> : <Image
                      source={{ uri: photos.urls?.full }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 20,
                      }}
                      resizeMode="cover"
                    />}
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View className="w-full h-full flex items-center justify-between py-4">
          <View className="w-full flex flex-row items-center justify-start px-7 mt-5 gap-1">
            <Text className="text-2xl font-rubik-bold text-black">
              Create.ai
            </Text>
            <Image
              source={images.sparkles}
              alt="sparkle"
              resizeMode="contain"
              className="mb-2 w-7 h-10"
            />
          </View>
          <View className="w-full px-7 mt-5 flex items-center justify-center">
            <View className="w-full flex flex-row gap-3">
              <Image
                source={images.astronaut}
                className="w-60 h-52 rounded-[50px] shadow object-center"
              />
              <Image
                source={images.tiger}
                className="w-36 h-52 rounded-[40px] shadow"
              />
            </View>
            <View className="w-full flex flex-row gap-3 mt-3">
              <Image
                source={images.humanrobot}
                className="w-36 h-52 rounded-[40px] shadow"
              />
              <Image
                source={images.girlrobot}
                className="w-60 h-52 rounded-[50px] shadow"
              />
            </View>

            <View className="w-full mt-10 flex items-center justify-center">
              <Text className="text-3xl text-black/90 font-rubik-bold text-center">
                Easily create and spread
              </Text>
              <Text className="text-3xl text-black/90 font-rubik-bold text-center">
                your artistic vision
              </Text>
            </View>
          </View>

          <View className="mb-5 px-5">
            <TouchableOpacity
              className="bg-black w-full  p-4 rounded-2xl drop-shadow"
              onPress={() => setFirstTimeLogin(false)}
            >
              <Text className="text-white text-center text-md font-semibold">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ImageGeneration;
