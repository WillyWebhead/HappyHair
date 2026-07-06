import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

interface IconProps {
  size?: number;
  color?: string;
}

/**
 * Right-pointing chevron drawn with borders — crisper than a text glyph
 * and consistent across platforms/fonts.
 */
export function Chevron({ size = 8, color = colors.textTertiary }: IconProps) {
  return (
    <View
      style={[
        styles.chevron,
        {
          width: size,
          height: size,
          borderColor: color,
        },
      ]}
    />
  );
}

/** Checkmark drawn with borders. */
export function Check({ size = 28, color = colors.gold }: IconProps) {
  return (
    <View
      style={[
        styles.check,
        {
          width: size,
          height: size * 0.55,
          borderColor: color,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  chevron: {
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    transform: [{ rotate: '45deg' }],
  },
  check: {
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    transform: [{ rotate: '-45deg' }],
  },
});
