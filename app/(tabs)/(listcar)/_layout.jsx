import { Stack } from "expo-router";

export default function ListCarLayout() {
  return (
    <Stack>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="index"
      />
      <Stack.Screen
        name="details/[id]"
        options={{
          headerShown: true,
          headerTitle: "Detail Mobil",
        }}
      />
    </Stack>
  );
}
