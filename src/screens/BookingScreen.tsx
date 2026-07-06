import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  MOCK_STYLISTS,
  generateTimeSlots,
  getNextDays,
  formatDate,
  formatDuration,
  generateConfirmationCode,
} from '../data/stylists';
import TimeSlotPicker from '../components/TimeSlotPicker';
import BookingForm, { BookingFormValues } from '../components/BookingForm';
import { colors, radius, shadows, spacing, typography } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Booking'>;
  route: RouteProp<RootStackParamList, 'Booking'>;
};

const DAYS = getNextDays(14);

export default function BookingScreen({ navigation, route }: Props) {
  const { stylistId, serviceId: preselectedServiceId } = route.params;
  const stylist = MOCK_STYLISTS.find(s => s.id === stylistId);

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId ?? stylist?.services[0]?.id ?? '',
  );
  const [selectedDate, setSelectedDate] = useState<string>(DAYS[0]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [form, setForm] = useState<BookingFormValues>({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [error, setError] = useState<string | null>(null);

  if (!stylist) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Stylist not found.</Text>
      </View>
    );
  }

  const timeSlots = generateTimeSlots(selectedDate);
  const selectedSlot = timeSlots.find(s => s.id === selectedSlotId);
  const selectedService = stylist.services.find(s => s.id === selectedServiceId);

  const handleConfirm = () => {
    if (!selectedServiceId) {
      setError('Please choose a service to book.');
      return;
    }
    if (!selectedSlotId) {
      setError('Please choose an available time slot.');
      return;
    }
    if (!form.name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!form.phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }
    if (!form.email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setError(null);
    navigation.navigate('Confirmation', {
      confirmationCode: generateConfirmationCode(),
      stylistId: stylist.id,
      serviceId: selectedServiceId,
      date: selectedDate,
      time: selectedSlot?.time ?? '',
      customerName: form.name.trim(),
    });
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      {/* Stylist summary */}
      <View style={styles.stylistBar}>
        <View style={[styles.miniAvatar, { borderColor: stylist.accentColor }]}>
          <Text style={styles.miniInitials}>{stylist.initials}</Text>
        </View>
        <View>
          <Text style={styles.stylistName}>{stylist.name}</Text>
          <Text style={styles.stylistTitle}>{stylist.title}</Text>
        </View>
      </View>

      {/* Section: Service */}
      <SectionHeader title="Service" />
      <View style={styles.serviceList}>
        {stylist.services.map((service, i) => {
          const isSelected = service.id === selectedServiceId;
          return (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceRow,
                i > 0 && styles.serviceRowBorder,
                isSelected && styles.serviceRowSelected,
              ]}
              onPress={() => {
                setSelectedServiceId(service.id);
                setError(null);
              }}
              activeOpacity={0.7}>
              <View style={styles.serviceLeft}>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceMeta}>
                    {formatDuration(service.durationMinutes)}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.servicePrice,
                  isSelected && styles.servicePriceSelected,
                ]}>
                ${service.priceUsd}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Section: Date */}
      <SectionHeader title="Date" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateRow}>
        {DAYS.map(day => {
          const isSelected = day === selectedDate;
          const [year, month, date] = day.split('-').map(Number);
          const d = new Date(year, month - 1, date);
          const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
          const dayNum = d.getDate();
          const monthName = d.toLocaleDateString('en-US', { month: 'short' });
          return (
            <TouchableOpacity
              key={day}
              style={[styles.dateChip, isSelected && styles.dateChipSelected]}
              onPress={() => {
                setSelectedDate(day);
                setSelectedSlotId(null);
                setError(null);
              }}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.dateDayName,
                  isSelected && styles.dateDayNameSelected,
                ]}>
                {dayName}
              </Text>
              <Text
                style={[styles.dateDayNum, isSelected && styles.dateTextSelected]}>
                {dayNum}
              </Text>
              <Text
                style={[
                  styles.dateMonth,
                  isSelected && styles.dateDayNameSelected,
                ]}>
                {monthName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Section: Time */}
      <SectionHeader title="Time" />
      <View style={styles.timeContainer}>
        <TimeSlotPicker
          slots={timeSlots}
          selectedId={selectedSlotId}
          onSelect={id => {
            setSelectedSlotId(id);
            setError(null);
          }}
        />
      </View>

      {/* Section: Your Details */}
      <SectionHeader title="Your Details" />
      <BookingForm
        value={form}
        onChange={values => {
          setForm(values);
          setError(null);
        }}
      />

      {/* Summary */}
      {selectedService && selectedSlotId && (
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <SummaryRow label="Stylist" value={stylist.name} />
          <SummaryRow label="Service" value={selectedService.name} />
          <SummaryRow label="Date" value={formatDate(selectedDate)} />
          <SummaryRow label="Time" value={selectedSlot?.time ?? ''} />
          <View style={styles.summaryDivider} />
          <SummaryRow
            label="Total"
            value={`$${selectedService.priceUsd}`}
            highlight
          />
        </View>
      )}

      {/* Confirm */}
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{error}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirm}
        activeOpacity={0.85}>
        <Text style={styles.confirmText}>Confirm Booking</Text>
      </TouchableOpacity>

      <View style={styles.bottomPad} />
    </ScrollView>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={sectionStyles.container}>
      <Text style={sectionStyles.text}>{title}</Text>
      <View style={sectionStyles.rule} />
    </View>
  );
}

function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View style={summaryRowStyles.row}>
      <Text style={summaryRowStyles.label}>{label}</Text>
      <Text
        style={[summaryRowStyles.value, highlight && summaryRowStyles.highlight]}>
        {value}
      </Text>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  text: {
    color: colors.textTertiary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.trackingWider,
    textTransform: 'uppercase',
  },
  rule: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
});

const summaryRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
  },
  highlight: {
    color: colors.gold,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
});

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
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
  stylistBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  miniAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniInitials: {
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
  serviceList: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
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
  serviceRowSelected: {
    backgroundColor: colors.goldTint,
  },
  serviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.gold,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gold,
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
  servicePrice: {
    color: colors.textSecondary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
  },
  servicePriceSelected: {
    color: colors.gold,
    fontWeight: typography.weight.semibold,
  },
  dateRow: {
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  dateChip: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    minWidth: 60,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  dateChipSelected: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  dateDayName: {
    color: colors.textTertiary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xxs,
  },
  dateDayNum: {
    color: colors.textPrimary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    lineHeight: typography.size.lg * 1.2,
  },
  dateMonth: {
    color: colors.textTertiary,
    fontSize: typography.size.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.xxs,
  },
  dateTextSelected: {
    color: colors.textOnGold,
  },
  dateDayNameSelected: {
    color: 'rgba(26, 22, 15, 0.65)',
  },
  timeContainer: {
    marginBottom: spacing.sm,
  },
  summary: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  summaryTitle: {
    color: colors.textTertiary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.trackingWider,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginVertical: spacing.sm,
  },
  errorBanner: {
    backgroundColor: 'rgba(217, 139, 139, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(217, 139, 139, 0.35)',
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  errorBannerText: {
    color: colors.error,
    fontSize: typography.size.sm,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    ...shadows.card,
  },
  confirmText: {
    color: colors.textOnGold,
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    letterSpacing: 0.4,
  },
  bottomPad: {
    height: spacing.xxxl,
  },
});
