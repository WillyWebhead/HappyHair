import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../theme';
import { Stylist } from '../data/stylists';
import ServiceBadge from './ServiceBadge';

interface Props {
  stylist: Stylist;
  onPress: () => void;
}

export default function StylistCard({ stylist, onPress }: Props) {
  const visibleExpertise = stylist.expertise.slice(0, 3);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}>
      {/* Avatar */}
      <View style={[styles.avatar, { borderColor: stylist.accentColor }]}>
        <Text style={styles.initials}>{stylist.initials}</Text>
      </View>

      {/* Info */}
      <Text style={styles.name}>{stylist.name}</Text>
      <Text style={styles.title}>{stylist.title}</Text>
      <Text style={styles.experience}>
        {stylist.yearsExperience} yrs experience
      </Text>

      {/* Expertise tags */}
      <View style={styles.badges}>
        {visibleExpertise.map(tag => (
          <ServiceBadge key={tag} label={tag} />
        ))}
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        <Text style={styles.viewProfile}>View Profile →</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    margin: spacing.sm,
    flex: 1,
    minWidth: 160,
    maxWidth: 280,
    ...shadows.card,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  initials: {
    color: colors.gold,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    letterSpacing: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    marginBottom: spacing.xxs,
  },
  title: {
    color: colors.gold,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    marginBottom: spacing.xs,
  },
  experience: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    marginBottom: spacing.md,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  viewProfile: {
    color: colors.gold,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
});
