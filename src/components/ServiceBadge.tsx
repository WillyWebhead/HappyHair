import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

interface Props {
  label: string;
  variant?: 'default' | 'selected';
}

export default function ServiceBadge({ label, variant = 'default' }: Props) {
  return (
    <View style={[styles.badge, variant === 'selected' && styles.badgeSelected]}>
      <Text style={[styles.text, variant === 'selected' && styles.textSelected]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 1,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  badgeSelected: {
    backgroundColor: colors.goldTint,
    borderColor: colors.goldMuted,
  },
  text: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    letterSpacing: 0.4,
  },
  textSelected: {
    color: colors.goldLight,
  },
});
