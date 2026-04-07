import React, { useState } from 'react';
import {
  Alert,
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
      Alert.alert('Select a service', 'Please choose a service to book.');
      return;
    }
    if (!selectedSlotId) {
      Alert.alert('Select a time', 'Please choose an available time slot.');
      return;
    }
    if (!form.name.trim()) {
      Alert.alert('Name required', 'Please enter your full name.');
      return;
    }
    if (!form.phone.trim()) {
      Alert.alert('Phone required', 'Please enter your phone number.');
      return;
    }
    if (!form.email.trim()) {
      Alert.alert('Email required', 'Please enter your email address.');
      return;
    }

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
      {stylist.services.map(service => {
        const isSelected = service.id === selectedServiceId;
        return (
          <TouchableOpacity
            key={service.id}
            style={[styles.serviceRow, isSelected && styles.serviceRowSelected]}
            onPress={() => setSelectedServiceId(service.id)}
            activeOpacity={0.7}>
            <View style={styles.serviceLeft}>
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected && <View style={styles.radioDot} />}
              </View>
              <View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceMeta}>
                  {Math.floor(service.durationMinutes / 60) > 0
                    ? `${Math.floor(service.durationMinutes / 60)}h `
                    : ''}
                  {service.durationMinutes % 60 > 0
                    ? `${service.durationMinutes % 60}m`
                    : ''}
                </Text>
              </View>
            </View>
            <Text style={[styles.servicePrice, isSelected && styles.servicePriceSelected]}>
              ${service.priceUsd}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Section: Date */}
      <SectionHeader title="Date" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateRow}>
        {DAYS.map(day => {
          const isSelected = day === selectedDate;
          const [, month, date] = day.split('-');
          const d = new Date(parseInt(day.split('-')[0], 10), parseInt(month, 10) - 1, parseInt(date, 10));
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
              }}
              activeOpacity={0.7}>
              <Text style={[styles.dateDayName, isSelected && styles.dateTextSelected]}>
                {dayName}
              </Text>
              <Text style={[styles.dateDayNum, isSelected && styles.dateTextSelected]}>
                {dayNum}
              </Text>
              <Text style={[styles.dateMonth, isSelected && styles.dateTextSelected]}>
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
          onSelect={setSelectedSlotId}
        />
      </View>

      {/* Section: Your Details */}
      <SectionHeader title="Your Details" />
      <BookingForm value={form} onChange={setForm} />

      {/* Summary */}
      {selectedService && selectedSlotId && (
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <SummaryRow label="Stylist" value={stylist.name} />
          <SummaryRow label="Service" value={selectedService.name} />
          <SummaryRow label="Date" value={formatDate(selectedDate)} />
          <SummaryRow label="Time" value={selectedSlot?.time ?? ''} />
          <View style={styles.summaryDivider} />
          <SummaryRow label="Total" value={`$${selectedService.priceUsd}`} highlight />
        </View>
      )}

      {/* Confirm */}
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
      <Text style={[summaryRowStyles.value, highlight && summaryRowStyles.highlight]}>
        {value}
      </Text>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.gold,
    paddingLeft: spacing.sm,
  },
  text: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
});

const summaryRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
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
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniInitials: {
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
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  serviceRowSelected: {
    borderColor: colors.gold,
  },
  serviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.gold,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gold,
  },
  serviceName: {
    color: colors.textPrimary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
    marginBottom: 2,
  },
  serviceMeta: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },
  servicePrice: {
    color: colors.textSecondary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
  },
  servicePriceSelected: {
    color: colors.gold,
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
    minWidth: 56,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateChipSelected: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  dateDayName: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    marginBottom: 2,
  },
  dateDayNum: {
    color: colors.textPrimary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    lineHeight: typography.size.lg * 1.2,
  },
  dateMonth: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    marginTop: 2,
  },
  dateTextSelected: {
    color: colors.textOnGold,
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
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
    marginBottom: spacing.md,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  confirmButton: {
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  confirmText: {
    color: colors.textOnGold,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    letterSpacing: 0.3,
  },
  bottomPad: {
    height: spacing.xxxl,
  },
});
