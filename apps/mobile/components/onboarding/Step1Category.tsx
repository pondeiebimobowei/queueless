import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Scissors, Car, Stethoscope, Briefcase, MoreHorizontal } from 'lucide-react-native';
import { StepProps, BusinessCategory } from './types';
import { QRadioCard } from '../ui/QRadioCard';
import { QButton } from '../ui/QButton';

const CATEGORIES = [
  {
    id: 'beauty',
    title: 'Beauty & Personal Care',
    description: 'Barbershop, Salon, Nail Studio, Spa',
    icon: Scissors,
  },
  {
    id: 'automotive',
    title: 'Automotive Services',
    description: 'Car Wash, Auto Repair, Detailing',
    icon: Car,
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Clinic, Dental, Hospital, Pharmacy',
    icon: Stethoscope,
  },
  {
    id: 'professional',
    title: 'Professional Services',
    description: 'Consulting, Legal, Accounting',
    icon: Briefcase,
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Another type of business',
    icon: MoreHorizontal,
  },
];

export function Step1Category({ data, updateData, onNext, onSaveLater }: StepProps) {
  return (
    <View className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-bold text-gray-900 mb-2">Let's set up your business</Text>
            <Text className="text-sm text-gray-500 leading-5">
              This helps us personalize QueueLess for your type of business.
            </Text>
          </View>
          {/* Placeholder for the illustration icon shown in design */}
          <View className="w-20 h-20 bg-gray-100 rounded-xl items-center justify-center">
             <Text className="text-2xl">🏪</Text>
          </View>
        </View>

        <Text className="text-lg font-bold text-gray-900 mb-1">What type of business do you run?</Text>
        <Text className="text-sm text-gray-500 mb-4">Choose the option that best describes your business.</Text>

        {CATEGORIES.map((cat) => (
          <QRadioCard
            key={cat.id}
            id={cat.id}
            title={cat.title}
            description={cat.description}
            icon={cat.icon}
            isSelected={data.category === cat.id}
            onSelect={(id) => updateData({ category: id as BusinessCategory })}
          />
        ))}
      </ScrollView>
      
      <View className="py-4">
        <QButton 
          label="Continue" 
          onPress={onNext} 
          isDisabled={!data.category} 
        />
        {onSaveLater && (
          <QButton 
            label="Save and continue later" 
            variant="ghost" 
            onPress={onSaveLater} 
            className="mt-2"
          />
        )}
      </View>
    </View>
  );
}
