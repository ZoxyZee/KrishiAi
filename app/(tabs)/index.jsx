import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text style={{ fontSize:24, marginBottom:20 }}>Hello World 👋</Text>
      <Button title="Go to Login" onPress={() => router.push("/login")} />
      <Button title="Go to About" onPress={() => router.push("/about")} />
      <Button title="Go to Profile" onPress={() => router.push("/profile")} />
    </View>
  );
}
