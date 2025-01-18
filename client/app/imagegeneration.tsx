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
    </SafeAreaView>
  );
};

export default ImageGeneration;
