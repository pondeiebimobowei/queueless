import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Scissors, Briefcase, User, PenTool } from 'lucide-react-native';
import { StepProps } from './types';
import { QListItem } from '../ui/QListItem';
import { QButton } from '../ui/QButton';

const iconMap: Record<string, any> = {
  'scissors': Scissors,
  'briefcase': Briefcase,
  'user': User,
  'pen-tool': PenTool,
};

export function Step3Services({ data, updateData, onNext }: StepProps) {
  
  const handleDelete = (id: string) => {
    updateData({ services: data.services.filter(s => s.id !== id) });
  };

  const handleAddService = () => {
    // In a real app, this would open a modal to add a new service
    console.log("Add another service clicked");
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Add your services</Text>
          <Text className="text-sm text-gray-500 leading-5">
            Add the services you offer. You can add more later.
          </Text>
        </View>

        <Text className="text-base font-bold text-gray-900 mb-3">Your Services</Text>

        {data.services.map((service) => (
          <QListItem
            key={service.id}
            title={service.name}
            subtitle={service.duration}
            icon={iconMap[service.iconName] || Scissors}
            showDragHandle={true}
            onDelete={() => handleDelete(service.id)}
          />
        ))}

        <QButton
          label="+ Add Another Service"
          variant="ghost"
          onPress={handleAddService}
          className="mt-2 mb-6"
        />
      </ScrollView>

      <View className="py-4">
        <QButton 
          label="Continue" 
          onPress={onNext} 
        />
      </View>
    </View>
  );
}
