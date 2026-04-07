/**
 * Web override for @react-navigation/stack CardContent.
 *
 * The default CardContent uses `minHeight: '100%'` when the stack fills the
 * viewport, which lets the document body handle scrolling. That breaks React
 * Native ScrollView components because the card grows unboundedly and the
 * scroll container always matches its content height (nothing to scroll).
 *
 * This override always uses `flex: 1, overflow: hidden` so the card is
 * bounded by the viewport, and ScrollView components work correctly inside it.
 */
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { jsx as _jsx } from 'react/jsx-runtime';

export function CardContent({ enabled, layout, style, ...rest }) {
  return _jsx(View, {
    ...rest,
    pointerEvents: 'box-none',
    style: [styles.card, style],
  });
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: 'hidden',
  },
});
