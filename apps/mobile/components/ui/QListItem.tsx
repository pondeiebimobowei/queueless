import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LucideIcon, GripVertical, Trash2 } from 'lucide-react-native';
import { iconWithClassName } from '../../lib/icons';

[GripVertical, Trash2].forEach(iconWithClassName);

export interface QListItemProps {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  avatarUrl?: string;
  onDelete?: () => void;
  showDragHandle?: boolean;
}

export function QListItem({ title, subtitle, icon: Icon, avatarUrl, onDelete, showDragHandle = false }: QListItemProps) {
  if (Icon) iconWithClassName(Icon);
  return (
    <View className="flex-row items-center p-4 mb-3 rounded-xl border border-gray-200 bg-white">
      {showDragHandle && (
        <View className="mr-3">
          <GripVertical size={20} color="#9ca3af" />
        </View>
      )}
      
      {Icon && !avatarUrl && (
        <View className="w-12 h-12 rounded-full items-center justify-center mr-4 bg-orange-100">
          <Icon size={24} color="#FF6B00" />
        </View>
      )}

      {avatarUrl && (
        <Image
          source={{ uri: avatarUrl }}
          className="w-12 h-12 rounded-full mr-4 bg-gray-200"
        />
      )}

      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900">{title}</Text>
        <Text className="text-xs text-gray-500 mt-1">{subtitle}</Text>
      </View>

      {onDelete && (
        <TouchableOpacity onPress={onDelete} className="p-2" hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Trash2 size={20} color="#9ca3af" />
        </TouchableOpacity>
      )}
    </View>
  );
}
