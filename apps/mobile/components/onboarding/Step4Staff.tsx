import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StepProps } from './types';
import { QListItem } from '../ui/QListItem';
import { QButton } from '../ui/QButton';

export function Step4Staff({ data, updateData, onNext }: StepProps) {
  
  const handleDelete = (id: string) => {
    updateData({ staff: data.staff.filter(s => s.id !== id) });
  };

  const handleAddStaff = () => {
    // In a real app, this would open a modal to add a new staff member
    console.log("Add staff member clicked");
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Add your staff</Text>
          <Text className="text-sm text-gray-500 leading-5">
            Add your staff members and the services they can provide.
          </Text>
        </View>

        <Text className="text-base font-bold text-gray-900 mb-3">Staff Members</Text>

        {data.staff.map((member) => (
          <QListItem
            key={member.id}
            title={member.name}
            subtitle={member.services}
            avatarUrl={member.avatarUrl}
            onDelete={() => handleDelete(member.id)}
          />
        ))}

        <QButton
          label="+ Add Staff Member"
          variant="ghost"
          onPress={handleAddStaff}
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
