import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const PhotoPickerScreen = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const requestPermissions = async () => {
    try {
      // Request camera permissions
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      
      // Request media library permissions
      const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus.status !== 'granted') {
        Alert.alert('Camera Permission', 'Camera access is needed to take photos');
        return { camera: false, media: mediaStatus.status === 'granted' };
      }
      
      if (mediaStatus.status !== 'granted') {
        Alert.alert('Media Library Permission', 'Media library access is needed to select photos');
        return { camera: cameraStatus.status === 'granted', media: false };
      }
      
      return { camera: true, media: true };
    } catch (error) {
      console.error('Permission error:', error);
      return { camera: false, media: false };
    }
  };

  const pickImagesFromGallery = async () => {
    console.log('Gallery picker pressed');
    
    try {
      const permissions = await requestPermissions();
      if (!permissions.media) {
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [4, 3],
        allowsEditing: false,
      });

      console.log('Gallery result:', result);

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map((asset, index) => ({
          id: Date.now() + index,
          uri: asset.uri,
          fileName: asset.fileName || `image_${Date.now()}_${index}.jpg`,
          type: asset.type || 'image/jpeg',
          fileSize: asset.fileSize || 0,
          width: asset.width,
          height: asset.height,
          uploaded: false,
        }));

        setSelectedImages(prev => [...prev, ...newImages]);
        console.log('Images added:', newImages.length);
      }
    } catch (error) {
      console.error('Gallery picker error:', error);
      Alert.alert('Error', 'Failed to select images from gallery');
    }
  };

  const takePhoto = async () => {
    console.log('Camera pressed');
    
    try {
      const permissions = await requestPermissions();
      if (!permissions.camera) {
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        aspect: [4, 3],
        allowsEditing: true,
      });

      console.log('Camera result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const newImage = {
          id: Date.now(),
          uri: asset.uri,
          fileName: asset.fileName || `photo_${Date.now()}.jpg`,
          type: asset.type || 'image/jpeg',
          fileSize: asset.fileSize || 0,
          width: asset.width,
          height: asset.height,
          uploaded: false,
        };

        setSelectedImages(prev => [...prev, newImage]);
        console.log('Photo taken and added');
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const showImageSourceAlert = () => {
    Alert.alert(
      'Select Image Source',
      'Choose where you want to select images from',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Gallery', onPress: pickImagesFromGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const uploadSingleImage = async (imageData) => {
    try {
      const formData = new FormData();
      
      // Create the file object for FormData
      const fileUri = imageData.uri;
      const fileType = imageData.type || 'image/jpeg';
      const fileName = imageData.fileName || `image_${Date.now()}.jpg`;

      formData.append('photo', {
        uri: fileUri,
        type: fileType,
        name: fileName,
      });

      console.log('Uploading image:', fileName);

      // Replace with your server IP - for Expo, you might need to use your computer's IP
      const response = await fetch('http://192.168.1.100:3000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      console.log('Upload result:', result);
      
      return { success: response.ok, data: result };
    } catch (error) {
      console.error('Upload error:', error);
      return { success: false, error: error.message };
    }
  };

  const uploadAllImages = async () => {
    const imagesToUpload = selectedImages.filter(img => !img.uploaded);
    
    if (imagesToUpload.length === 0) {
      Alert.alert('No Images', 'No new images to upload');
      return;
    }

    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < imagesToUpload.length; i++) {
      const image = imagesToUpload[i];
      
      setUploadProgress(prev => ({
        ...prev,
        [image.id]: 'uploading'
      }));

      const result = await uploadSingleImage(image);
      
      if (result.success) {
        successCount++;
        setSelectedImages(prev => 
          prev.map(img => 
            img.id === image.id 
              ? { ...img, uploaded: true }
              : img
          )
        );
        setUploadProgress(prev => ({
          ...prev,
          [image.id]: 'success'
        }));
      } else {
        failCount++;
        setUploadProgress(prev => ({
          ...prev,
          [image.id]: 'failed'
        }));
      }
    }

    setUploading(false);
    
    if (failCount === 0) {
      Alert.alert('Success', `All ${successCount} images uploaded successfully!`);
    } else {
      Alert.alert(
        'Upload Complete', 
        `${successCount} images uploaded successfully, ${failCount} failed.`
      );
    }

    setTimeout(() => {
      setUploadProgress({});
    }, 3000);
  };

  const removeImage = (imageId) => {
    setSelectedImages(prev => prev.filter(img => img.id !== imageId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[imageId];
      return newProgress;
    });
  };

  const clearAllImages = () => {
    Alert.alert(
      'Clear All Images',
      'Are you sure you want to remove all selected images?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: () => {
          setSelectedImages([]);
          setUploadProgress({});
        }},
      ]
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return 'Unknown size';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderImage = (imageData) => {
    const progress = uploadProgress[imageData.id];
    
    return (
      <View key={imageData.id} style={styles.imageContainer}>
        <Image source={{ uri: imageData.uri }} style={styles.selectedImage} />
        
        {progress && (
          <View style={styles.statusOverlay}>
            {progress === 'uploading' && (
              <ActivityIndicator size="small" color="#fff" />
            )}
            {progress === 'success' && (
              <View style={styles.successIcon}>
                <Text style={styles.statusText}>✓</Text>
              </View>
            )}
            {progress === 'failed' && (
              <View style={styles.failIcon}>
                <Text style={styles.statusText}>✗</Text>
              </View>
            )}
          </View>
        )}

        {imageData.uploaded && !progress && (
          <View style={styles.uploadedBadge}>
            <Text style={styles.uploadedText}>Uploaded</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeImage(imageData.id)}
        >
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>

        <View style={styles.imageInfo}>
          <Text style={styles.fileName} numberOfLines={1}>
            {imageData.fileName}
          </Text>
          <Text style={styles.fileSize}>
            {formatFileSize(imageData.fileSize)}
          </Text>
          <Text style={styles.dimensions}>
            {imageData.width} × {imageData.height}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expo Photo Picker</Text>
        <Text style={styles.subtitle}>
          Selected: {selectedImages.length} images
        </Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {selectedImages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No images selected</Text>
            <Text style={styles.emptySubtext}>
              Choose from camera or gallery to get started
            </Text>
          </View>
        ) : (
          <View style={styles.imageGrid}>
            {selectedImages.map(renderImage)}
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.pickButton} 
          onPress={showImageSourceAlert}
          disabled={uploading}
        >
          <Text style={styles.buttonText}>
            📷 {selectedImages.length === 0 ? 'Add Photos' : 'Add More Photos'}
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.galleryButton} 
            onPress={pickImagesFromGallery}
            disabled={uploading}
          >
            <Text style={styles.buttonText}>🖼️ Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cameraButton} 
            onPress={takePhoto}
            disabled={uploading}
          >
            <Text style={styles.buttonText}>📸 Camera</Text>
          </TouchableOpacity>
        </View>

        {selectedImages.length > 0 && (
          <>
            <TouchableOpacity
              style={[styles.uploadButton, uploading && styles.disabledButton]}
              onPress={uploadAllImages}
              disabled={uploading}
            >
              {uploading ? (
                <View style={styles.uploadingContainer}>
                  <ActivityIndicator color="#fff" size="small" />
                  <Text style={[styles.buttonText, { marginLeft: 8 }]}>Uploading...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>
                  ⬆️ Upload All ({selectedImages.filter(img => !img.uploaded).length})
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearAllImages}
              disabled={uploading}
            >
              <Text style={styles.clearButtonText}>🗑️ Clear All</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50, // Account for status bar in Expo
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    minHeight: 300,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: (width - 45) / 2,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  statusOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  failIcon: {
    backgroundColor: '#f44336',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  uploadedBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  uploadedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageInfo: {
    padding: 10,
  },
  fileName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 10,
    color: '#666',
    marginBottom: 1,
  },
  dimensions: {
    fontSize: 10,
    color: '#666',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  pickButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  galleryButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
  },
  cameraButton: {
    backgroundColor: '#5856D6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#34C759',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButtonText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PhotoPickerScreen;