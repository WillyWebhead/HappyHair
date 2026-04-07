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
        {/* Check icon */}
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>

        <Text style={styles.heading}>Booking Confirmed!</Text>
        <Text style={styles.subheading}>
          See you soon, {customerName.split(' ')[0]}.
        </Text>

        {/* Confirmation code */}
        <View style={styles.codeBox}>
          <Text style={styles.codeLabel}>CONFIRMATION CODE</Text>
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

          <DetailRow icon="✂" label="Service" value={service?.name ?? serviceId} />
          <DetailRow icon="📅" label="Date" value={formatDateLong(date)} />
          <DetailRow icon="🕐" label="Time" value={time} />
          {service && (
            <DetailRow icon="💰" label="Total" value={`$${service.priceUsd}`} highlight />
          )}
        </View>

        {/* Notice */}
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            We'll send a reminder the day before your appointment. Please arrive 5 minutes early.
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
  icon,
  label,
  value,
  highlight,
}: {
  icon: string;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View style={detailStyles.row}>
      <Text style={detailStyles.icon}>{icon}</Text>
      <View style={detailStyles.content}>
        <Text style={detailStyles.label}>{label}</Text>
        <Text style={[detailStyles.value, highlight && detailStyles.highlight]}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const detailStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  icon: {
    fontSize: typography.size.base,
    width: 24,
    textAlign: 'center',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
  },
  highlight: {
    color: colors.gold,
    fontWeight: typography.weight.bold,
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
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.goldMuted,
    borderWidth: 2,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.xl,
  },
  checkMark: {
    color: colors.gold,
    fontSize: 36,
    fontWeight: typography.weight.bold,
    lineHeight: 44,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
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
    marginBottom: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    width: '100%',
  },
  codeLabel: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  codeValue: {
    color: colors.gold,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    letterSpacing: 4,
    fontFamily: 'monospace',
  },
  detailCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    width: '100%',
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  detailCardTitle: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    letterSpacing: 2,
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
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.gold,
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
  },
  stylistName: {
    color: colors.textPrimary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
  },
  stylistTitle: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  notice: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
    width: '100%',
    borderLeftWidth: 3,
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
    marginBottom: spacing.md,
  },
  homeButtonText: {
    color: colors.textOnGold,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
  anotherButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  anotherButtonText: {
    color: colors.gold,
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
  },
});
