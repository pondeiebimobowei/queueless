import { cssInterop } from 'nativewind';
import type { LucideIcon } from 'lucide-react-native';

/**
 * Registers NativeWind cssInterop for a LucideIcon component,
 * mapping className properties (like text-orange-500, w-6, h-6) to prop values.
 */
export function iconWithClassName(icon: LucideIcon): LucideIcon {
  if (!icon) return icon;
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
  return icon;
}

/**
 * Utility to register multiple Lucide icons with NativeWind cssInterop at once.
 */
export function registerIcons(...icons: LucideIcon[]) {
  icons.forEach((icon) => iconWithClassName(icon));
}

