import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const Profile = () => {
  const router = useRouter();
 const handleLogout = async() => {
  await AsyncStorage.clear();
  router.push('/sign-in');
 }
  return (
    <View className='w-full h-full flex items-center justify-center' >
      <View className='w-60 h-16 flex flex-row items-center justify-center border border-red-500 rounded-2xl p-2 bg-white shadow-sm'>
      <Text className='text-red-500 text-lg'>Sign out</Text>

      </View>
    </View>
  )
}

export default Profile