import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { gradients } from '@/theme';

interface Props {
  children: ReactNode;
  edges?: Edge[];
}

/** Every screen sits on the same soft white → blush wash. */
export function Screen({ children, edges = ['top'] }: Props) {
  return (
    <View className="flex-1 bg-blush-50">
      <StatusBar style="dark" />
      <LinearGradient colors={gradients.screen} style={StyleSheet.absoluteFill} />
      <SafeAreaView edges={edges} className="flex-1">
        {children}
      </SafeAreaView>
    </View>
  );
}
