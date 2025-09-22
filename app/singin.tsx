import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function singin() {
  console.log("the last redirect",useAuth());
  const {session, signin} = useAuth()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async () => {
    console.log("youfind me")
    console.log(singin)
    signin({email, password})
  };

  if (session) return (<Redirect href="/"/>)
  return (
    <SafeAreaView>
    <View>
      <View>
        <Text> Singin</Text>
        <Text>Email</Text>
        <TextInput 
          placeholder='Enter your email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        
        <Text>password</Text>
        <TextInput 
          placeholder='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity onPress={handleSubmit}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View></SafeAreaView>
  )
}