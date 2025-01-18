import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [mobileNumberfilled, setMobileNumberFilled] = useState<Boolean>(false);
  const [otpSent, setOtpSent] = useState<Boolean>(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [userToken, setUserToken] = useState<string>('');
  const inputs = useRef<(TextInput | null)[]>([]);


  const router = useRouter();

  const handleSignIn = async () => {
    if (mobileNumber.length < 10) {
      setError("Invalid Phone Number");
      console.log(error);
      return;
    }
    setError("");
    // console.log(mobileNumber, fullName);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://192.168.186.115:5000/api/user/register",
        {
          phoneNumber: mobileNumber,
          fullName: fullName
        }
      );

      if (response.status === 201) {
        setOtpSent(true);
        setIsLoading(false);
      }
    } catch (error:any) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const handleOtpChange = (text:string, index:number) => {
    if (!/^[0-9]*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input if available
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text:string, index:number) => {
    if (text === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async () => {
    const Otp = otp.join("");
    // console.log(Otp);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://192.168.186.115:5000/api/user/verifyOtp",
        {
          phoneNumber: mobileNumber,
          otp: Otp,
        }
      );
      // console.log(response.data.token);
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('name', response.data.name);
      router.push("/home");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const hanldeGoogleSign = async() => {
  };

  const checkUserSignedIn = async() => {
  const token = await AsyncStorage.getItem('token');
  if(token) {
    setUserToken(token);
    router.push('/home');
  }

  }

  useEffect(() => {
    checkUserSignedIn();
    
  },[userToken]);

  const Hr = ({ color = "#000", height = 1, marginVertical = 10 }) => {
    return (
      <View
        style={{
          backgroundColor: color,
          height: height,
          width: 150,
          marginVertical: marginVertical,
        }}
      />
    );
  };

  return (
    <SafeAreaView className="bg-white h-full w-full flex items-start justify-start">
      <View className="flex flex-row items-center px-10 mt-20">
        <Text className="text-3xl font-rubik-bold text-black">Create.ai</Text>
        <Image
          source={images.sparkles}
          alt="sparkle"
          resizeMode="contain"
          className="mb-2 w-10 h-10"
        />
      </View>
      {otpSent ? (
        <View className="w-full mt-5">
          <Text className="text-black text-2xl font-rubik px-10">
            Verify your Account
          </Text>
          <View className="mt-5 px-9 w-full flex flex-row gap-2">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                maxLength={1}
                keyboardType="numeric"
                className="outline-none bg-neutral-50/10 h-16 w-[48px] rounded-xl text-black px-2 text-center border text-lg font-medium"
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    handleBackspace(digit, index);
                  }
                }}
              />
            ))}
          </View>
          <View className="my-5 px-10">
            {isLoading ? (
              <View className="bg-neutral-200 h-12 w-full rounded-xl flex items-center justify-center ">
              <ActivityIndicator size="small" color="#000" />
            </View>
            ) : (
              <TouchableOpacity
              onPress={handleOtpSubmit}
              className="bg-black h-12 rounded-xl flex items-center justify-center"
            >
              <Text className="font-rubik-medium text-white">Submit</Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View>
          {mobileNumberfilled && (
            <View className="w-full mt-5">
              <Text className="text-black text-2xl font-rubik px-10">
                Tell us your name
              </Text>
              <View className="mt-5 px-9 w-full flex flex-row gap-2">
                <TextInput
                  value={fullName}
                  onChangeText={(text) => setFullName(text)}
                  maxLength={20}
                  placeholder="Your Name"
                  className="outline-none bg-neutral-50/10 h-12 rounded-xl 
              text-black px-5 border w-full"
                />
              </View>
              <View className="my-5 px-10">
              {isLoading ? (
              <View className="bg-neutral-200 h-12 w-full rounded-xl flex items-center justify-center ">
              <ActivityIndicator size="small" color="#000" />
            </View>
            ) : (
              <TouchableOpacity
              onPress={handleSignIn}
              className="bg-black h-12 rounded-xl flex items-center justify-center"
            >
              <Text className="font-rubik-medium text-white">Continue</Text>
            </TouchableOpacity>
            )}
              </View>
            </View>
          )}
        </View>
      )}

      {!mobileNumberfilled && <View>
        <View className="px-10 w-full mt-5">
          <Text className="text-black text-2xl font-rubik">
            Log in to Continue
          </Text>
          <View>
            <View className="w-full flex flex-row items-center justify-start gap-4 mt-5">
              <View className="bg-neutral-50/10 h-12 px-3 flex flex-row items-center justify-center rounded-xl gap-2 border">
                <Image
                  source={images.india}
                  style={{ width: 20, height: 20 }}
                />
                <Text className="text-black font-rubik-semibold">+91</Text>
              </View>
              <TextInput
                value={mobileNumber}
                onChangeText={(text) => setMobileNumber(text)}
                maxLength={10}
                keyboardType="numeric"
                placeholder="Phone Number"
                className="outline-none bg-neutral-50/10 h-12 w-[72%] rounded-xl 
              text-black px-5 border"
              />
            </View>
            {error.length > 0 && (
              <Text className="mt-2 text-red-500">{error}</Text>
            )}
            <View className="my-5">
              {isLoading ? (
                <View className="bg-neutral-200 h-12 w-full rounded-xl flex items-center justify-center ">
                  <ActivityIndicator size="small" color="#000" />
                </View>
              ) : (
                <View>
                  {mobileNumber.length==10 ? <TouchableOpacity
                  onPress={() => setMobileNumberFilled(true)}
                  className="bg-black h-12 w-full rounded-xl flex items-center justify-center "
                >
                  <Text className="font-rubik-medium text-white">Continue</Text>
                </TouchableOpacity>: <View
                  className="bg-neutral-300 h-12 w-full rounded-xl flex items-center justify-center "
                >
                  <Text className="font-rubik-medium text-white">Continue</Text>
                </View>}
                </View>
              )}
            </View>
          </View>
        </View>

        <View className="flex flex-col gap-5 mb-10 px-10 w-full">
          <View className="flex flex-row items-center justify-center gap-3">
            <Hr />
            <Text className="text-black">or</Text>
            <Hr />
          </View>
          <TouchableOpacity
            className=" bg-neutral-900 h-12 rounded-xl flex flex-row items-center justify-center gap-3"
            onPress={hanldeGoogleSign}
          >
            <Image
              source={images.google}
              alt="google"
              style={{ width: 40, height: 40 }}
            />
            <Text className=" flex items-center justify-center font-rubik-medium text-white">
              Continue with Google
            </Text>
          </TouchableOpacity>
          <View className=" bg-white h-12 rounded-xl flex flex-row items-center justify-center gap-3 border">
            <Image
              source={images.github}
              alt="google"
              style={{ width: 30, height: 30 }}
            />
            <Text className=" flex items-center justify-center font-rubik-medium text-black">
              Continue with Github
            </Text>
          </View>
        </View>
      </View>}

      <View className="px-10 absolute bottom-5">
        <Text className="text-neutral-700 text-center text-xs">
          Create.ai uses cookies for analytics, personalized content and ads. By
          using Create.ai's services, you agree to this use of cookies.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
