import {
  View,
  Text,
  TextInput,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import icons from "@/constants/icons";
import { TouchableOpacity } from "react-native";
import images from "@/constants/images";
import { ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import axios from "axios";

interface Message {
  chatId: string;
  sender: string;
  text: string;
  loading: boolean;
}

const TextGeneration = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [sendButtonDisabled, setSendButtonDisabled] = useState<Boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-300)).current;

  const router = useRouter();

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      Animated.timing(sidebarAnim, {
        toValue: -350, // Hide the sidebar
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsSidebarOpen(false));
    } else {
      Animated.timing(sidebarAnim, {
        toValue: 0, // Show the sidebar
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsSidebarOpen(true));
    }
  };

  const handleSendMessage = async () => {
    try {
      if (prompt.length < 2) return;
      setSendButtonDisabled(true);

      const userMessage: Message = {
        chatId: "ai-text-generation",
        sender: "user",
        text: prompt,
        loading: false,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setPrompt("");

      const aiMessagePlaceholder: Message = {
        chatId: "ai-text-generation",
        sender: "ai",
        text: "",
        loading: true,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessagePlaceholder]);

      await axios.post(
        "http://192.168.34.116:5000/api/chat/addMessage",
        userMessage
      );

      const response = await axios.post(
        "http://192.168.34.116:5000/api/ai/generateText",
        { prompt: prompt }
      );

      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, text: response.data.response, loading: false }
            : msg
        )
      );

      await axios.post("http://192.168.34.116:5000/api/chat/addMessage", {
        chatId: "ai-text-generation",
        sender: "ai",
        text: response.data.response,
      });

      setSendButtonDisabled(false);
    } catch (error) {
      console.error(error);
      setSendButtonDisabled(false);
    }
  };

  const handleNewChat = async () => {
    toggleSidebar();
  };

  return (
    <SafeAreaView className="w-full h-full bg-neutral-100 px-5">
      {/* Sidebar */}
      <Animated.View
        style={{
          position: "absolute",
          left: sidebarAnim,
          top: 0,
          bottom: 0,
          width: 300,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          zIndex: 10,
        }}
      >
        <View className="p-5">
          <TouchableOpacity onPress={toggleSidebar}>
            <Image source={images.menu} className="w-8 h-8" />
          </TouchableOpacity>

          <View className="mt-12">
            <TouchableOpacity
              onPress={handleNewChat}
              className="mb-5 p-4 bg-black rounded-2xl flex items-center justify-center"
            >
              <View className="w-full flex flex-row items-center justify-center gap-2 ">
                <Image
                  source={images.plus}
                  className="w-3 h-3"
                  tintColor={"#fff"}
                />
                <Text className=" text-white text-sm">New Chat</Text>
              </View>
            </TouchableOpacity>
            <Text
              onPress={() => router.push(`/chat/ai-text-generation`)}
              className="bg-neutral-100 p-3 rounded-xl shadow-sm mb-5"
            >
              What is React?
            </Text>
          </View>
        </View>
      </Animated.View>

      <View className="mt-5">
        <TouchableOpacity className="" onPress={toggleSidebar}>
          <Image source={images.menu} className="w-8 h-8" />
        </TouchableOpacity>
      </View>

      {messages.length > 0 ? (
          <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
        <View className="w-full h-[85%] flex items-center justify-start mb-10">
            {messages.map((message, index) => (
              <View
                key={index}
                className={`mt-5 w-full flex ${
                  message.sender === "user" ? "items-end" : "items-start"
                } justify-center`}
              >
                <View>
                  {message.loading ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <Text
                      className={`bg-white py-3 px-5 rounded-2xl border-neutral-200`}
                    >
                      {message.text}
                    </Text>
                  )}
                </View>
              </View>
            ))}
        </View>
        </ScrollView>
      ) : (
        <View className="w-full h-[85%] flex items-center justify-center">
          <Text className="text-3xl font-rubik-semibold">
            What can I help with?
          </Text>
          <View className="flex flex-row items-center justify-center gap-1 mt-5">
            <View className="bg-white flex flex-row items-center justify-center gap-2 py-3 px-5 rounded-full border border-neutral-200 shadow-sm">
              <Image
                source={images.image_icon}
                tintColor="#16a34a"
                className="w-4 h-4 text-green-600"
              />
              <Text className="text-xs">Create image</Text>
            </View>
            <View className="bg-white flex flex-row items-center justify-center gap-2 py-3 px-5 rounded-full border border-neutral-200 shadow-sm">
              <Image
                source={images.code}
                tintColor="#c084fc"
                className="w-4 h-4 text-purple-400"
              />
              <Text className="text-xs">Code</Text>
            </View>
            <View className="bg-white flex flex-row items-center justify-center gap-2 py-3 px-5 rounded-full border border-neutral-200 shadow-sm">
              <Image
                source={images.analyze}
                tintColor="#38bdf8"
                className="w-4 h-4"
              />
              <Text className="text-xs">Analyze data</Text>
            </View>
          </View>
          <View className="flex flex-row items-center justify-center gap-1 mt-5">
            <View className="bg-white flex flex-row items-center justify-center gap-2 py-3 px-5 rounded-full border border-neutral-200 shadow-sm">
              <Image
                source={images.document}
                tintColor="#f97316"
                className="w-4 h-4 text-orange-500"
              />
              <Text className="text-xs">Summarize text</Text>
            </View>
            <View className="bg-white flex flex-row items-center justify-center gap-2 py-3 px-5 rounded-full border border-neutral-200 shadow-sm">
              <Text className="text-xs">More</Text>
            </View>
          </View>
        </View>
      )}

      <View className="w-full fixed bottom-5 flex items-center justify-center">
        <View className="w-full  bg-white border border-neutral-200 p-2 rounded-full flex flex-row items-center justify-center shadow-sm">
          <TextInput
            value={prompt}
            className="w-full h-12 bg-transparent px-10"
            placeholder="Enter a prompt..."
            onChangeText={(text) => setPrompt(text)}
            multiline
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <View
              className={` h-12 w-12 relative right-6 ${
                sendButtonDisabled ? "bg-neutral-100" : "bg-black"
              }  rounded-full flex items-center justify-center`}
            >
              <Image
                source={icons.send}
                className="w-6 h-6"
                tintColor={`#fff`}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text className="text-neutral-400 text-xs mt-2">
          AI can make mistakes. Check important info
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TextGeneration;
