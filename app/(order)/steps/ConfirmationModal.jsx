import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ConfirmationModal = ({ visible, onClose, onConfirm, pickImage }) => {
  const handleUpload = async () => {
    const imageSelected = await pickImage(); // Call the image picker
    if (imageSelected) {
      onConfirm(); // Call onConfirm to handle the upload logic
      onClose(true); // Pass true to onClose when upload is successful
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose(false)} // Ensure onClose can be called with false
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Konfirmasi Pembayaran</Text>
          <Text style={styles.modalText}>
            Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu
            akan segera kami cek, tunggu kurang lebih 10 menit untuk mendapatkan
            konfirmasi.
          </Text>
          <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={24} color="red" />
            <Text style={styles.timerText}>09:55</Text>
          </View>
          <Text style={styles.modalText}>
            Untuk membantu kami lebih cepat melakukan pengecekan, kamu bisa
            upload bukti bayarmu.
          </Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Ionicons name="image-outline" size={50} color="#3c3c3c" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleUpload}>
            <Text style={styles.confirmButtonText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => onClose(true)} // Changed to pass true when button is pressed
          >
            <Text style={styles.orderButtonText}>Lihat Daftar Pesanan</Text>
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
    backgroundColor: "#f8f8f8", // Changed background color
    borderRadius: 15, // Adjusted border radius
    padding: 25, // Increased padding
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3, // Increased shadow height
    },
    shadowOpacity: 0.3, // Increased shadow opacity
    shadowRadius: 6, // Increased shadow radius
    elevation: 6, // Increased elevation
  },
  modalTitle: {
    fontSize: 22, // Increased font size
    fontWeight: "bold",
    marginBottom: 20, // Increased margin
    textAlign: "center",
  },
  modalText: {
    fontSize: 18, // Increased font size
    textAlign: "center",
    marginBottom: 20, // Increased margin
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20, // Increased margin
  },
  timerText: {
    fontSize: 22, // Increased font size
    fontWeight: "bold",
    color: "red",
    marginLeft: 5,
  },
  uploadButton: {
    width: 320, // Increased width
    height: 260, // Increased height
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 15, // Adjusted border radius
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0", // Changed background color
    marginBottom: 20, // Increased margin
    elevation: 3, // Increased elevation
  },
  confirmButton: {
    backgroundColor: "#4CAF50", // Changed background color
    padding: 14, // Increased padding
    borderRadius: 6, // Adjusted border radius
    alignItems: "center",
    marginBottom: 12, // Increased margin
    width: "100%",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18, // Increased font size
    fontWeight: "bold",
  },
  orderButton: {
    backgroundColor: "#fff",
    padding: 14, // Increased padding
    borderRadius: 6, // Adjusted border radius
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF50", // Changed border color
    width: "100%",
  },
  orderButtonText: {
    color: "#4CAF50", // Changed text color
    fontSize: 18, // Increased font size
    fontWeight: "bold",
  },
});

export default ConfirmationModal;
