import React from 'react';
import { LucideIcon, LucideProps } from 'lucide-react-native';
import { iconWithClassName } from '../../lib/icons';

export interface IconProps extends LucideProps {
  icon: LucideIcon;
  className?: string;
}

/**
 * Reusable Icon component that automatically applies NativeWind styling 
 * (className support) to any Lucide icon without needing manual iconWithClassName calls.
 * 
 * @example
 * `<Icon icon={ChevronLeft} size={24} className="text-gray-900" />`
 */
export function Icon({ icon: LucideIconComponent, ...props }: IconProps) {
  if (!LucideIconComponent) return null;
  const InteropIcon = iconWithClassName(LucideIconComponent);
  return <InteropIcon {...props} />;
}
