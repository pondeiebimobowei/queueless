import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Icon } from '../ui/Icon';
import { OnboardingData } from './types';
import { Step1Category } from './Step1Category';
import { Step2Details } from './Step2Details';
import { Step3Services } from './Step3Services';
import { Step4Staff } from './Step4Staff';
import { SafeAreaView } from 'react-native-safe-area-context';

const INITIAL_DATA: OnboardingData = {
  category: null,
  businessName: '',
  tagline: '',
  branchName: '',
  address: '',
  hours: '',
  currency: 'NGN - Nigerian Naira',
  services: [
    { id: '1', name: 'Haircut', duration: '30 mins', iconName: 'scissors' },
    { id: '2', name: 'Hair Coloring', duration: '45 mins', iconName: 'scissors' },
    { id: '3', name: 'Nail Art', duration: '60 mins', iconName: 'pen-tool' },
    { id: '4', name: 'Makeup', duration: '45 mins', iconName: 'user' },
  ],
  staff: [
    { id: '1', name: 'John Doe', services: 'Haircut, Hair Coloring', avatarUrl: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Mary Jane', services: 'Nail Art, Pedicure, Manicure', avatarUrl: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Sarah Cole', services: 'Makeup, Eyelashes', avatarUrl: 'https://i.pravatar.cc/150?u=3' },
  ],
};

const TOTAL_STEPS = 6;

export function BusinessOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Onboarding Complete:', data);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Category data={data} updateData={updateData} onNext={handleNext} onSaveLater={() => {}} />;
      case 2:
        return <Step2Details data={data} updateData={updateData} onNext={handleNext} onSaveLater={() => {}} />;
      case 3:
        return <Step3Services data={data} updateData={updateData} onNext={handleNext} />;
      case 4:
        return <Step4Staff data={data} updateData={updateData} onNext={handleNext} />;
      default:
        return (
          <View className="flex-1 justify-center items-center">
            <Text>Step {currentStep} coming soon...</Text>
            <TouchableOpacity onPress={handleBack} className="mt-4 p-4 bg-gray-200 rounded-lg">
              <Text>Go Back</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6 pt-4 pb-2"
      >
        {/* Header */}
        <View className="mb-6">
          <TouchableOpacity 
            onPress={handleBack} 
            className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center mb-6 bg-white"
            activeOpacity={0.7}
          >
            <Icon icon={ChevronLeft} size={24} color="#111827" />
          </TouchableOpacity>
          
          <Text className="text-[#FF6B00] text-xs font-bold mb-3 tracking-wider">
            STEP {currentStep} OF {TOTAL_STEPS}
          </Text>
          
          <View className="flex-row space-x-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <View 
                key={i} 
                className={`flex-1 h-1 rounded-full ${i < currentStep ? 'bg-[#FF6B00]' : 'bg-gray-200'}`} 
              />
            ))}
          </View>
        </View>

        {/* Form Content */}
        {renderStep()}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
