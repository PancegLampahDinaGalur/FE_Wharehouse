import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import CarList from "@/components/CarList";
import { useDispatch, useSelector } from "react-redux";
import { selectCar } from "@/redux/reducers/car/carDetailSlice";
import {
  selectOrder,
  setStateByName,
  putOrderSlip,
} from "@/redux/reducers/order/orderSlice";
import { selectDataAuth } from "@/redux/reducers/auth/loginSlice";
import { Ionicons } from "@expo/vector-icons";
import CountDown from "react-native-countdown-component-maintained";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import ConfirmationModal from "./ConfirmationModal"; // Default import
// import { selectOrder } from "@/redux/reducers/order/orderSlice";

function getDate24() {
  const date24 = new Date();
  date24.setHours(date24.getHours() + 24);
  return date24.toString();
}

export default function Step2() {
  const [promoText, setPromoText] = useState(null);
  const { selectedBank, promo, dataOrder } = useSelector(selectOrder);
  const { data } = useSelector(selectCar);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };
  const formatCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const pickImage = async () => {
    // Request permission to access the media library
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

    console.log(result);

    if (!result.canceled) {
      setImage({
        uri: result.assets[0].uri,
        name: result.assets[0].fileName,
        type: result.assets[0].mimeType,
      });
    }

    if (result.canceled) {
      Alert.alert("Image selection was canceled."); // Alert if canceled
      return; // Exit the function if canceled
    }

    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri); // Update state with the selected image URI
      // Add your upload logic here if needed
    } else {
      Alert.alert("No image selected."); // Alert if no image is selected
    }
  };

  const formattedDate = new Date(getDate24()).toLocaleString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  useEffect(() => {
    //console.log("dataOrder", dataOrder);
    console.log("modal visible", modalVisible);
    console.log("step 2", dataOrder);
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>Selesaikan Pembayaran Sebelum</Text>
        <CountDown
          until={86400} // Remaining time in seconds
          size={12}
          digitStyle={{ backgroundColor: "#FA2C5A" }}
          digitTxtStyle={{ color: "#fff" }}
          onFinish={() => Alert("finished")}
          timeLabelStyle={{ display: "none" }}
          timeToShow={["H", "M", "S"]}
        />
      </View>
      <Text style={styles.date}>{formattedDate} WIB</Text>
      <View>
        <CarList
          image={{ uri: data.image }}
          carName={data.name}
          passengers={5}
          baggage={4}
          price={data.price}
        />
      </View>
      <Text style={styles.transferTitle}>Lakukan Transfer ke</Text>
      <View style={styles.paymentMethodContainer}>
        <TouchableOpacity style={styles.paymentMethodButton}>
          <Text style={styles.paymentMethodText}>BCA</Text>
        </TouchableOpacity>
        <View style={styles.paymentDetails}>
          <Text style={styles.bankDetails}>BCA Transfer</Text>
          <Text style={styles.bankDetails}>a.n Jeep Bromo Online</Text>
        </View>
      </View>
      <Text style={styles.inputPay}>Nomor Rekening</Text>
      <View
        style={[
          styles.input,
          {
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <Text>12345678</Text>
        <TouchableOpacity
          onPress={() => copyToClipboard((12345678).toString())}
        >
          <Ionicons color={"#3C3C3C"} name={"copy-outline"} size={14} />
        </TouchableOpacity>
      </View>
      <Text style={styles.inputPay}>Total Bayar</Text>
      <View
        style={[
          styles.input,
          {
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <Text>{formatCurrency.format(data.price)}</Text>
        <TouchableOpacity onPress={() => copyToClipboard((230000).toString())}>
          <Ionicons color={"#3C3C3C"} name={"copy-outline"} size={14} />
        </TouchableOpacity>
      </View>
      <Text style={styles.confirmationText}>
        Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
      </Text>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.confirmButtonText}>Konfirmasi Pembayaran</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Lihat Daftar Pesanan</Text>
      </TouchableOpacity>
      <ConfirmationModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        //   setModalVisible(false);
        //   if (success) {
        //     // Handle success case
        //     // For example, navigate to the order list screen or refresh the order list
        //     // dispatch(fetchOrders()); // Assuming you have a fetchOrders action
        //   }
        // }}
        // onConfirm={async () => {
        //   // Logic for handling confirmation
        //   // For example, you might want to dispatch an action to confirm the payment
        //   try {
        //     // Assuming you have a confirmPayment action
        //     await dispatch(confirmPayment({ image, promoText })); // Pass necessary data
        //     Alert.alert("Success", "Payment confirmed successfully!");
        //   } catch (error) {
        //     Alert.alert("Error", "There was an issue confirming your payment.");
        // //   }
        // }}
        // pickImage={pickImage} // Pass the pickImage function
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timer: {
    fontSize: 14,
    marginVertical: 10,
    color: "#000000",
    fontFamily: "PoppinsBold",
  },
  date: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "PoppinsBold",
  },
  transferTitle: {
    fontSize: 16,
    color: "#000000",
    fontFamily: "PoppinsBold",
    marginVertical: 10,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  paymentMethodButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  paymentDetails: {
    flex: 1,
  },
  bankDetails: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  confirmationText: {
    fontSize: 14,
    marginVertical: 10,
    color: "#000000",
    fontFamily: "PoppinsBold",
  },
  confirmButton: {
    backgroundColor: "#3D7B3F",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
  orderButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3D7B3F",
    marginVertical: 10,
  },
  orderButtonText: {
    color: "#3D7B3F",
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
});
