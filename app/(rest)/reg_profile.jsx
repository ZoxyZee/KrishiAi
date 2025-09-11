import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from 'react-native';

const FarmRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    soilType: '',
    irrigationMethod: '',
    location: '',
    crop: '',
    landSize: '',
    sowingMethod: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [errors, setErrors] = useState({});

  // Dropdown options
  const dropdownOptions = {
    soilType: ['Loamy soil', 'Clay soil', 'Sandy soil', 'Silt soil', 'Peat soil', 'Chalk soil'],
    irrigationMethod: ['Borewell', 'Canal irrigation', 'Drip irrigation', 'Sprinkler irrigation', 'Rainwater harvesting'],
    crop: ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Maize', 'Barley', 'Pulses', 'Vegetables'],
    sowingMethod: ['Direct seeding', 'Transplanting', 'Broadcasting', 'Dibbling', 'Drilling'],
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const openDropdown = (field) => {
    setCurrentField(field);
    setModalVisible(true);
  };

  const selectOption = (option) => {
    handleInputChange(currentField, option);
    setModalVisible(false);
    setCurrentField('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.soilType) newErrors.soilType = 'Soil type is required';
    if (!formData.irrigationMethod) newErrors.irrigationMethod = 'Irrigation method is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.crop) newErrors.crop = 'Crop type is required';
    if (!formData.landSize.trim()) newErrors.landSize = 'Land size is required';
    if (!formData.sowingMethod) newErrors.sowingMethod = 'Sowing method is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Success',
        'Farm registration completed successfully!',
        [
          {
            text: 'View Profile',
            onPress: () => {
              Alert.alert('Navigation', 'Redirecting to farm profile...');
              // Here you would navigate to the farm profile screen
              // navigation.navigate('FarmProfile', { farmData: formData });
            }
          }
        ]
      );
    } else {
      Alert.alert('Error', 'Please fill in all required fields correctly.');
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Form',
      'Are you sure you want to clear all fields?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setFormData({
              name: '',
              address: '',
              phone: '',
              soilType: '',
              irrigationMethod: '',
              location: '',
              crop: '',
              landSize: '',
              sowingMethod: '',
            });
            setErrors({});
          }
        }
      ]
    );
  };

  const InputField = ({ label, field, placeholder, keyboardType = 'default', multiline = false }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label} *</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          errors[field] && styles.errorInput
        ]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  const DropdownField = ({ label, field, placeholder, icon }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label} *</Text>
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          errors[field] && styles.errorInput
        ]}
        onPress={() => openDropdown(field)}
      >
        <View style={styles.dropdownContent}>
          <Text style={styles.dropdownIcon}>{icon}</Text>
          <Text style={[
            styles.dropdownText,
            !formData[field] && styles.placeholderText
          ]}>
            {formData[field] || placeholder}
          </Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </View>
      </TouchableOpacity>
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Farm Registration</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Personal Information</Text>
          
          <InputField
            label="Full Name"
            field="name"
            placeholder="Enter your full name"
          />
          
          <InputField
            label="Address"
            field="address"
            placeholder="Enter your complete address"
            multiline={true}
          />
          
          <InputField
            label="Phone Number"
            field="phone"
            placeholder="Enter 10-digit phone number"
            keyboardType="phone-pad"
          />
        </View>

        {/* Farm Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌾 Farm Details</Text>
          
          <DropdownField
            label="Soil Type"
            field="soilType"
            placeholder="Select soil type"
            icon="🌱"
          />
          
          <DropdownField
            label="Irrigation Method"
            field="irrigationMethod"
            placeholder="Select irrigation method"
            icon="💧"
          />
          
          <InputField
            label="Farm Location"
            field="location"
            placeholder="Enter farm location (Village/District)"
          />
          
          <DropdownField
            label="Primary Crop"
            field="crop"
            placeholder="Select primary crop"
            icon="🌾"
          />
          
          <InputField
            label="Land Size"
            field="landSize"
            placeholder="Enter land size (e.g., 1.2 acres)"
          />
          
          <DropdownField
            label="Sowing Method"
            field="sowingMethod"
            placeholder="Select sowing method"
            icon="🌱"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Register Farm</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Dropdown Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {currentField.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={dropdownOptions[currentField] || []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => selectOption(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 18,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resetText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  errorInput: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '85%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 18,
    color: '#666',
  },
  optionItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default FarmRegistrationForm;