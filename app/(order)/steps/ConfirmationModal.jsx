import React, { useState, useEffect } from "react"; // Add useEffect
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
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "formik";
import { selectDataAuth } from "@/redux/reducers/auth/loginSlice";
import {
  selectOrder,
  setStateByName,
  putOrderSlip,
} from "@/redux/reducers/order/orderSlice";
import { selectCar } from "@/redux/reducers/car/carDetailSlice";

const ConfirmationModal = ({ visible, onClose, onConfirm }) => {
  const [image, setImage] = useState(null); // Define the image state
  const [countdown, setCountdown] = useState(600); // Initialize countdown (10 minutes in seconds)
  const dispatch = useDispatch();
  const { selectedBank, promo, dataOrder, status } = useSelector(selectOrder);
  const { data: user } = useSelector(selectDataAuth);
  const { data } = useSelector(selectCar);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Cleanup on unmount
  }, [countdown]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const pickImage = async () => {
    try {
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
        const imageSel = result.assets[0].uri; // Call the image picker
        if (imageSel) {
          setImage({
            uri: imageSel,
            type: result.assets[0].mimeType,
            name: result.assets[0].fileName,
          });
        }
      }
    } catch (error) {
      console.error("Error picking image: ", error);
      Alert.alert("An error occurred while picking the image.");
    }
    return null; // Return null if canceled or an error occurred
  };

  const handleUpload = async () => {
    if (image) {
      // setImage(image);
      console.log(image);
      const formData = new FormData();
      formData.append("slip", image);
      dispatch(
        putOrderSlip({
          token: user.access_token,
          id: dataOrder.id,
          formData,
        })
      ); // digunakan ketika ngiirm file
      console.log("confirmation dataorder", dataOrder);
    }
  };

  useEffect(() => {
    console.log("test lur", status);
    if (status === "upload-success") {
      // dispatch(setStateByName({ name: "activeStep", value: 2 }));
    } else {
      console.log(ErrorMessage);
    }
  }, [status]);

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
          <Text style={styles.countdownText}>{formatTime(countdown)}</Text>
          {image ? ( // Check if an image is uploaded
            <Image source={{ uri: image.uri }} style={styles.uploadedImage} /> // Display the uploaded image
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Ionicons name="image-outline" size={50} color="#3c3c3c" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.confirmButton} onPress={handleUpload}>
            <Text style={styles.confirmButtonText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => {
              onClose(true); // Call onClose to close the modal
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
  uploadedImage: {
    width: 320,
    height: 260,
    marginBottom: 20,
    borderRadius: 10,
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
  countdownText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF0000", // Change color as needed
    marginTop: 10,
  },
  countdownText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF0000", // Change color as needed
    marginTop: 10,
  },
});

export default ConfirmationModal;
