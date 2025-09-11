import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LogFarmActivity = () => {
  const navigation = useNavigation();
  const [selectedActivities, setSelectedActivities] = useState([]);

  const activities = [
    {
      id: 'sowing',
      name: 'Sowing',
      icon: '🌱',
      description: 'Plant seeds in the farm'
    },
    {
      id: 'irrigation',
      name: 'Irrigation',
      icon: '💧',
      description: 'Water the crops'
    },
    {
      id: 'fertilizers',
      name: 'Fertilizers/\nPesticides',
      icon: '🧪',
      description: 'Apply fertilizers or pesticides'
    },
    {
      id: 'harvest',
      name: 'Harvest',
      icon: '🌾',
      description: 'Harvest mature crops'
    }
  ];

  const handleActivityPress = (activityId) => {
    if (selectedActivities.includes(activityId)) {
      setSelectedActivities(selectedActivities.filter(id => id !== activityId));
    } else {
      setSelectedActivities([...selectedActivities, activityId]);
    }
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert(
        'Exit App',
        'Do you want to exit the application?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exit', onPress: () => console.log('App exit requested') }
        ]
      );
    }
  };

  const handleSubmit = () => {
    if (selectedActivities.length === 0) {
      Alert.alert('No Activities Selected', 'Please select at least one activity before submitting.');
      return;
    }

    const selectedActivityNames = activities
      .filter(activity => selectedActivities.includes(activity.id))
      .map(activity => activity.name)
      .join(', ');

    Alert.alert(
      'Activities Logged Successfully!',
      `Selected activities: ${selectedActivityNames}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset selections after successful submission
            setSelectedActivities([]);
            console.log('Farm activities logged:', selectedActivities);
          }
        }
      ]
    );
  };

  const renderActivityButton = (activity) => {
    const isSelected = selectedActivities.includes(activity.id);
    
    return (
      <TouchableOpacity
        key={activity.id}
        style={[
          styles.activityButton,
          isSelected && styles.selectedActivityButton
        ]}
        onPress={() => handleActivityPress(activity.id)}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{activity.icon}</Text>
        </View>
        <Text style={[
          styles.activityText,
          isSelected && styles.selectedActivityText
        ]}>
          {activity.name}
        </Text>
      </TouchableOpacity>
    );
  };

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

      {/* Activity Grid */}
      <View style={styles.content}>
        <View style={styles.activitiesGrid}>
          {activities.map(activity => renderActivityButton(activity))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            selectedActivities.length === 0 && styles.disabledSubmitButton
          ]}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Selected Activities Counter */}
      {selectedActivities.length > 0 && (
        <View style={styles.selectionCounter}>
          <Text style={styles.selectionCounterText}>
            {selectedActivities.length} activit{selectedActivities.length === 1 ? 'y' : 'ies'} selected
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B7ED8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  activityButton: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#FFF3A0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedActivityButton: {
    backgroundColor: '#E6F3FF',
    borderColor: '#8B7ED8',
  },
  iconContainer: {
    marginBottom: 10,
  },
  iconText: {
    fontSize: 40,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 18,
  },
  selectedActivityText: {
    color: '#8B7ED8',
  },
  submitButton: {
    backgroundColor: '#8B7ED8',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledSubmitButton: {
    backgroundColor: '#ccc',
    elevation: 1,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectionCounter: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: 'rgba(139, 126, 216, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  selectionCounterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default LogFarmActivity;