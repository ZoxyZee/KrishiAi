// import { View, Text } from "react-native";

// export default function Login() {
//   return (
//     <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
//       <Text style={{ fontSize:20 }}>🔑 Login Page</Text>
//     </View>
//   );
// }


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  Calendar,
  Sprout,
  Droplets,
  Sun,
  Scissors,
} from "lucide-react-native";

const CropCalendar = () => {
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const cropData = {
    wheat: {
      name: "Wheat",
      color: "#EAB308",
      activities: {
        2: [{ type: "irrigation", name: "Spring Irrigation" }],
        3: [{ type: "fertilizer", name: "Spring Fertilizer" }],
        4: [{ type: "harvest", name: "Harvest" }],
        8: [{ type: "planting", name: "Seed Preparation" }],
        9: [{ type: "planting", name: "Sowing" }],
        10: [{ type: "irrigation", name: "First Irrigation" }],
        11: [{ type: "fertilizer", name: "Winter Fertilizer" }],
      },
    },
    rice: {
      name: "Rice",
      color: "#22C55E",
      activities: {
        2: [{ type: "planting", name: "Nursery Preparation" }],
        3: [{ type: "planting", name: "Transplanting" }],
        4: [{ type: "irrigation", name: "Flooding Fields" }],
        5: [{ type: "fertilizer", name: "Growth Fertilizer" }],
        6: [{ type: "irrigation", name: "Water Management" }],
        7: [{ type: "fertilizer", name: "Grain Filling" }],
        8: [{ type: "harvest", name: "Harvest" }],
      },
    },
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "planting":
        return <Sprout size={16} color="green" />;
      case "irrigation":
        return <Droplets size={16} color="blue" />;
      case "fertilizer":
        return <Sun size={16} color="orange" />;
      case "harvest":
        return <Scissors size={16} color="red" />;
      default:
        return <Calendar size={16} color="gray" />;
    }
  };

  const currentCropData = cropData[selectedCrop];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Calendar size={28} color="green" />
        <Text style={styles.title}>Agricultural Crop Calendar</Text>
      </View>

      {/* Crop Selector */}
      <View style={styles.section}>
        <Text style={styles.label}>Select Crop:</Text>
        <View style={styles.row}>
          {Object.entries(cropData).map(([key, crop]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setSelectedCrop(key)}
              style={[
                styles.cropButton,
                selectedCrop === key && {
                  backgroundColor: crop.color,
                },
              ]}
            >
              <Text
                style={{
                  color: selectedCrop === key ? "white" : "black",
                  fontWeight: "600",
                }}
              >
                {crop.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Calendar Grid */}
      <View style={styles.grid}>
        {months.map((month, index) => {
          const activities = currentCropData.activities[index] || [];
          const isCurrentMonth = index === selectedMonth;

          return (
            <TouchableOpacity
              key={month}
              style={[
                styles.monthBox,
                isCurrentMonth && { borderColor: "blue", backgroundColor: "#E0F2FE" },
                activities.length > 0 && { borderColor: "green" },
              ]}
              onPress={() => setSelectedMonth(index)}
            >
              <Text style={styles.monthName}>{month}</Text>
              {activities.length > 0 ? (
                activities.map((activity, idx) => (
                  <View key={idx} style={styles.activityRow}>
                    {getActivityIcon(activity.type)}
                    <Text style={styles.activityText}>{activity.name}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noActivity}>No activities</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Selected Month Details */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>
          {months[selectedMonth]} - {currentCropData.name} Activities
        </Text>
        {currentCropData.activities[selectedMonth]?.length > 0 ? (
          currentCropData.activities[selectedMonth].map((activity, idx) => (
            <View key={idx} style={styles.detailBox}>
              <View style={styles.activityRow}>
                {getActivityIcon(activity.type)}
                <Text style={styles.detailTitle}>{activity.name}</Text>
              </View>
              <Text style={styles.detailType}>Type: {activity.type}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noActivity}>
            No activities scheduled for {months[selectedMonth]}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginLeft: 8 },
  section: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  cropButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginRight: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  monthBox: {
    width: "48%",
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
  },
  monthName: { fontWeight: "600", marginBottom: 4 },
  activityRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
  activityText: { fontSize: 12 },
  noActivity: { color: "gray", fontSize: 12 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  detailBox: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "white",
    borderColor: "#D1D5DB",
  },
  detailTitle: { fontWeight: "600", marginLeft: 6 },
  detailType: { fontSize: 12, color: "gray", marginTop: 4 },
});

export default CropCalendar;
