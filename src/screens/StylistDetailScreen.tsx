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
import { MOCK_STYLISTS, formatDuration } from '../data/stylists';
import ServiceBadge from '../components/ServiceBadge';
import { Chevron } from '../components/icons';
import { colors, radius, shadows, spacing, typography } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'StylistDetail'>;
  route: RouteProp<RootStackParamList, 'StylistDetail'>;
};

export default function StylistDetailScreen({ navigation, route }: Props) {
  const stylist = MOCK_STYLISTS.find(s => s.id === route.params.stylistId);

  if (!stylist) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Stylist not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={[styles.avatar, { borderColor: stylist.accentColor }]}>
            <Text style={styles.initials}>{stylist.initials}</Text>
          </View>
          <Text style={styles.name}>{stylist.name}</Text>
          <Text style={styles.title}>{stylist.title}</Text>
          <Text style={styles.experience}>
            {stylist.yearsExperience} years experience
          </Text>
        </View>

        {/* Bio */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>About</Text>
          <Text style={styles.bio}>{stylist.bio}</Text>
        </View>

        {/* Expertise */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Expertise</Text>
          <View style={styles.badges}>
            {stylist.expertise.map(tag => (
              <ServiceBadge key={tag} label={tag} />
            ))}
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Services</Text>
          <View style={styles.serviceList}>
            {stylist.services.map((service, i) => (
              <TouchableOpacity
                key={service.id}
                style={[styles.serviceRow, i > 0 && styles.serviceRowBorder]}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('Booking', {
                    stylistId: stylist.id,
                    serviceId: service.id,
                  })
                }>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceMeta}>
                    {formatDuration(service.durationMinutes)}
                  </Text>
                </View>
                <View style={styles.serviceRight}>
                  <Text style={styles.servicePrice}>${service.priceUsd}</Text>
                  <Chevron />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>

      {/* Sticky book button */}
      <View style={styles.stickyFooter}>
        <TouchableOpacity
          style={styles.bookButton}
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('Booking', { stylistId: stylist.id })
          }>
          <Text style={styles.bookButtonText}>
            Book with {stylist.name.split(' ')[0]}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: spacing.lg,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: typography.size.base,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  initials: {
    color: colors.gold,
    fontFamily: typography.fontFamilyHeading,
    fontSize: typography.size.xl,
    letterSpacing: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.size.xl,
    fontFamily: typography.fontFamilyHeading,
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.gold,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    letterSpacing: typography.trackingWide,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  experience: {
    color: colors.textTertiary,
    fontSize: typography.size.sm,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    color: colors.textTertiary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.trackingWider,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  bio: {
    color: colors.textSecondary,
    fontSize: typography.size.base,
    lineHeight: typography.size.base * 1.75,
    fontWeight: typography.weight.regular,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceList: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    ...shadows.card,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  serviceRowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  serviceInfo: {
    flex: 1,
    paddingRight: spacing.md,
  },
  serviceName: {
    color: colors.textPrimary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
    marginBottom: spacing.xxs,
  },
  serviceMeta: {
    color: colors.textTertiary,
    fontSize: typography.size.sm,
  },
  serviceRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  servicePrice: {
    color: colors.gold,
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
  },
  bottomPad: {
    height: spacing.xl,
  },
  stickyFooter: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  bookButton: {
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  bookButtonText: {
    color: colors.textOnGold,
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    letterSpacing: 0.4,
  },
});
