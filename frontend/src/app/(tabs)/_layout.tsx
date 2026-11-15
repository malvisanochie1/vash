import { Redirect, Tabs } from 'expo-router';
import type { BottomTabNavigationOptions } from 'expo-router/tabs';
import { Dimensions, Easing } from 'react-native';
import { TabBar } from '@/components/layout/TabBar';
import { useAuthStore } from '@/features/auth/auth.store';

/** Tabs slide horizontally, in the direction of the tab you pick. */
const slideBetweenTabs: NonNullable<BottomTabNavigationOptions['sceneStyleInterpolator']> = ({ current }) => {
  const width = Dimensions.get('window').width;
  return {
    sceneStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({ inputRange: [-1, 0, 1], outputRange: [-width, 0, width] }),
        },
      ],
    },
  };
};

const slideSpec = {
  animation: 'timing' as const,
  config: { duration: 560, easing: Easing.bezier(0.65, 0, 0.35, 1) },
} satisfies BottomTabNavigationOptions['transitionSpec'];

export default function TabsLayout() {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Redirect href="/login" />;

  return (
    <>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          lazy: false,
          sceneStyleInterpolator: slideBetweenTabs,
          transitionSpec: slideSpec,
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="shop" />
        <Tabs.Screen name="favorites" />
        <Tabs.Screen name="bag" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </>
  );
}
