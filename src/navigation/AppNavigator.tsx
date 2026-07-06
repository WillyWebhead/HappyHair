import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors, typography } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import StylistsScreen from '../screens/StylistsScreen';
import StylistDetailScreen from '../screens/StylistDetailScreen';
import BookingScreen from '../screens/BookingScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

export type RootStackParamList = {
  Home: undefined;
  Stylists: undefined;
  StylistDetail: { stylistId: string };
  Booking: { stylistId: string; serviceId?: string };
  Confirmation: {
    confirmationCode: string;
    stylistId: string;
    serviceId: string;
    date: string;
    time: string;
    customerName: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
            shadowColor: 'transparent',
            elevation: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.borderSubtle,
          },
          headerTintColor: colors.gold,
          headerTitleAlign: 'center',
          headerBackTitleStyle: { fontSize: typography.size.sm },
          headerTitleStyle: {
            color: colors.textPrimary,
            fontSize: typography.size.base,
            fontWeight: typography.weight.semibold,
            letterSpacing: 0.3,
          },
          cardStyle: { backgroundColor: colors.background },
          gestureEnabled: true,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Stylists"
          component={StylistsScreen}
          options={{ title: 'Our Stylists' }}
        />
        <Stack.Screen
          name="StylistDetail"
          component={StylistDetailScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{ title: 'Book an Appointment' }}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
