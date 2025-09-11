import { View, Text, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/splash.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.tagline}>From ideas to reality ♡</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  logo: { width: 200, height: 200, marginBottom: 40 },
  tagline: { fontSize: 14, color: "gray", position: "absolute", bottom: 40 }
});
