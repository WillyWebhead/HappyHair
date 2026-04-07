import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

export interface BookingFormValues {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface Props {
  value: BookingFormValues;
  onChange: (values: BookingFormValues) => void;
}

export default function BookingForm({ value, onChange }: Props) {
  const update = (field: keyof BookingFormValues) => (text: string) =>
    onChange({ ...value, [field]: text });

  return (
    <View>
      <Field label="Full Name" required>
        <TextInput
          style={styles.input}
          value={value.name}
          onChangeText={update('name')}
          placeholder="Your name"
          placeholderTextColor={colors.textSecondary}
          autoComplete="name"
        />
      </Field>
      <Field label="Phone Number" required>
        <TextInput
          style={styles.input}
          value={value.phone}
          onChangeText={update('phone')}
          placeholder="(555) 000-0000"
          placeholderTextColor={colors.textSecondary}
          keyboardType="phone-pad"
          autoComplete="tel"
        />
      </Field>
      <Field label="Email Address" required>
        <TextInput
          style={styles.input}
          value={value.email}
          onChangeText={update('email')}
          placeholder="you@example.com"
          placeholderTextColor={colors.textSecondary}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
        />
      </Field>
      <Field label="Notes (optional)">
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          value={value.notes}
          onChangeText={update('notes')}
          placeholder="Anything the stylist should know..."
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={3}
        />
      </Field>
    </View>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  required: {
    color: colors.gold,
  },
  input: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    color: colors.textPrimary,
    fontSize: typography.size.base,
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: spacing.sm + 2,
  },
});
