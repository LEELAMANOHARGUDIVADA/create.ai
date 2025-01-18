import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import images from '@/constants/images'
import { Link } from 'expo-router'
import Header from '@/components/Header'
import { LinearGradient } from 'expo-linear-gradient'

const Magic = () => {
  return (
    <SafeAreaView className='w-full h-full bg-white'>
      <Header />
      <ScrollView className='w-full px-5'>
        <View className='w-full mt-5'>
          <View className="w-full flex items-center justify-center gap-5">
            <LinearGradient colors={['#ffedd5','#0f766e']} style={{ borderRadius: 24 }} className='w-full h-52 rounded-3xl p-6 flex items-start justify-between bg-sky-200'>
              <View>
              <View className='w-full flex flex-row items-center justify-between'>
              <View className='p-3 rounded-full bg-teal-50'>
              <Image source={images.chat} className='w-7 h-7' />
              </View>
              <Link href={`/textgeneration`}>
              <View>
              <Image source={images.arrowup} className='w-7 h-7' tintColor={`#fff`} />
              </View>
              </Link>
              </View>
              </View>
              <View className='flex gap-1'>
              <Text className=' text-2xl font-rubik-semibold text-white'>Generate Text</Text>
              <Text className='text-sm text-white'>Generate any time of text content with the power of AI</Text>
              </View>
            </LinearGradient>

            <LinearGradient colors={['#ffedd5','#f97316']} style={{ borderRadius: 24 }} className='w-full h-52 rounded-3xl p-6 flex items-start justify-between'>
              <View>
              <View className='w-full flex flex-row items-center justify-between'>
              <View className='p-3 rounded-full bg-orange-100'>
              <Image source={images.gallery} className='w-7 h-7' />
              </View>
              <Link href={`/imagegeneration`}>
              <View>
              <Image source={images.arrowup} className='w-7 h-7' tintColor={`#fff`} />
              </View>
              </Link>
              </View>
              </View>
              <View className='flex gap-1'>
              <Text className=' text-2xl font-rubik-semibold text-white'>Generate Image</Text>
              <Text className='text-sm text-white'>Generate any time of image content with the power of AI</Text>
              </View>
            </LinearGradient>

            <LinearGradient colors={['#ffedd5','#f43f5e']} style={{ borderRadius: 24 }} className='w-full h-52 rounded-3xl p-6 flex items-start justify-between'>
              <View>
              <View className='w-full flex flex-row items-center justify-between'>
              <View className='p-3 rounded-full bg-red-100'>
              <Image source={images.video} className='w-7 h-7' />
              </View>
              <Link href={`/videogeneration`}>
              <View>
              <Image source={images.arrowup} className='w-7 h-7' tintColor={`#fff`} />
              </View>
              </Link>
              </View>
              </View>
              <View className='flex gap-1'>
              <Text className=' text-2xl font-rubik-semibold text-white'>Generate Video</Text>
              <Text className='text-sm text-white'>Generate any time of video content with the power of AI</Text>
              </View>
            </LinearGradient>
            
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Magic