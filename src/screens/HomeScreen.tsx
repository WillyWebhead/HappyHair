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
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, radius, shadows, spacing, typography } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HIGHLIGHTS = ['5 Expert Stylists', 'All Hair Types', 'Same-Week Booking'];

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Wordmark */}
          <View style={styles.hero}>
            <View style={styles.overlineRow}>
              <View style={styles.overlineRule} />
              <Text style={styles.overline}>Salon &amp; Studio</Text>
              <View style={styles.overlineRule} />
            </View>

            <Text style={styles.heroTitle}>Happy Hair</Text>

            <Text style={styles.tagline}>
              Expert stylists. Effortless booking.{'\n'}Your best look awaits.
            </Text>
          </View>

          {/* CTA */}
          <View style={styles.ctaBlock}>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => navigation.navigate('Stylists')}
              activeOpacity={0.85}>
              <Text style={styles.ctaText}>Meet Our Stylists</Text>
            </TouchableOpacity>
            <Text style={styles.ctaCaption}>
              Book in minutes — no account needed
            </Text>
          </View>

          {/* Highlights */}
          <View style={styles.highlights}>
            {HIGHLIGHTS.map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 && <View style={styles.highlightDivider} />}
                <Text style={styles.highlightText}>{item}</Text>
              </React.Fragment>
            ))}
          </View>
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
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  content: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    alignItems: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  overlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
    alignSelf: 'stretch',
  },
  overlineRule: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  overline: {
    color: colors.gold,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.trackingWider,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: typography.fontFamilyHeading,
    fontSize: typography.size.hero,
    fontWeight: typography.weight.regular,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: typography.size.hero * 1.08,
    letterSpacing: 0.5,
    marginBottom: spacing.lg,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: typography.size.base,
    textAlign: 'center',
    lineHeight: typography.size.base * 1.65,
    fontWeight: typography.weight.regular,
  },
  ctaBlock: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  ctaButton: {
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.card,
  },
  ctaText: {
    color: colors.textOnGold,
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    letterSpacing: 0.4,
  },
  ctaCaption: {
    color: colors.textTertiary,
    fontSize: typography.size.sm,
    textAlign: 'center',
  },
  highlights: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm + 2,
  },
  highlightDivider: {
    width: 1,
    height: 11,
    backgroundColor: colors.border,
  },
  highlightText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: typography.weight.medium,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
