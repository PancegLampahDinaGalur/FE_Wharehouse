import { Stack } from "expo-router";

export default function stepsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Pembayaran",
        }}
      />
    </Stack>
  );
}
