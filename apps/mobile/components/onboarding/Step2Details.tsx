import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Store, Star, MapPin, Map, Clock, Globe, Crosshair, ChevronDown, Pencil } from 'lucide-react-native';
import { StepProps } from './types';
import { QTextField } from '../ui/QTextField';
import { QButton } from '../ui/QButton';

export function Step2Details({ data, updateData, onNext, onSaveLater }: StepProps) {
  return (
    <View className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Tell us about your business</Text>
          <Text className="text-sm text-gray-500 leading-5">
            Basic information about your business and location.
          </Text>
        </View>

        <QTextField
          label="Business Name"
          icon={Store}
          placeholder="Glow Beauty Studio"
          value={data.businessName}
          onChangeText={(val) => updateData({ businessName: val })}
        />

        <QTextField
          label="Business Tagline (Optional)"
          icon={Star}
          placeholder="Beauty. Confidence. You."
          value={data.tagline}
          onChangeText={(val) => updateData({ tagline: val })}
          rightElement={<Text className="text-xs text-gray-400">{data.tagline?.length || 0}/60</Text>}
          maxLength={60}
        />

        <QTextField
          label="Branch / Location Name"
          icon={MapPin}
          placeholder="Lekki Branch"
          value={data.branchName}
          onChangeText={(val) => updateData({ branchName: val })}
        />

        <QTextField
          label="Business Address"
          icon={Map}
          placeholder="15 Admiralty Way, Lekki Phase 1, Lagos"
          value={data.address}
          onChangeText={(val) => updateData({ address: val })}
          rightElement={<Crosshair size={20} color="#6b7280" />}
        />

        <QTextField
          label="Business Hours"
          icon={Clock}
          placeholder="Mon - Sat | 9:00 AM - 8:00 PM"
          value={data.hours}
          onChangeText={(val) => updateData({ hours: val })}
          rightElement={<Pencil size={20} color="#6b7280" />}
        />

        <QTextField
          label="Currency"
          icon={Globe}
          placeholder="NGN - Nigerian Naira"
          value={data.currency}
          onChangeText={(val) => updateData({ currency: val })}
          rightElement={<ChevronDown size={20} color="#6b7280" />}
        />
        <View className="h-4" />
      </ScrollView>

      <View className="py-4">
        <QButton 
          label="Continue" 
          onPress={onNext} 
          isDisabled={!data.businessName || !data.branchName} 
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
