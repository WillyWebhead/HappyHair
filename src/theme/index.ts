export const colors = {
  // Base surfaces — warm charcoal, not flat gray
  background: '#151310',
  surface: '#1E1B17',
  surfaceRaised: '#28241E',
  border: '#332E26',
  borderSubtle: '#2A2620',

  // Accent — champagne gold
  gold: '#C6A15B',
  goldLight: '#DFC08A',
  goldMuted: '#6E5A33',
  goldTint: 'rgba(198, 161, 91, 0.10)',

  // Text
  textPrimary: '#F1EBE0',
  textSecondary: '#A39A8C',
  textTertiary: '#6F675C',
  textOnGold: '#1A160F',

  // Semantic
  success: '#7FB08A',
  error: '#D98B8B',
};

export const typography = {
  fontFamilyHeading: 'Georgia, "Times New Roman", serif',
  fontFamilyBody:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',

  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 22,
    xl: 28,
    xxl: 36,
    hero: 52,
  },

  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Tracking for uppercase micro-labels
  trackingWide: 1.5,
  trackingWider: 2.5,
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 3,
  },
  raised: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 24,
    elevation: 6,
  },
};
