import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function singin() {
  console.log("the last redirect",useAuth());
  const {session}  = useAuth()
  if (session) return (<Redirect href="/"/>)
  return (
    <SafeAreaView>
        <Text>Sing in</Text>
    </SafeAreaView>
  )
}