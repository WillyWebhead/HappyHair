import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MOCK_STYLISTS, formatDateLong } from '../data/stylists';
import { Check } from '../components/icons';
import { colors, radius, shadows, spacing, typography } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Confirmation'>;
  route: RouteProp<RootStackParamList, 'Confirmation'>;
};

export default function ConfirmationScreen({ navigation, route }: Props) {
  const { confirmationCode, stylistId, serviceId, date, time, customerName } =
    route.params;

  const stylist = MOCK_STYLISTS.find(s => s.id === stylistId);
  const service = stylist?.services.find(s => s.id === serviceId);

  const handleHome = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  const handleBookAnother = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Stylists' }] });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.checkCircle}>
          <Check />
        </View>

        <Text style={styles.heading}>Booking Confirmed</Text>
        <Text style={styles.subheading}>
          See you soon, {customerName.split(' ')[0]}.
        </Text>

        {/* Confirmation code */}
        <View style={styles.codeBox}>
          <Text style={styles.codeLabel}>Confirmation Code</Text>
          <Text style={styles.codeValue}>{confirmationCode}</Text>
        </View>

        {/* Booking details */}
        <View style={styles.detailCard}>
          <Text style={styles.detailCardTitle}>Appointment Details</Text>

          {stylist && (
            <View style={styles.stylistRow}>
              <View style={[styles.avatar, { borderColor: stylist.accentColor }]}>
                <Text style={styles.initials}>{stylist.initials}</Text>
              </View>
              <View>
                <Text style={styles.stylistName}>{stylist.name}</Text>
                <Text style={styles.stylistTitle}>{stylist.title}</Text>
              </View>
            </View>
          )}

          <View style={styles.divider} />

          <DetailRow label="Service" value={service?.name ?? serviceId} />
          <DetailRow label="Date" value={formatDateLong(date)} />
          <DetailRow label="Time" value={time} />
          {service && (
            <>
              <View style={styles.divider} />
              <DetailRow label="Total" value={`$${service.priceUsd}`} highlight />
            </>
          )}
        </View>

        {/* Notice */}
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            We'll send a reminder the day before your appointment. Please
            arrive 5 minutes early.
          </Text>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={handleHome}
          activeOpacity={0.85}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.anotherButton}
          onPress={handleBookAnother}
          activeOpacity={0.7}>
          <Text style={styles.anotherButtonText}>Book Another Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View style={detailStyles.row}>
      <Text style={detailStyles.label}>{label}</Text>
      <Text style={[detailStyles.value, highlight && detailStyles.highlight]}>
        {value}
      </Text>
    </View>
  );
}

const detailStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  label: {
    color: colors.textTertiary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.trackingWide,
    textTransform: 'uppercase',
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
    flexShrink: 1,
    textAlign: 'right',
  },
  highlight: {
    color: colors.gold,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
  },
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.goldTint,
    borderWidth: 1,
    borderColor: colors.goldMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    // Optical centering — the drawn check sits slightly high
    paddingTop: 6,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: typography.size.xl,
    fontFamily: typography.fontFamilyHeading,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subheading: {
    color: colors.textSecondary,
    fontSize: typography.size.base,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  codeBox: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    width: '100%',
  },
  codeLabel: {
    color: colors.textTertiary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.trackingWider,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  codeValue: {
    color: colors.gold,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    letterSpacing: 4,
    fontFamily: 'monospace',
  },
  detailCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.lg,
    width: '100%',
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  detailCardTitle: {
    color: colors.textTertiary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.trackingWider,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  stylistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.gold,
    fontFamily: typography.fontFamilyHeading,
    fontSize: typography.size.base,
  },
  stylistName: {
    color: colors.textPrimary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    marginBottom: spacing.xxs,
  },
  stylistTitle: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginBottom: spacing.md,
  },
  notice: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
    width: '100%',
    borderLeftWidth: 2,
    borderLeftColor: colors.gold,
  },
  noticeText: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    lineHeight: typography.size.sm * 1.6,
  },
  homeButton: {
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  homeButtonText: {
    color: colors.textOnGold,
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    letterSpacing: 0.4,
  },
  anotherButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  anotherButtonText: {
    color: colors.gold,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    letterSpacing: 0.3,
  },
});
