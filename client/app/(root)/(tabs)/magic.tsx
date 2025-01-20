import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'

const Magic = () => {
  return (
    <SafeAreaView className='w-full h-full bg-white'>
      <Header />
      <ScrollView className='w-full px-5'>
        <Text>Magic</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Magic