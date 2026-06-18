import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";

const ProfilePage = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Pre-filled Farmer Profile
  const [farmerProfile, setFarmerProfile] = useState({
    name: "Rajan Kumar",
    phone: "+91 9876543210",
    email: "rajan.kumar@gmail.com",
    address: "Village Kollam, Kerala",
    age: "45",
    experience: "20",
    education: "High School",
  });

  // Pre-filled Farm Profile
  const [farmProfile, setFarmProfile] = useState({
    farmName: "Rajan's Green Farm",
    location: "Kollam, Telangana",
    landSize: "5.5",
    soilType: "Black Cotton Soil",
    irrigationType: "Drip Irrigation",
    primaryCrop: "Rice",
    secondaryCrops: "Tomato, Brinjal, Onion",
    season: "Kharif",
    waterSource: "Borewell",
  });

  const handleInputChange = (section, field, value) => {
    if (section === "farmer") {
      setFarmerProfile({ ...farmerProfile, [field]: value });
    } else {
      setFarmProfile({ ...farmProfile, [field]: value });
    }
  };

  const saveProfile = () => {
    // Here you can add API call to save profile
    Alert.alert("Success", "Profile updated successfully!", [
      { text: "OK", onPress: () => setIsEditing(false) },
    ]);
  };

  const ProfileSection = ({ title, children }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );

  const InfoField = ({ label, value, onChangeText, placeholder, keyboardType = "default", multiline = false }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={[styles.textInput, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          multiline={multiline}
          placeholderTextColor="#666"
        />
      ) : (
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{value || "Not specified"}</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F8FDF8" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => (isEditing ? saveProfile() : setIsEditing(true))}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👨‍🌾</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{farmerProfile.name}</Text>
            <Text style={styles.profileSubtitle}>
              Farmer • {farmerProfile.experience} years experience
            </Text>
            <Text style={styles.profileLocation}>📍 {farmProfile.location}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{farmProfile.landSize}</Text>
            <Text style={styles.statLabel}>Acres</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{farmerProfile.experience}</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Crops</Text>
          </View>
        </View>

        {/* Personal Information */}
        <ProfileSection title="👨‍🌾 Personal Information">
          <InfoField
            label="Full Name"
            value={farmerProfile.name}
            onChangeText={(value) => handleInputChange("farmer", "name", value)}
            placeholder="Enter your full name"
          />
          <View style={styles.rowContainer}>
            <View style={styles.halfWidth}>
              <InfoField
                label="Age"
                value={farmerProfile.age}
                onChangeText={(value) => handleInputChange("farmer", "age", value)}
                placeholder="Age"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfWidth}>
              <InfoField
                label="Experience"
                value={farmerProfile.experience + " years"}
                onChangeText={(value) => handleInputChange("farmer", "experience", value.replace(" years", ""))}
                placeholder="Years of experience"
                keyboardType="numeric"
              />
            </View>
          </View>
          <InfoField
            label="Education"
            value={farmerProfile.education}
            onChangeText={(value) => handleInputChange("farmer", "education", value)}
            placeholder="Education level"
          />
        </ProfileSection>

        {/* Contact Information */}
        <ProfileSection title="📞 Contact Information">
          <InfoField
            label="Phone Number"
            value={farmerProfile.phone}
            onChangeText={(value) => handleInputChange("farmer", "phone", value)}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
          <InfoField
            label="Email Address"
            value={farmerProfile.email}
            onChangeText={(value) => handleInputChange("farmer", "email", value)}
            placeholder="Enter email address"
            keyboardType="email-address"
          />
          <InfoField
            label="Address"
            value={farmerProfile.address}
            onChangeText={(value) => handleInputChange("farmer", "address", value)}
            placeholder="Enter your address"
            multiline={true}
          />
        </ProfileSection>

        {/* Farm Information */}
        <ProfileSection title="🌾 Farm Details">
          <InfoField
            label="Farm Name"
            value={farmProfile.farmName}
            onChangeText={(value) => handleInputChange("farm", "farmName", value)}
            placeholder="Enter farm name"
          />
          <InfoField
            label="Farm Location"
            value={farmProfile.location}
            onChangeText={(value) => handleInputChange("farm", "location", value)}
            placeholder="Enter farm location"
          />
          <View style={styles.rowContainer}>
            <View style={styles.halfWidth}>
              <InfoField
                label="Land Size"
                value={farmProfile.landSize + " acres"}
                onChangeText={(value) => handleInputChange("farm", "landSize", value.replace(" acres", ""))}
                placeholder="Land size"
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.halfWidth}>
              <InfoField
                label="Soil Type"
                value={farmProfile.soilType}
                onChangeText={(value) => handleInputChange("farm", "soilType", value)}
                placeholder="Soil type"
              />
            </View>
          </View>
          <InfoField
            label="Irrigation Type"
            value={farmProfile.irrigationType}
            onChangeText={(value) => handleInputChange("farm", "irrigationType", value)}
            placeholder="Irrigation method"
          />
          <InfoField
            label="Water Source"
            value={farmProfile.waterSource}
            onChangeText={(value) => handleInputChange("farm", "waterSource", value)}
            placeholder="Water source"
          />
        </ProfileSection>

        {/* Crop Information */}
        <ProfileSection title="🌱 Crop Information">
          <InfoField
            label="Primary Crop"
            value={farmProfile.primaryCrop}
            onChangeText={(value) => handleInputChange("farm", "primaryCrop", value)}
            placeholder="Main crop"
          />
          <InfoField
            label="Secondary Crops"
            value={farmProfile.secondaryCrops}
            onChangeText={(value) => handleInputChange("farm", "secondaryCrops", value)}
            placeholder="Other crops (comma separated)"
            multiline={true}
          />
          <InfoField
            label="Growing Season"
            value={farmProfile.season}
            onChangeText={(value) => handleInputChange("farm", "season", value)}
            placeholder="Main growing season"
          />
        </ProfileSection>

        {/* Action Buttons */}
        {!isEditing && (
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>📋</Text>
              <Text style={styles.actionButtonText}>View Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>🌾</Text>
              <Text style={styles.actionButtonText}>Crop History</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FDF8", // Very light green agricultural background
  },
  header: {
    backgroundColor: "#FFFEF7", // Light yellow background
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50", // Green border
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFEF7", // Light yellow background
    borderWidth: 2,
    borderColor: "#4CAF50", // Green outline
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 18,
    color: "#000", // Black text
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // Black text
  },
  editButton: {
    backgroundColor: "#4CAF50", // Green agricultural color
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#388E3C", // Darker green outline
  },
  editButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: "#FFFEF7", // Light yellow background
    margin: 16,
    borderWidth: 2,
    borderColor: "#4CAF50", // Green outline
    borderRadius: 12,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFFEF7", // Light yellow background
    borderWidth: 2,
    borderColor: "#4CAF50", // Green outline
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000", // Black text
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: "#000", // Black text
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 14,
    color: "#000", // Black text
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: "#FFFEF7", // Light yellow background
    borderWidth: 2,
    borderColor: "#4CAF50", // Green outline
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000", // Black text
  },
  statLabel: {
    fontSize: 12,
    color: "#000", // Black text
    marginTop: 4,
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // Black text
    marginBottom: 8,
  },
  sectionCard: {
    backgroundColor: "#FFFEF7", // Light yellow background
    borderWidth: 2,
    borderColor: "#4CAF50", // Green outline
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000", // Black text
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#4CAF50", // Green outline
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#000", // Black text
    backgroundColor: "#FFFEF7", // Light yellow background
  },
  multilineInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  valueContainer: {
    borderWidth: 2,
    borderColor: "#4CAF50", // Green outline
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFFEF7", // Light yellow background
  },
  valueText: {
    fontSize: 14,
    color: "#000", // Black text
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#FFFEF7", // Light yellow background
    borderWidth: 2,
    borderColor: "#4CAF50", // Green outline
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtonIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: "#000", // Black text
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ProfilePage;