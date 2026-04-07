export const colors = {
  // Base surfaces
  background: '#1A1A1A',
  surface: '#242424',
  surfaceRaised: '#2E2E2E',
  border: '#3A3A3A',

  // Accent — warm amber/gold
  gold: '#C9922A',
  goldLight: '#E6B85C',
  goldMuted: '#7A5818',

  // Text
  textPrimary: '#F5F0E8',
  textSecondary: '#A8A09A',
  textOnGold: '#1A1A1A',

  // Semantic
  success: '#4CAF6E',
  error: '#CF6679',
};

export const typography = {
  fontFamilyHeading: 'Georgia, serif',
  fontFamilyBody:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',

  size: {
    xs: 11,
    sm: 13,
    base: 16,
    md: 18,
    lg: 22,
    xl: 28,
    xxl: 36,
    hero: 48,
  },

  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
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
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
};
