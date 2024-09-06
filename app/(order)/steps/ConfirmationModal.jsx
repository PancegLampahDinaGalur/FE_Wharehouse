import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // Ensure this is imported

const ConfirmationModal = ({ visible, onClose, onConfirm }) => {
  const [image, setImage] = useState(null); // Define the image state

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0].uri; // Return the URI of the selected image
    }
    return null; // Return null if canceled
  };

  const handleUpload = async () => {
    const imageSelected = await pickImage(); // Call the image picker
    if (imageSelected) {
      setImage(imageSelected); // Set the image state with the selected image URI
      onConfirm(); // Call onConfirm to handle the upload logic
      onClose(true); // Pass true to onClose when upload is successful
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Konfirmasi Pembayaran</Text>
          <Text style={styles.modalText}>
            Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu
            akan segera kami cek, tunggu kurang lebih 10 menit untuk mendapatkan
            konfirmasi.
          </Text>
          {image && ( // Check if an image is uploaded
            <Image source={{ uri: image }} style={styles.uploadedImage} /> // Display the uploaded image
          )}
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Ionicons name="image-outline" size={50} color="#3c3c3c" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleUpload}>
            <Text style={styles.confirmButtonText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => {
              onClose(true); // Call onClose to close the modal
              // You can add any additional logic here if needed
            }}
          >
            <Text style={styles.orderButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Define styles here
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "#f8f8f8",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  timerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "red",
    marginLeft: 5,
  },
  uploadButton: {
    width: 320,
    height: 260,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    marginBottom: 20,
    elevation: 3,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orderButton: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF50",
    width: "100%",
  },
  orderButtonText: {
    color: "#4CAF50",
    fontSize: 18,
    fontWeight: "bold",
  },
  uploadedImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default ConfirmationModal;
