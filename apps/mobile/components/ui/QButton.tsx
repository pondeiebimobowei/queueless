import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export type QButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

export interface QButtonProps {
  label: string;
  variant?: QButtonVariant;
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export function QButton({
  label,
  variant = 'primary',
  onPress,
  isLoading = false,
  isDisabled = false,
  className = '',
}: QButtonProps) {
  let baseStyles = 'rounded-xl py-4 flex-row justify-center items-center ';
  let textStyles = 'text-base font-semibold ';

  switch (variant) {
    case 'primary':
      baseStyles += 'bg-[#FF6B00] ';
      textStyles += 'text-white ';
      break;
    case 'secondary':
      baseStyles += 'bg-gray-200 ';
      textStyles += 'text-black ';
      break;
    case 'ghost':
      baseStyles += 'bg-transparent py-2 ';
      textStyles += 'text-[#FF6B00] ';
      break;
    case 'destructive':
      baseStyles += 'bg-red-500 ';
      textStyles += 'text-white ';
      break;
  }

  if (isDisabled) {
    baseStyles += 'opacity-50 ';
  }

  return (
    <TouchableOpacity
      className={`${baseStyles} ${className}`}
      onPress={onPress}
      disabled={isDisabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'destructive' ? 'white' : '#FF6B00'} />
      ) : (
        <Text className={textStyles}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
