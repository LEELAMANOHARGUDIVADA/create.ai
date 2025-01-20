import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import axios from "axios";
import Header from "@/components/Header";
import * as FileSystem from "expo-file-system"
import * as MediaLibrary from 'expo-media-library';


const UNSPLASH_API_BASE_URL = "https://api.unsplash.com";
const ACCESS_KEY = "envWeFzdEP7TZFj6NUkMrra75IUhI6axEfu2yDhsr5w";

export const unsplashApi = axios.create({
  baseURL: UNSPLASH_API_BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

interface Photo {
  urls: {
    full: string;
  };
}

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [photos, setPhotos] = useState<Photo | null>();
  const [imageGenerating, setImageGenerating] = useState(false);

  const generateImage = async () => {
    if (prompt.length < 3) {
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
      setPrompt("");
      setImageGenerating(false);
    } catch (error) {
      console.error("Error searching photos:", error);
    }
  };

  const handleImageDownload = async(url:string) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Storage permission is required to save images.');
        return;
      }
      const imageUrl = url;  // Replace with your image URL
      const fileUri = FileSystem.documentDirectory + 'downloaded-image.jpg';

      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);
      console.log(uri);
      // Save the image to the gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Downloads', asset, false);

      Alert.alert('Download Success', 'Image downloaded successfully.');
    } catch (error) {
      console.error('Download Error:', error);
      Alert.alert('Error', 'Failed to download image.');
    }
  }

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <Header />
      <ScrollView
        className="w-full h-full"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full h-full flex items-start justify-start">
          {/* Header  */}
          <View className="px-5 w-full flex items-start justify-start mt-2">
            <Text className="text-xl font-rubik-semibold">Enter a prompt</Text>
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
            <ScrollView className="mt-3" horizontal>
              <View className="">
                <View className="border p-1 rounded-2xl">
                  <Image
                    source={images.realistic}
                    className="w-24 h-24 rounded-xl"
                  />
                </View>
                <Text className="text-center font-rubik-semibold">
                  Realistic
                </Text>
              </View>
            </ScrollView>
          </View>

          <View className=" w-full px-5">
            <TouchableOpacity
              className="w-full h-12 mt-3"
              onPress={generateImage}
            >
              <View className="bg-black w-full h-full rounded-2xl flex flex-row items-center justify-center gap-2">
                <Image
                  source={images.sparkles}
                  className="w-7 h-7"
                  tintColor={"#fff"}
                />
                <Text className="text-white text-center font-rubik-semibold">
                  Generate
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="px-5 w-full">
            {photos && (
              <View className="w-full h-full">
                <View className=" mt-5 rounded-3xl w-full bg-neutral-100 border border-neutral-200">
                  {imageGenerating ? (
                    <View className=" h-96 flex items-center justify-center">
                      <ActivityIndicator color={"#000"} />
                    </View>
                  ) : (
                    <Image
                      source={{ uri: photos.urls?.full }}
                      className="w-full h-96 rounded-3xl"
                    />
                  )}
                </View>
                <View className="w-full flex flex-row items-center justify-center gap-5  my-5">
                  <TouchableOpacity className="bg-black rounded-2xl w-full h-12 flex  items-center justify-center" onPress={() => handleImageDownload(photos.urls?.full)}>
                    <Text className="text-white text-center font-rubik-semibold">
                      Download
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImageGeneration;
