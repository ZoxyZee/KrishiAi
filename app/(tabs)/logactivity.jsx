import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  StatusBar,
  Modal,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LogFarmActivity = () => {
  const navigation = useNavigation();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState("Select Crop");
  const [selectedField, setSelectedField] = useState("Select Field");
  const [isCropDropdownVisible, setIsCropDropdownVisible] = useState(false);
  const [isFieldDropdownVisible, setIsFieldDropdownVisible] = useState(false);
  const [activityLogs, setActivityLogs] = useState([]);

  const activities = [
    {
      id: "sowing",
      name: "Sowing",
      icon: "🌱",
      description: "Plant seeds in the farm",
    },
    {
      id: "irrigation",
      name: "Irrigation",
      icon: "💧",
      description: "Water the crops",
    },
    {
      id: "fertilizers",
      name: "Fertilizers/\nPesticides",
      icon: "🧪",
      description: "Apply fertilizers or pesticides",
    },
    {
      id: "harvest",
      name: "Harvest",
      icon: "🌾",
      description: "Harvest mature crops",
    },
  ];

  const fields = ["Field 1", "Field 2", "Field 3", "Field 4", "Field 5"];
  const crops = [
    "Rice",
    "Wheat",
    "Sugarcane",
    "Cotton",
    "Maize",
    "Barley",
    "Pulses",
    "Vegetables",
  ];

  const handleActivityPress = (activityId) => {
    setSelectedActivity(activityId);
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert("Exit App", "Do you want to exit the application?", [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", onPress: () => console.log("App exit requested") },
      ]);
    }
  };

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
    setIsCropDropdownVisible(false);
  };

  const handleFieldSelect = (field) => {
    setSelectedField(field);
    setIsFieldDropdownVisible(false);
  };

  const handleSubmit = () => {
    if (!selectedActivity) {
      Alert.alert(
        "No Activity Selected",
        "Please select an activity before proceeding."
      );
      return;
    }

    if (selectedCrop === "Select Crop") {
      Alert.alert(
        "No Crop Selected",
        "Please select a crop before proceeding."
      );
      return;
    }

    if (selectedField === "Select Field") {
      Alert.alert(
        "No Field Selected",
        "Please select a field before proceeding."
      );
      return;
    }

    const selectedActivityName = activities.find(
      (activity) => activity.id === selectedActivity
    )?.name;
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();

    const newLog = {
      id: Date.now().toString(),
      activity: selectedActivityName,
      crop: selectedCrop,
      field: selectedField,
      timestamp: timestamp,
      date: currentDate.toDateString(),
    };

    setActivityLogs((prevLogs) => [newLog, ...prevLogs]);

    Alert.alert(
      "Activity Logged Successfully!",
      `Activity: ${selectedActivityName}\nField: ${selectedField}\nCrop: ${selectedCrop}\nTime: ${timestamp}`,
      [
        {
          text: "OK",
          onPress: () => {
            // Reset selections after successful submission
            setSelectedActivity(null);
            setSelectedCrop("Select Crop");
            setSelectedField("Select Field");
            console.log("Farm activity logged:", newLog);
          },
        },
      ]
    );
  };

  const renderActivityButton = (activity) => {
    const isSelected = selectedActivity === activity.id;

    return (
      <TouchableOpacity
        key={activity.id}
        style={[
          styles.activityButton,
          isSelected && styles.selectedActivityButton,
        ]}
        onPress={() => handleActivityPress(activity.id)}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{activity.icon}</Text>
        </View>
        <Text
          style={[
            styles.activityText,
            isSelected && styles.selectedActivityText,
          ]}
        >
          {activity.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderLogItem = ({ item }) => (
    <View style={styles.logItem}>
      <View style={styles.logHeader}>
        <Text style={styles.logActivity}>{item.activity}</Text>
        <Text style={styles.logDate}>{item.date}</Text>
      </View>
      <Text style={styles.logField}>Field: {item.field}</Text>
      <Text style={styles.logCrop}>Crop: {item.crop}</Text>
      <Text style={styles.logTimestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />

      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log Farm Activity</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Activity Grid */}
        <View style={styles.content}>
          <View style={styles.activitiesGrid}>
            {activities.map((activity) => renderActivityButton(activity))}
          </View>

          {/* Field Dropdown */}
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select Field:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setIsFieldDropdownVisible(true)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dropdownText,
                  selectedField === "Select Field" && styles.placeholderText,
                ]}
              >
                {selectedField}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Crop Dropdown */}
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select Crop:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setIsCropDropdownVisible(true)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dropdownText,
                  selectedCrop === "Select Crop" && styles.placeholderText,
                ]}
              >
                {selectedCrop}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!selectedActivity || 
               selectedCrop === "Select Crop" || 
               selectedField === "Select Field") &&
                styles.disabledSubmitButton,
            ]}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Activity Logs */}
      <View style={styles.logsContainer}>
        <Text style={styles.logsTitle}>Activity Logs</Text>
        {activityLogs.length === 0 ? (
          <View style={styles.noLogsContainer}>
            <Text style={styles.noLogsText}>No activities logged yet</Text>
          </View>
        ) : (
          <FlatList
            data={activityLogs}
            renderItem={renderLogItem}
            keyExtractor={(item) => item.id}
            style={styles.logsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Selected Activity Indicator */}
      {selectedActivity && (
        <View style={styles.selectionCounter}>
          <Text style={styles.selectionCounterText}>
            {
              activities.find((activity) => activity.id === selectedActivity)
                ?.name
            }{" "}
            selected
          </Text>
        </View>
      )}

      {/* Field Dropdown Modal */}
      <Modal
        visible={isFieldDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsFieldDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsFieldDropdownVisible(false)}
        >
          <View style={styles.dropdownModal}>
            <Text style={styles.modalTitle}>Select Field</Text>
            <ScrollView style={styles.optionList}>
              {fields.map((field, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    selectedField === field && styles.selectedOption,
                  ]}
                  onPress={() => handleFieldSelect(field)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedField === field && styles.selectedOptionText,
                    ]}
                  >
                    {field}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Crop Dropdown Modal */}
      <Modal
        visible={isCropDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCropDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsCropDropdownVisible(false)}
        >
          <View style={styles.dropdownModal}>
            <Text style={styles.modalTitle}>Select Crop</Text>
            <ScrollView style={styles.optionList}>
              {crops.map((crop, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    selectedCrop === crop && styles.selectedOption,
                  ]}
                  onPress={() => handleCropSelect(crop)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedCrop === crop && styles.selectedOptionText,
                    ]}
                  >
                    {crop}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8B7ED8",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 20,
  },
  activitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  activityButton: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#FFF3A0",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedActivityButton: {
    backgroundColor: "#E6F3FF",
    borderColor: "#8B7ED8",
  },
  iconContainer: {
    marginBottom: 10,
  },
  iconText: {
    fontSize: 40,
  },
  activityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    lineHeight: 18,
  },
  selectedActivityText: {
    color: "#8B7ED8",
  },
  dropdownContainer: {
    marginBottom: 30,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    color: "#999",
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666",
  },
  submitButton: {
    backgroundColor: "#8B7ED8",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 30,
  },
  disabledSubmitButton: {
    backgroundColor: "#ccc",
    elevation: 1,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectionCounter: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "rgba(139, 126, 216, 0.9)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  selectionCounterText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownModal: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "80%",
    maxHeight: "60%",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  optionList: {
    maxHeight: 300,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedOption: {
    backgroundColor: "#E6F3FF",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOptionText: {
    color: "#8B7ED8",
    fontWeight: "600",
  },
  logsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  noLogsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 1,
  },
  noLogsText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  logsList: {
    maxHeight: 200,
  },
  logItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  logActivity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8B7ED8",
  },
  logDate: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  logField: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  logCrop: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  logTimestamp: {
    fontSize: 12,
    color: "#999",
  },
});

export default LogFarmActivity;