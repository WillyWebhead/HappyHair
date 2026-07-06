import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
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
        <Input
          value={value.name}
          onChangeText={update('name')}
          placeholder="Your name"
          autoComplete="name"
        />
      </Field>
      <Field label="Phone Number" required>
        <Input
          value={value.phone}
          onChangeText={update('phone')}
          placeholder="(555) 000-0000"
          keyboardType="phone-pad"
          autoComplete="tel"
        />
      </Field>
      <Field label="Email Address" required>
        <Input
          value={value.email}
          onChangeText={update('email')}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
        />
      </Field>
      <Field label="Notes" optional>
        <Input
          value={value.notes}
          onChangeText={update('notes')}
          placeholder="Anything the stylist should know"
          multiline
          numberOfLines={3}
        />
      </Field>
    </View>
  );
}

function Input({ multiline, style, ...props }: TextInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      {...props}
      multiline={multiline}
      placeholderTextColor={colors.textTertiary}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={[
        styles.input,
        multiline && styles.inputMultiline,
        focused && styles.inputFocused,
        style,
      ]}
    />
  );
}

function Field({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
        {optional && <Text style={styles.optional}>  ·  Optional</Text>}
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
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    marginBottom: spacing.sm,
    letterSpacing: typography.trackingWide,
    textTransform: 'uppercase',
  },
  required: {
    color: colors.gold,
  },
  optional: {
    color: colors.textTertiary,
    fontWeight: typography.weight.regular,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    color: colors.textPrimary,
    fontSize: typography.size.base,
  },
  inputFocused: {
    borderColor: colors.gold,
    backgroundColor: colors.surfaceRaised,
  },
  inputMultiline: {
    height: 88,
    textAlignVertical: 'top',
    paddingTop: spacing.sm + 4,
  },
});
