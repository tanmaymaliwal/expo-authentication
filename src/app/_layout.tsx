import { Stack } from "expo-router";
import { AuthProvider } from "@/context/auth-context";
export default function RootLayout() {
  const isLoggedIn = false; // Replace with your actual authentication logic
  return (
  <AuthProvider>

  <Stack screenOptions={{headerShown:false}}>

    <Stack.Protected guard={isLoggedIn}>
      <Stack.Screen name="index" />
    </Stack.Protected>

    <Stack.Protected guard={!isLoggedIn}>
      <Stack.Screen name="login" />
    </Stack.Protected>

  </Stack >;

  </AuthProvider>)

}
