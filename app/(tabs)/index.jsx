// import { View, Text, Button } from "react-native";
// import { useRouter } from "expo-router";

// export default function Home() {
//   const router = useRouter();

//   return (
//     <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
//       <Text style={{ fontSize:24, marginBottom:20 }}>Hello World 👋</Text>
//       <Button title="Go to Login" onPress={() => router.push("/login")} />
//       <Button title="Go to About" onPress={() => router.push("/about")} />
//       <Button title="Go to Profile" onPress={() => router.push("/profile")} />
//     </View>
//   );
// }


import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import WeatherCard from "../components/WeatherCard";

const { width } = Dimensions.get('window');

const FarmDashboard = () => {
  const [currentWeather] = useState({
    location: 'Current location',
    temperature: 27,
    humidity: 12,
    rain: '10mm',
    condition: 'Sunny'
  });

  const [recommendations] = useState([
    {
      icon: '💧',
      text: 'Moisture low → irrigate today evening',
      type: 'urgent'
    },
    {
      icon: '🐛',
      text: 'Pest outbreak nearby → inspect brinjal crop',
      type: 'warning'
    },
    {
      icon: '🛡️',
      text: 'Maintain soil health → Add bio-fertilizer',
      type: 'advice'
    },
    {
      icon: '📈',
      text: 'Tomato price rising → Harvest early batch',
      type: 'opportunity'
    }
  ]);

  const [fieldReport] = useState([
    { label: 'Soil health', value: 90, color: '#4CAF50' },
    { label: 'Nutrients', value: 80, color: '#2196F3' },
    { label: 'Moisture', value: 75, color: '#FF9800' },
    { label: 'Rainfall', value: 50, color: '#9C27B0' }
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
            {/* Background circle */}
            <Circle
              stroke="#E5E7EB"
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
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

  const WeatherIcon = () => (
    <View style={styles.weatherIcon}>
      <View style={styles.sunIcon}>
        <View style={styles.sunCore} />
        <View style={[styles.sunRay, styles.sunRay1]} />
        <View style={[styles.sunRay, styles.sunRay2]} />
        <View style={[styles.sunRay, styles.sunRay3]} />
        <View style={[styles.sunRay, styles.sunRay4]} />
      </View>
    </View>
  );

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E8F4F8" barStyle="dark-content" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>
                Namaskaram, <Text style={styles.nameHighlight}>Rajan!</Text> 👋
              </Text>
              <Text style={styles.subGreeting}>Here's today's update for your farm</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.iconText}>🔔</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconButton, styles.profileButton]}>
                <Text style={styles.iconText} >👤</Text>
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
          {/* <View style={styles.weatherCard}>
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
                  <Text style={styles.locationText}>{currentWeather.location}</Text>
                </View>
                <Text style={styles.temperature}>{currentWeather.temperature}°C</Text>
                <View style={styles.weatherDetails}>
                  <Text style={styles.weatherDetail}>💧 Hum: {currentWeather.humidity}%</Text>
                  <Text style={styles.weatherDetail}>🌧️ Rain: {currentWeather.rain}</Text>
                </View>
              </View>
              <View style={styles.weatherIconContainer}>
                <WeatherIcon />
                <Text style={styles.conditionText}>{currentWeather.condition}</Text>
              </View>
            </View>
          </View> */}
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

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <View style={styles.navItems}>
            {/* <View style={styles.navItem}>
              <Text style={styles.navIcon}>📅</Text>
              <Text style={styles.navLabel}>Crop Calendar</Text>
            </View>
            
            <View style={styles.navItem}>
              <Text style={styles.navIcon}>📊</Text>
              <Text style={styles.navLabel}>Log Activity</Text>
            </View>
            
            <View style={styles.navItem}>
              <Text style={styles.navIcon}>📈</Text>
              <Text style={styles.navLabel}>Market Prices</Text>
            </View> */}
            
            <View style={styles.navItem}>
              <View style={[styles.navCircle, styles.micButton]}>
                <Text style={styles.navCircleIcon}>🎤</Text>
              </View>
            </View>
            
            <View style={styles.navItem}>
              <View style={[styles.navCircle, styles.messageButton]}>
                <Text style={styles.navCircleIcon}>💬</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
  



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  nameHighlight: {
    color: '#FF9800',
  },
  subGreeting: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  profileButton: {
    backgroundColor: '#E3F2FD',
  },
  iconText: {
    fontSize: 16,
  },
  schemeBanner: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  schemeContent: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  schemeTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  schemeSubtitle: {
    color: 'white',
    fontSize: 10,
    opacity: 0.9,
  },
  schemeArrow: {
    color: 'white',
    fontSize: 16,
  },
  weatherContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  weatherCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  forecastButton: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherInfo: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  weatherDetails: {
    flexDirection: 'row',
  },
  weatherDetail: {
    fontSize: 12,
    color: '#666',
    marginRight: 16,
  },
  weatherIconContainer: {
    alignItems: 'center',
  },
  weatherIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  sunIcon: {
    width: 32,
    height: 32,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunCore: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFC107',
  },
  sunRay: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFD54F',
  },
  sunRay1: { top: -2, left: 14 },
  sunRay2: { bottom: -2, left: 14 },
  sunRay3: { top: 14, left: -2 },
  sunRay4: { top: 14, right: -2 },
  conditionText: {
    fontSize: 12,
    color: '#666',
  },
  recommendationsContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  recommendationsList: {
    marginTop: 12,
  },
  recommendationItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  recommendationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  recommendationIcon: {
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
  },
  recommendationText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
  fieldReportContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  fieldReportCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  progressContainer: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 20,
  },
  progressCircle: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSvg: {
    transform: [{ rotate: '0deg' }],
  },
  progressText: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  progressValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  bottomNav: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 10,
    color: '#666',
  },
  navCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  micButton: {
    backgroundColor: '#2196F3',
  },
  messageButton: {
    backgroundColor: '#666',
  },
  navCircleIcon: {
    fontSize: 16,
  },
});

export default FarmDashboard;