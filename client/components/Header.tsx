import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '@/constants/images'
import { Link, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Header = () => {
  const router = useRouter();
    const [token, setToken] = useState('');
    useEffect(() => {
      const loadData = async () => {
        try {
          const savedToken = await AsyncStorage.getItem("token");
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
    <View className='w-full h-14 mt-3  flex flex-row items-center justify-between px-5'>
      <View className='flex flex-row items-center justify-center'>
      <Text className="text-2xl font-rubik-bold text-black">Create.ai</Text>
      <Image source={images.sparkles} alt='sparkle' resizeMode='contain' className='mb-2 w-7 h-10' />
      </View>
      {!token ? <Link href={`/sign-in`}>
      <Image source={images.avatar} style={{width: 40, height: 40}} />
      </Link> : <Link href={'/profile'}>
      <Image source={images.avatar} style={{width: 40, height: 40}} />
      </Link>}
    </View>
  )
}

export default Header

