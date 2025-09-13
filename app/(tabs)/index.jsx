import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import WeatherCard from "../components/WeatherCard";

const { width } = Dimensions.get("window");

const FarmDashboard = () => {
  const [recommendations] = useState([
    {
      icon: "💧",
      text: "Moisture low → irrigate today evening",
      type: "urgent",
    },
    {
      icon: "🐛",
      text: "Pest outbreak nearby → inspect brinjal crop",
      type: "warning",
    },
    {
      icon: "🛡️",
      text: "Maintain soil health → Add bio-fertilizer",
      type: "advice",
    },
    {
      icon: "📈",
      text: "Tomato price rising → Harvest early batch",
      type: "opportunity",
    },
  ]);

  const [fieldReport] = useState([
    { label: "Soil health", value: 90, color: "#4CAF50" },
    { label: "Nutrients", value: 80, color: "#2196F3" },
    { label: "Moisture", value: 75, color: "#FF9800" },
    { label: "Rainfall", value: 50, color: "#9C27B0" },
  ]);

  const CircularProgress = ({ value, color, label }) => {
    const size = 80;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressCircle}>
          <Svg width={size} height={size} style={styles.progressSvg}>
            <Circle
              stroke="#E5E7EB"
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <Circle
              stroke={color}
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
          <View style={styles.progressText}>
            <Text style={styles.progressValue}>{value}%</Text>
          </View>
        </View>
        <Text style={styles.progressLabel}>{label}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E8F4F8" barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>
                Namaaskaram, <Text style={styles.nameHighlight}>Rajan!</Text> 👋
              </Text>
              <Text style={styles.subGreeting}>
                Here's today's update for your farm
              </Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.iconText}>🔔</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconButton, styles.profileButton]}
              >
                <Text style={styles.iconText}>👤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Government Schemes Banner */}
        <TouchableOpacity style={styles.schemeBanner}>
          <View style={styles.schemeContent}>
            <View>
              <Text style={styles.schemeTitle}>GOVT. SCHEMES</Text>
              <Text style={styles.schemeSubtitle}>Check Now</Text>
            </View>
            <Text style={styles.schemeArrow}>▶</Text>
          </View>
          
        </TouchableOpacity>

        {/* Current Weather */}
        <View style={styles.weatherContainer}>
          <WeatherCard />
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsContainer}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <View style={styles.recommendationsList}>
            {recommendations.map((rec, index) => (
              <View key={index} style={styles.recommendationItem}>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationIcon}>{rec.icon}</Text>
                  <Text style={styles.recommendationText}>{rec.text}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Field Report */}
        <View style={styles.fieldReportContainer}>
          <Text style={styles.sectionTitle}>Field Report</Text>
          <View style={styles.fieldReportCard}>
            <View style={styles.progressGrid}>
              {fieldReport.map((item, index) => (
                <CircularProgress
                  key={index}
                  value={item.value}
                  color={item.color}
                  label={item.label}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Buttons */}
      <View style={styles.floatingButtonsContainer}>
        <TouchableOpacity style={[styles.navCircle, styles.micButton]}>
          <Text style={styles.navCircleIcon}>🎤</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navCircle, styles.messageButton]}>
          <Text style={styles.navCircleIcon}>💬</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E8F4F8" },
  scrollView: { flex: 1 },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 45,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingContainer: { flex: 1 },
  greeting: { fontSize: 18, fontWeight: "bold", color: "#333" },
  nameHighlight: { color: "#FF9800" },
  subGreeting: { fontSize: 12, color: "#666", marginTop: 2 },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  profileButton: { backgroundColor: "#E3F2FD" },
  iconText: { fontSize: 16 },
  schemeBanner: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  schemeContent: {
    backgroundColor: "#FF9800",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  schemeTitle: { color: "white", fontSize: 14, fontWeight: "bold" },
  schemeSubtitle: { color: "white", fontSize: 10, opacity: 0.9 },
  schemeArrow: { color: "white", fontSize: 16 },
  weatherContainer: { marginHorizontal: 16, marginTop: 16 },
  recommendationsContainer: { marginHorizontal: 16, marginTop: 16 },
  recommendationsList: { marginTop: 12 },
  recommendationItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  recommendationContent: { flexDirection: "row", alignItems: "flex-start" },
  recommendationIcon: { fontSize: 16, marginRight: 12 },
  recommendationText: { fontSize: 14, color: "#333", flex: 1 },
  fieldReportContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  fieldReportCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  progressGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  progressContainer: { alignItems: "center", width: "48%", marginBottom: 20 },
  progressCircle: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  progressSvg: { transform: [{ rotate: "0deg" }] },
  progressText: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  progressValue: { fontSize: 16, fontWeight: "bold", color: "#333" },
  progressLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  navCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  micButton: { backgroundColor: "#2196F3" },
  messageButton: { backgroundColor: "#FF5722" },
  navCircleIcon: { fontSize: 20, color: "white" },
  floatingButtonsContainer: {
    position: "absolute",
    bottom: 20,
    right: 30,
    alignItems: "center",
  },
});

export default FarmDashboard;
