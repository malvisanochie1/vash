import { Redirect, Tabs } from 'expo-router';
import { TabBar } from '@/components/layout/TabBar';
import { useAuthStore } from '@/features/auth/auth.store';

export default function TabsLayout() {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Redirect href="/login" />;

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="shop" />
      <Tabs.Screen name="favorites" />
      <Tabs.Screen name="bag" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
