import { Stack } from "expo-router";

export default function stepsLayout() {
  return (
    <Stack>
      <Stack.Screen
        screenOptions={{
          headerShown: false,
        }}
        name="index"
      />
      <Stack.Screen
        name="steps/step1"
        options={{
          headerShown: true,
          headerTitle: "Pembayaran",
        }}
      />
    </Stack>
  );
}
