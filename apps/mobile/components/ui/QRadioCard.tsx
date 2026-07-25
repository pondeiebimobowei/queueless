import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

export interface QRadioCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function QRadioCard({ id, title, description, icon: Icon, isSelected, onSelect }: QRadioCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelect(id)}
      className={`flex-row items-center p-4 mb-3 rounded-xl border bg-white ${
        isSelected ? 'border-[#FF6B00]' : 'border-gray-200'
      }`}
    >
      <View
        className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
          isSelected ? 'bg-orange-100' : 'bg-gray-100'
        }`}
      >
        <Icon size={24} color={isSelected ? '#FF6B00' : '#4b5563'} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900">{title}</Text>
        <Text className="text-xs text-gray-500 mt-1">{description}</Text>
      </View>
      <View
        className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
          isSelected ? 'border-[#FF6B00]' : 'border-gray-300'
        }`}
      >
        {isSelected && <View className="w-3 h-3 rounded-full bg-[#FF6B00]" />}
      </View>
    </TouchableOpacity>
  );
}
