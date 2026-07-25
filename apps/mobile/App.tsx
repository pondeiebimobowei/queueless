/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Button, StatusBar, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Calendar, Calendar1, MessageCircleMore } from 'lucide-react-native';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

import { BusinessOnboarding } from './components/onboarding/BusinessOnboarding';

function AppContent() {
  return <SafeAreaView className='flex-1 justify-center items-center p-6'>
      
      <View className='text-center w-full'>
        <Text className='text-5xl font-bold text-center'>QueueLess</Text>
        <Text className='text-sm text-center'>Smarter queues, Happier customers</Text>
        <Text className='text-sm text-center'>More time for what matters</Text>
        <View className='my-8'>
          <Text className='text-2xl font-bold'>Welcome Back</Text>
          <Text className='text-sm'>Sign in to your account to continue</Text>
          <View className='my-6'>
            <View className='mb-3'>
              <Text className='mb-2'>Email address</Text>
              <TextInput className="border border-gray-300 p-4 rounded-md" placeholder='Email address'></TextInput>
            </View>
            <View className='mb-3'>
              <Text className='mb-2'>Password</Text>
              <TextInput className="border border-gray-300 p-4 rounded-md" placeholder='Password'></TextInput>
            </View>
            <View className='flex items-end'>
              <Text className='text-blue-600 text-end'>Forgot your password?</Text>
            </View>
            <View className='my-6 bg-blue-600 rounded-md py-2'>
              <Button title='Sign in' onPress={() => console.log('Sign in')} color="white" />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
