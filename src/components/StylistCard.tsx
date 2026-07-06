import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../theme';
import { Stylist } from '../data/stylists';
import ServiceBadge from './ServiceBadge';
import { Chevron } from './icons';

interface Props {
  stylist: Stylist;
  onPress: () => void;
}

export default function StylistCard({ stylist, onPress }: Props) {
  const visibleExpertise = stylist.expertise.slice(0, 3);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.header}>
        <View style={[styles.avatar, { borderColor: stylist.accentColor }]}>
          <Text style={styles.initials}>{stylist.initials}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>{stylist.name}</Text>
          <Text style={styles.title}>{stylist.title}</Text>
          <Text style={styles.experience}>
            {stylist.yearsExperience} years experience
          </Text>
        </View>
      </View>

      <View style={styles.badges}>
        {visibleExpertise.map(tag => (
          <ServiceBadge key={tag} label={tag} />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.viewProfile}>View Profile</Text>
        <Chevron color={colors.gold} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.lg,
    margin: spacing.sm,
    flex: 1,
    minWidth: 260,
    maxWidth: 360,
    width: '100%',
    alignSelf: 'center',
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.gold,
    fontFamily: typography.fontFamilyHeading,
    fontSize: typography.size.md,
    letterSpacing: 1,
  },
  headerText: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    marginBottom: spacing.xxs,
  },
  title: {
    color: colors.gold,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    marginBottom: spacing.xxs,
  },
  experience: {
    color: colors.textTertiary,
    fontSize: typography.size.xs,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.md,
  },
  viewProfile: {
    color: colors.gold,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.trackingWide,
    textTransform: 'uppercase',
  },
});
