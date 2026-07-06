import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import { TimeSlot } from '../data/stylists';

interface Props {
  slots: TimeSlot[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function TimeSlotPicker({ slots, selectedId, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {slots.map(slot => {
        const isSelected = slot.id === selectedId;
        return (
          <TouchableOpacity
            key={slot.id}
            style={[
              styles.chip,
              isSelected && styles.chipSelected,
              !slot.available && styles.chipUnavailable,
            ]}
            onPress={() => slot.available && onSelect(slot.id)}
            disabled={!slot.available}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.chipText,
                isSelected && styles.chipTextSelected,
                !slot.available && styles.chipTextUnavailable,
              ]}>
              {slot.time}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    minWidth: 76,
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  chipUnavailable: {
    backgroundColor: 'transparent',
    opacity: 0.4,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
  },
  chipTextSelected: {
    color: colors.textOnGold,
    fontWeight: typography.weight.semibold,
  },
  chipTextUnavailable: {
    color: colors.textTertiary,
    textDecorationLine: 'line-through',
  },
});
