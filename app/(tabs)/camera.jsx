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
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

const PhotoPickerScreen = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to select photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const pickImages = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Storage permission is needed to select photos');
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 5, // Allow multiple selection (0 = no limit)
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to select image');
      } else if (response.assets) {
        const newImages = response.assets.map((asset, index) => ({
          id: Date.now() + index,
          uri: asset.uri,
          fileName: asset.fileName || `image_${Date.now()}_${index}.jpg`,
          type: asset.type || 'image/jpeg',
          fileSize: asset.fileSize,
          uploaded: false,
        }));
        
        setSelectedImages(prev => [...prev, ...newImages]);
      }
    });
  };

  const uploadSingleImage = async (imageData) => {
    const formData = new FormData();
    formData.append('photo', {
      uri: imageData.uri,
      type: imageData.type,
      name: imageData.fileName,
    });

    try {
      const response = await fetch('http://192.168.1.100:3000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
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

    // Clear progress after a delay
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
    if (bytes === 0) return '0 Bytes';
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
        
        {/* Upload Status Overlay */}
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

        {/* Uploaded Badge */}
        {imageData.uploaded && !progress && (
          <View style={styles.uploadedBadge}>
            <Text style={styles.uploadedText}>Uploaded</Text>
          </View>
        )}

        {/* Remove Button */}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeImage(imageData.id)}
        >
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>

        {/* Image Info */}
        <View style={styles.imageInfo}>
          <Text style={styles.fileName} numberOfLines={1}>
            {imageData.fileName}
          </Text>
          {imageData.fileSize && (
            <Text style={styles.fileSize}>
              {formatFileSize(imageData.fileSize)}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photo Picker & Upload</Text>
        <Text style={styles.subtitle}>
          Selected: {selectedImages.length} images
        </Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {selectedImages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No images selected</Text>
            <Text style={styles.emptySubtext}>
              Tap the button below to select photos from your gallery
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
          onPress={pickImages}
          disabled={uploading}
        >
          <Text style={styles.buttonText}>
            {selectedImages.length === 0 ? 'Select Photos' : 'Add More Photos'}
          </Text>
        </TouchableOpacity>

        {selectedImages.length > 0 && (
          <>
            <TouchableOpacity
              style={[styles.uploadButton, uploading && styles.disabledButton]}
              onPress={uploadAllImages}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  Upload All ({selectedImages.filter(img => !img.uploaded).length})
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearAllImages}
              disabled={uploading}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
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
  uploadButton: {
    backgroundColor: '#34C759',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
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