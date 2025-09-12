import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
// import WeatherIcon from "./WeatherIcon"; 
import { getWeatherByCoords } from "../services/weatherService";

const WeatherCard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchWeather = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission denied");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const weatherData = await getWeatherByCoords(latitude, longitude);

      setCurrentWeather({
        location: weatherData.name,
        temperature: Math.round(weatherData.main.temp),
        humidity: weatherData.main.humidity,
        rain: weatherData.rain ? `${weatherData.rain["1h"]} mm` : "0 mm",
        condition: weatherData.weather[0].main,
      });
    } catch (error) {
      console.error("Weather fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchWeather();
}, []);

  if (loading || !currentWeather) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading weather...</Text>
      </View>
    );
  }

  return (
    // ⬇️ Your original component with dynamic data inserted
    <View style={styles.weatherContainer}>
      <View style={styles.weatherCard}>
        <View style={styles.weatherHeader}>
          <Text style={styles.sectionTitle}>Current Weather</Text>
          <TouchableOpacity>
            <Text style={styles.forecastButton}>View Forecast</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weatherContent}>
          <View style={styles.weatherInfo}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>{currentWeather.location }</Text>
            </View>
            <Text style={styles.temperature}>
              {currentWeather.temperature}°C
            </Text>
            <View style={styles.weatherDetails}>
              <Text style={styles.weatherDetail}>
                💧 Hum: {currentWeather.humidity}%
              </Text>
              <Text style={styles.weatherDetail}>
                🌧️ Rain: {currentWeather.rain}
              </Text>
            </View>
          </View>
          <View style={styles.weatherIconContainer}>
            {/* <WeatherIcon /> */}
            <Text style={styles.conditionText}>{currentWeather.condition}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F4F8",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  nameHighlight: {
    color: "#FF9800",
  },
  subGreeting: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  profileButton: {
    backgroundColor: "#E3F2FD",
  },
  iconText: {
    fontSize: 16,
  },
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
  schemeTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  schemeSubtitle: {
    color: "white",
    fontSize: 10,
    opacity: 0.9,
  },
  schemeArrow: {
    color: "white",
    fontSize: 16,
  },
  weatherContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  weatherCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  weatherHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  forecastButton: {
    fontSize: 12,
    color: "#2196F3",
    fontWeight: "500",
  },
  weatherContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherInfo: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    color: "#666",
  },
  temperature: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  weatherDetails: {
    flexDirection: "row",
  },
  weatherDetail: {
    fontSize: 12,
    color: "#666",
    marginRight: 16,
  },
  weatherIconContainer: {
    alignItems: "center",
  },
  weatherIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  sunIcon: {
    width: 32,
    height: 32,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  sunCore: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFC107",
  },
  sunRay: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFD54F",
  },
  sunRay1: { top: -2, left: 14 },
  sunRay2: { bottom: -2, left: 14 },
  sunRay3: { top: 14, left: -2 },
  sunRay4: { top: 14, right: -2 },
  conditionText: {
    fontSize: 12,
    color: "#666",
  },
  recommendationsContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  recommendationsList: {
    marginTop: 12,
  },
  recommendationItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  recommendationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  recommendationIcon: {
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
  },
  recommendationText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    lineHeight: 20,
  },
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
  progressContainer: {
    alignItems: "center",
    width: "48%",
    marginBottom: 20,
  },
  progressCircle: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  progressSvg: {
    transform: [{ rotate: "0deg" }],
  },
  progressText: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  progressValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  progressLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  bottomNav: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navItems: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 10,
    color: "#666",
  },
  navCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  micButton: {
    backgroundColor: "#2196F3",
  },
  messageButton: {
    backgroundColor: "#666",
  },
  navCircleIcon: {
    fontSize: 16,
  },
});

export default WeatherCard;
