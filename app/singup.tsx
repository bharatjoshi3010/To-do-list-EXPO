import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function singup() {
  console.log("the last redirect",useAuth());
  const {session, signup} = useAuth()

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async () => {
    console.log("youfind me")
    // signin({email, password})
    signup(email, password, name)
  };

  if (session) return (<Redirect href="/"/>)
  return (
    <SafeAreaView>
    <View>
      <View>
        <Text> Sing Up</Text>
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

        <Text>Name</Text>
        <TextInput 
          placeholder='enter your name'
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TouchableOpacity onPress={handleSubmit}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View></SafeAreaView>
  )
}