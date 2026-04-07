import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography, radius } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const isWide = width > 600;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          isWide && styles.containerWide,
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Salon label above oval */}
        <View style={styles.topBar}>
          <View style={styles.dot} />
          <Text style={styles.salonLabel}>HAPPY HAIR SALON</Text>
          <View style={styles.dot} />
        </View>

        {/* Oval hero card */}
        <View style={styles.ovalCard}>
          <Text style={styles.heroTitle}>Happy{'\n'}Hair</Text>
        </View>

        {/* Tagline below oval */}
        <View style={styles.divider} />
        <Text style={styles.tagline}>
          Expert stylists. Effortless booking.{'\n'}Your best look awaits.
        </Text>
        <View style={styles.taglineGap} />

        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Stylists')}
          activeOpacity={0.85}>
          <Text style={styles.ctaText}>Meet Our Stylists</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryCta}
          onPress={() => navigation.navigate('Stylists')}
          activeOpacity={0.7}>
          <Text style={styles.secondaryCtaText}>Book in minutes · No account needed</Text>
        </TouchableOpacity>

        {/* Feature pills */}
        <View style={styles.features}>
          {['5 Expert Stylists', 'All Hair Types', 'Same-Week Booking'].map(
            feature => (
              <View key={feature} style={styles.featurePill}>
                <Text style={styles.featurePillText}>{feature}</Text>
              </View>
            ),
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl,
    alignItems: 'center',
  },
  containerWide: {
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
  ovalCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceRaised,
    borderRadius: 120,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.xxl,
    marginBottom: spacing.sm,
    // scaleX makes the circle wider than tall → oval
    transform: [{ scaleX: 1.15 }],
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gold,
  },
  salonLabel: {
    color: colors.gold,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    letterSpacing: 3,
  },
  heroTitle: {
    fontFamily: typography.fontFamilyHeading,
    fontSize: typography.size.hero,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: typography.size.hero * 1.1,
    letterSpacing: -1,
    transform: [{ scaleX: 1 / 1.15 }],
  },
  divider: {
    width: 48,
    height: 2,
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: typography.size.base,
    textAlign: 'center',
    lineHeight: typography.size.base * 1.6,
    fontWeight: typography.weight.regular,
  },
  taglineGap: {
    height: spacing.xxl,
  },
  ctaButton: {
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    marginBottom: spacing.md,
    width: '100%',
    alignItems: 'center',
  },
  ctaText: {
    color: colors.textOnGold,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    letterSpacing: 0.3,
  },
  secondaryCta: {
    marginBottom: spacing.xxxl,
  },
  secondaryCtaText: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    textAlign: 'center',
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  featurePill: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  featurePillText: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    letterSpacing: 0.3,
  },
});
