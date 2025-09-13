import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CropCalendarPage = () => {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [selectedField, setSelectedField] = useState('field1');
  const [showFieldDropdown, setShowFieldDropdown] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('week3');

  // Sample field data
  const fieldData = {
    field1: {
      name: "North Field - 5 acres",
      location: "Block A",
      soilType: "Clay Loam",
      cropHistory: "Rice → Wheat → Rice"
    },
    field2: {
      name: "South Field - 3 acres", 
      location: "Block B",
      soilType: "Sandy Loam",
      cropHistory: "Wheat → Mustard → Wheat"
    },
    field3: {
      name: "East Field - 4 acres",
      location: "Block C", 
      soilType: "Loam",
      cropHistory: "Rice → Gram → Rice"
    }
  };

  // Sample crop data
  const cropData = {
    rice: {
      name: "Rice - Kerala Sona",
      category: "cereals",
      growthPeriod: 120,
      season: "kharif",
      waterRequirement: "high",
      soilPreference: ["clay", "clay-loam"],
      pHRange: { min: 5.5, max: 7.0 },
      expectedYield: { value: 25, unit: "quintals/acre" },
      marketPrice: { pricePerUnit: 2800, unit: "per quintal", currency: "INR" },
      fertilizers: [
        { name: "NPK 20-10-10", stage: "pre-sowing", quantity: 50, unit: "kg/acre" },
        { name: "Urea", stage: "vegetative", quantity: 25, unit: "kg/acre" },
        { name: "Potash", stage: "panicle initiation", quantity: 20, unit: "kg/acre" }
      ],
      commonPests: ["Brown Plant Hopper", "Stem Borer", "Leaf Folder"],
      commonDiseases: ["Blast", "Bacterial Blight", "Sheath Blight"],
      recommendations: ["Cowpea", "Green Gram", "Sesame (Til)"]
    },
    wheat: {
      name: "Wheat - HD 2967",
      category: "cereals",
      growthPeriod: 140,
      season: "rabi",
      waterRequirement: "medium",
      soilPreference: ["loam", "sandy-loam"],
      pHRange: { min: 6.0, max: 7.5 },
      expectedYield: { value: 30, unit: "quintals/acre" },
      marketPrice: { pricePerUnit: 2200, unit: "per quintal", currency: "INR" },
      fertilizers: [
        { name: "DAP", stage: "pre-sowing", quantity: 40, unit: "kg/acre" },
        { name: "Urea", stage: "tillering", quantity: 30, unit: "kg/acre" }
      ],
      commonPests: ["Aphids", "Termites", "Army Worm"],
      commonDiseases: ["Rust", "Bunt", "Loose Smut"],
      recommendations: ["Mustard", "Gram", "Pea"]
    }
  };

  const timelineData = {
    previous: { 
      crop: "Wheat", 
      period: "Nov 2023 - Apr 2025", 
      status: "Harvested", 
      yield: "28 quintals/acre",
      profit: "+15%" 
    },
    current: { 
      crop: "Rice - Kerala Sona", 
      period: "Jun 2025 - Oct 2025", 
      status: "Growing", 
      stage: "Flowering",
      daysLeft: 45 
    },
    future: { 
      crop: "Wheat (Recommended)", 
      period: "Nov 2025 - Apr 2025", 
      status: "Plan Next", 
      expectedYield: "30 quintals/acre" 
    }
  };

  // Weekly activities with status indicators
  const weeklyActivities = {
    week1: {
      period: "Jun 1-7, 2025",
      activities: [
        { 
          activity: 'Field Preparation', 
          type: 'preparation', 
          icon: 'construct-outline', 
          color: '#8B5CF6',
          status: 'completed',
          description: 'Plowing and leveling of field'
        },
        { 
          activity: 'Soil Testing', 
          type: 'testing', 
          icon: 'flask-outline', 
          color: '#06B6D4',
          status: 'completed',
          description: 'pH and nutrient analysis'
        }
      ]
    },
    week2: {
      period: "Jun 8-14, 2025",
      activities: [
        { 
          activity: 'Seed Treatment', 
          type: 'preparation', 
          icon: 'shield-outline', 
          color: '#F59E0B',
          status: 'completed',
          description: 'Fungicide and insecticide treatment'
        }
      ]
    },
    week3: {
      period: "Jun 15-21, 2025",
      activities: [
        { 
          activity: 'Sowing/Transplanting', 
          type: 'planting', 
          icon: 'flower-outline', 
          color: '#10B981',
          status: 'current',
          description: 'Rice seedling transplantation'
        }
      ]
    },
    week4: {
      period: "Jun 22-28, 2025",
      activities: [
        { 
          activity: 'First Irrigation', 
          type: 'irrigation', 
          icon: 'water-outline', 
          color: '#3B82F6',
          status: 'upcoming',
          description: 'Initial water supply after transplanting'
        }
      ]
    },
    week8: {
      period: "Jul 20-26, 2025",
      activities: [
        { 
          activity: 'First Fertilizer Application', 
          type: 'fertilizer', 
          icon: 'nutrition-outline', 
          color: '#F59E0B',
          status: 'upcoming',
          description: 'NPK 20-10-10 application'
        }
      ]
    },
    week12: {
      period: "Aug 17-23, 2025",
      activities: [
        { 
          activity: 'Pest Monitoring', 
          type: 'monitoring', 
          icon: 'eye-outline', 
          color: '#EF4444',
          status: 'upcoming',
          description: 'Check for brown plant hopper and stem borer'
        }
      ]
    },
    week16: {
      period: "Sep 14-20, 2025",
      activities: [
        { 
          activity: 'Second Fertilizer Application', 
          type: 'fertilizer', 
          icon: 'nutrition-outline', 
          color: '#F59E0B',
          status: 'upcoming',
          description: 'Urea application during vegetative stage'
        }
      ]
    },
    week18: {
      period: "Sep 28-Oct 4, 2025",
      activities: [
        { 
          activity: 'Harvest Preparation', 
          type: 'harvest', 
          icon: 'cut-outline', 
          color: '#DC2626',
          status: 'upcoming',
          description: 'Field inspection and harvesting tools preparation'
        }
      ]
    },
    week20: {
      period: "Oct 12-18, 2025",
      activities: [
        { 
          activity: 'Harvesting', 
          type: 'harvest', 
          icon: 'leaf-outline', 
          color: '#DC2626',
          status: 'upcoming',
          description: 'Rice harvesting and collection'
        }
      ]
    }
  };

  const currentCrop = cropData[selectedCrop];
  const currentField = fieldData[selectedField];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#10B981';
      case 'current': return '#F59E0B'; 
      case 'upcoming': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return 'checkmark-circle';
      case 'current': return 'time';
      case 'upcoming': return 'ellipse-outline';
      default: return 'ellipse-outline';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Completed';
      case 'current': return 'In Progress';
      case 'upcoming': return 'Upcoming';
      default: return 'Planned';
    }
  };

  const TimelineCard = ({ title, data, type }) => (
    <View style={[styles.timelineCard, { backgroundColor: getTimelineColor(type) }]}>
      <Text style={styles.timelineTitle}>{title}</Text>
      <Text style={styles.cropName}>{data.crop}</Text>
      <Text style={styles.period}>{data.period}</Text>
      <View style={styles.statusContainer}>
        <Ionicons 
          name={getStatusIcon(data.status)} 
          size={16} 
          color="#ffffff" 
        />
        <Text style={styles.status}>{data.status}</Text>
      </View>
      {data.yield && <Text style={styles.yield}>Yield: {data.yield}</Text>}
      {data.stage && <Text style={styles.stage}>Stage: {data.stage}</Text>}
      {data.daysLeft && <Text style={styles.daysLeft}>{data.daysLeft} days left</Text>}
      {data.expectedYield && <Text style={styles.expectedYield}>Expected: {data.expectedYield}</Text>}
      {data.profit && <Text style={styles.profit}>Profit: {data.profit}</Text>}
    </View>
  );

  const getTimelineColor = (type) => {
    switch(type) {
      case 'previous': return '#6B7280';
      case 'current': return '#10B981';
      case 'future': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const FieldDropdown = () => (
    <Modal
      visible={showFieldDropdown}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowFieldDropdown(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowFieldDropdown(false)}
      >
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>Select Field</Text>
          {Object.entries(fieldData).map(([fieldId, field]) => (
            <TouchableOpacity
              key={fieldId}
              style={[
                styles.dropdownItem,
                selectedField === fieldId && styles.dropdownItemActive
              ]}
              onPress={() => {
                setSelectedField(fieldId);
                setShowFieldDropdown(false);
              }}
            >
              <View style={styles.dropdownItemContent}>
                <Text style={styles.dropdownItemName}>{field.name}</Text>
                <Text style={styles.dropdownItemDetails}>{field.location} • {field.soilType}</Text>
              </View>
              {selectedField === fieldId && (
                <Ionicons name="checkmark" size={20} color="#10B981" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="leaf" size={28} color="#10B981" />
          <Text style={styles.headerTitle}>Agricultural Crop Calendar</Text>
          <Ionicons name="notifications-outline" size={24} color="#6B7280" />
        </View>

        {/* Field Selector */}
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorTitle}>Select Field:</Text>
          <TouchableOpacity
            style={styles.fieldSelector}
            onPress={() => setShowFieldDropdown(true)}
          >
            <View style={styles.fieldSelectorContent}>
              <View>
                <Text style={styles.fieldSelectorName}>{currentField.name}</Text>
                <Text style={styles.fieldSelectorDetails}>
                  {currentField.location} • {currentField.soilType}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Crop Selector */}
        <View style={styles.cropSelector}>
          <Text style={styles.selectorTitle}>Select Crop:</Text>
          <View style={styles.cropButtons}>
            {Object.keys(cropData).map((crop) => (
              <TouchableOpacity
                key={crop}
                style={[
                  styles.cropButton,
                  selectedCrop === crop && styles.cropButtonActive
                ]}
                onPress={() => setSelectedCrop(crop)}
              >
                <Text style={[
                  styles.cropButtonText,
                  selectedCrop === crop && styles.cropButtonTextActive
                ]}>
                  {crop.charAt(0).toUpperCase() + crop.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Timeline Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crop Timeline Overview</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeline}>
            <TimelineCard title="Previous Crop" data={timelineData.previous} type="previous" />
            <TimelineCard title="Current Crop" data={timelineData.current} type="current" />
            <TimelineCard title="Next Recommended" data={timelineData.future} type="future" />
          </ScrollView>
        </View>

        {/* Current Crop Quick Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Crop Information</Text>
          <View style={styles.quickInfoCard}>
            <View style={styles.quickInfoRow}>
              <View style={styles.quickInfoItem}>
                <Ionicons name="time-outline" size={20} color="#3B82F6" />
                <Text style={styles.quickInfoLabel}>Growth Period</Text>
                <Text style={styles.quickInfoValue}>{currentCrop.growthPeriod} days</Text>
              </View>
              <View style={styles.quickInfoItem}>
                <Ionicons name="water-outline" size={20} color="#06B6D4" />
                <Text style={styles.quickInfoLabel}>Water Need</Text>
                <Text style={styles.quickInfoValue}>{currentCrop.waterRequirement}</Text>
              </View>
            </View>
            <View style={styles.quickInfoRow}>
              <View style={styles.quickInfoItem}>
                <Ionicons name="trending-up" size={20} color="#10B981" />
                <Text style={styles.quickInfoLabel}>Expected Yield</Text>
                <Text style={styles.quickInfoValue}>{currentCrop.expectedYield.value} {currentCrop.expectedYield.unit}</Text>
              </View>
              <View style={styles.quickInfoItem}>
                <Ionicons name="cash-outline" size={20} color="#F59E0B" />
                <Text style={styles.quickInfoLabel}>Market Price</Text>
                <Text style={styles.quickInfoValue}>₹{currentCrop.marketPrice.pricePerUnit}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Weekly Activities Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Activities Timeline - {currentCrop.name}</Text>
          <View style={styles.weeklyTimeline}>
            {Object.entries(weeklyActivities).map(([weekId, weekData]) => (
              <View key={weekId} style={styles.weekItem}>
                <View style={styles.weekHeader}>
                  <Text style={styles.weekPeriod}>{weekData.period}</Text>
                  <View style={styles.weekActivitiesCount}>
                    <Text style={styles.activitiesCount}>{weekData.activities.length} activities</Text>
                  </View>
                </View>
                
                {weekData.activities.map((activity, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.activityCard,
                      { borderLeftColor: getStatusColor(activity.status) }
                    ]}
                    onPress={() => setSelectedWeek(weekId)}
                  >
                    <View style={styles.activityHeader}>
                      <View style={styles.activityIconContainer}>
                        <Ionicons 
                          name={activity.icon} 
                          size={18} 
                          color={activity.color} 
                        />
                      </View>
                      <View style={styles.activityContent}>
                        <Text style={styles.activityName}>{activity.activity}</Text>
                        <Text style={styles.activityDescription}>{activity.description}</Text>
                      </View>
                      <View style={styles.activityStatus}>
                        <Ionicons 
                          name={getStatusIcon(activity.status)} 
                          size={16} 
                          color={getStatusColor(activity.status)} 
                        />
                        <Text style={[
                          styles.activityStatusText,
                          { color: getStatusColor(activity.status) }
                        ]}>
                          {getStatusText(activity.status)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Activity Status Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Status Summary</Text>
          <View style={styles.statusSummary}>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { backgroundColor: '#10B981' }]} />
              <Text style={styles.statusLabel}>Completed</Text>
              <Text style={styles.statusCount}>3</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.statusLabel}>In Progress</Text>
              <Text style={styles.statusCount}>1</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { backgroundColor: '#6B7280' }]} />
              <Text style={styles.statusLabel}>Upcoming</Text>
              <Text style={styles.statusCount}>5</Text>
            </View>
          </View>
        </View>

        {/* Cultivation Process */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cultivation Process & Guidelines</Text>
          
          {/* Fertilizer Schedule */}
          <View style={styles.cultivationCard}>
            <Text style={styles.cardTitle}>
              <Ionicons name="leaf" size={18} color="#10B981" /> Fertilizer Schedule
            </Text>
            {currentCrop.fertilizers.map((fertilizer, index) => (
              <View key={index} style={styles.fertilizerItem}>
                <View style={styles.fertilizerHeader}>
                  <Text style={styles.fertilizerName}>{fertilizer.name}</Text>
                  <Text style={styles.fertilizerQuantity}>{fertilizer.quantity} {fertilizer.unit}</Text>
                </View>
                <Text style={styles.fertilizerStage}>Stage: {fertilizer.stage}</Text>
              </View>
            ))}
          </View>

          {/* Soil & pH Requirements */}
          <View style={styles.cultivationCard}>
            <Text style={styles.cardTitle}>
              <Ionicons name="earth" size={18} color="#8B5CF6" /> Soil Requirements
            </Text>
            <View style={styles.soilInfo}>
              <Text style={styles.soilLabel}>Preferred Soil:</Text>
              <Text style={styles.soilValue}>{currentCrop.soilPreference.join(', ')}</Text>
            </View>
            <View style={styles.soilInfo}>
              <Text style={styles.soilLabel}>pH Range:</Text>
              <Text style={styles.soilValue}>{currentCrop.pHRange.min} - {currentCrop.pHRange.max}</Text>
            </View>
          </View>
        </View>

        {/* Pest & Disease Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pest & Disease Management</Text>
          
          <View style={styles.pestDiseaseContainer}>
            <View style={styles.pestCard}>
              <Text style={styles.pestTitle}>
                <Ionicons name="bug" size={18} color="#EF4444" /> Common Pests
              </Text>
              {currentCrop.commonPests.map((pest, index) => (
                <View key={index} style={styles.pestItem}>
                  <Text style={styles.pestName}>• {pest}</Text>
                </View>
              ))}
            </View>

            <View style={styles.diseaseCard}>
              <Text style={styles.diseaseTitle}>
                <Ionicons name="medical" size={18} color="#F59E0B" /> Common Diseases
              </Text>
              {currentCrop.commonDiseases.map((disease, index) => (
                <View key={index} style={styles.diseaseItem}>
                  <Text style={styles.diseaseName}>• {disease}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Advisory & Precautions */}
        <View style={styles.section}>
          <View style={styles.advisoryCard}>
            <Text style={styles.advisoryTitle}>
              <Ionicons name="warning" size={20} color="#F59E0B" /> Advisory & Precautions
            </Text>
            <View style={styles.advisoryList}>
              <Text style={styles.advisoryItem}>• Monitor weather conditions and adjust irrigation accordingly</Text>
              <Text style={styles.advisoryItem}>• Apply fertilizers based on soil test recommendations</Text>
              <Text style={styles.advisoryItem}>• Ensure proper field drainage to prevent waterlogging</Text>
              <Text style={styles.advisoryItem}>• Regular pest monitoring and timely intervention</Text>
              <Text style={styles.advisoryItem}>• Follow integrated pest management (IPM) practices</Text>
              <Text style={styles.advisoryItem}>• Maintain proper spacing between plants for better growth</Text>
            </View>
          </View>
        </View>

        {/* Next Crop Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Crop Recommendations</Text>
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>
              <Ionicons name="bulb" size={18} color="#8B5CF6" /> Recommended crops for next season:
            </Text>
            <View style={styles.recommendationList}>
              {currentCrop.recommendations.map((crop, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Ionicons name="arrow-forward" size={16} color="#10B981" />
                  <Text style={styles.recommendationText}>{crop}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <FieldDropdown />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  selectorContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  fieldSelector: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
  },
  fieldSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  fieldSelectorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  fieldSelectorDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
    minWidth: width - 40,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
    textAlign: 'center',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  dropdownItemActive: {
    backgroundColor: '#F0F9FF',
  },
  dropdownItemContent: {
    flex: 1,
  },
  dropdownItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  dropdownItemDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  cropSelector: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cropButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  cropButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cropButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  cropButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  cropButtonTextActive: {
    color: '#ffffff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginHorizontal: 15,
    marginBottom: 12,
  },
  timeline: {
    paddingHorizontal: 15,
  },
  timelineCard: {
    width: width * 0.75,
    padding: 15,
    marginRight: 12,
    borderRadius: 12,
    minHeight: 150,
  },
  timelineTitle: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
    fontWeight: '500',
    marginBottom: 4,
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  period: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  status: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 5,
    fontWeight: '500',
  },
  yield: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 2,
  },
  stage: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 2,
  },
  daysLeft: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '600',
    marginBottom: 2,
  },
  expectedYield: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 2,
  },
  profit: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '600',
  },
  quickInfoCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  quickInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  quickInfoItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  quickInfoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 5,
    textAlign: 'center',
  },
  quickInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 2,
    textAlign: 'center',
  },
  weeklyTimeline: {
    paddingHorizontal: 15,
  },
  weekItem: {
    backgroundColor: '#ffffff',
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  weekPeriod: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  weekActivitiesCount: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activitiesCount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  activityCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  activityStatus: {
    alignItems: 'center',
  },
  activityStatusText: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  activityCardInteractive: {
    borderWidth: 1,
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  markCompleteButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  markCompleteText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  completedDate: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '500',
    marginTop: 2,
  },
  confirmModal: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    maxWidth: 400,
    alignSelf: 'center',
  },
  confirmHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 10,
  },
  confirmContent: {
    marginBottom: 20,
  },
  confirmMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 15,
  },
  activityPreview: {
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  activityPreviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  activityPreviewDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  confirmNote: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  statusSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statusItem: {
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  statusCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  cultivationCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginBottom: 12,
    borderRadius: 12,
    padding: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  fertilizerItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  fertilizerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fertilizerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  fertilizerQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  fertilizerStage: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  soilInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  soilLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  soilValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  pestDiseaseContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 10,
  },
  pestCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  diseaseCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  pestTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  diseaseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  pestItem: {
    marginVertical: 2,
  },
  diseaseItem: {
    marginVertical: 2,
  },
  pestName: {
    fontSize: 12,
    color: '#6B7280',
  },
  diseaseName: {
    fontSize: 12,
    color: '#6B7280',
  },
  advisoryCard: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  advisoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 12,
  },
  advisoryList: {
    marginTop: 8,
  },
  advisoryItem: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 6,
    lineHeight: 20,
  },
  recommendationCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  recommendationList: {
    marginTop: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    fontWeight: '500',
  },
  bottomPadding: {
    height: 30,
  },
});

export default CropCalendarPage;