import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { iconWithClassName } from '../../lib/icons';

export interface QTextFieldProps extends TextInputProps {
  label: string;
  icon?: LucideIcon;
  rightElement?: React.ReactNode;
}

export function QTextField({ label, icon: Icon, rightElement, className, ...props }: QTextFieldProps) {
  if (Icon) iconWithClassName(Icon);
  return (
    <View className={`mb-4 ${className || ''}`}>
      <Text className="text-sm font-semibold text-gray-800 mb-2">{label}</Text>
      <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-1 h-14 bg-white">
        {Icon && (
          <View className="mr-3">
            <Icon size={20} color="#6b7280" />
          </View>
        )}
        <TextInput
          className="flex-1 text-base text-gray-900"
          placeholderTextColor="#9ca3af"
          {...props}
        />
        {rightElement && (
          <View className="ml-2">
            {rightElement}
          </View>
        )}
      </View>
    </View>
  );
}
