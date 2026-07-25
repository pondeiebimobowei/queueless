export type BusinessCategory = 'beauty' | 'automotive' | 'healthcare' | 'professional' | 'other' | null;

export interface OnboardingData {
  category: BusinessCategory;
  businessName: string;
  tagline: string;
  branchName: string;
  address: string;
  hours: string;
  currency: string;
  services: { id: string; name: string; duration: string; iconName: string }[];
  staff: { id: string; name: string; services: string; avatarUrl: string }[];
}

export interface StepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onSaveLater?: () => void;
}
