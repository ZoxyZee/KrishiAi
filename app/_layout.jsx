import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Landing screen (no tabs) */}
      <Stack.Screen name="splash" />

      {/* Tab screens group */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
