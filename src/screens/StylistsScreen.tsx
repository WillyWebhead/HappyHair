import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MOCK_STYLISTS } from '../data/stylists';
import StylistCard from '../components/StylistCard';
import { colors, spacing, typography } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Stylists'>;
};

export default function StylistsScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.subtitle}>
        Each of our stylists brings a unique expertise.{'\n'}Find the perfect match for your look.
      </Text>

      <View style={[styles.grid, { flexDirection: columns > 1 ? 'row' : 'column' }]}>
        {MOCK_STYLISTS.map(stylist => (
          <StylistCard
            key={stylist.id}
            stylist={stylist}
            onPress={() =>
              navigation.navigate('StylistDetail', { stylistId: stylist.id })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.size.base,
    textAlign: 'center',
    lineHeight: typography.size.base * 1.6,
    marginBottom: spacing.lg,
    marginHorizontal: spacing.md,
  },
  grid: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
