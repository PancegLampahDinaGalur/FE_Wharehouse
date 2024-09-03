import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import CarList from "@/components/CarList";
import { useDispatch, useSelector } from "react-redux";
import { selectCar } from "@/redux/reducers/car/carDetailSlice";
import { selectOrder } from "@/redux/reducers/order/orderSlice";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import CountDown from "react-native-countdown-component-maintained";
import * as Clipboard from "expo-clipboard";

function getDate24() {
  const date24 = new Date();
  date24.setHours(date24.getHours() + 24);
  return date24.toString();
}

export default function Step2() {
  //   const [remainingTime, setRemainingTime] = useState(0);

  //   useEffect(() => {
  //     // Calculate the remaining time in seconds until the target time
  //     const targetTime = new Date("2022-06-19T13:00:00").getTime(); // Target time
  //     const currentTime = new Date().getTime(); // Current time
  //     const timeLeft = Math.max((targetTime - currentTime) / 1000, 0); // Remaining time in seconds
  //     setRemainingTime(timeLeft);
  //   }, []);

  const [promoText, setPromoText] = useState(null);
  const { selectedBank, promo } = useSelector(selectOrder);
  const { data } = useSelector(selectCar);
  const dispatch = useDispatch();
  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
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

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>Selesaikan Pembayaran Sebelum</Text>
        {/* <CountDown
          until={remainingTime} // Remaining time in seconds
          size={14}
          digitStyle={styles.digitStyle}
          digitTxtStyle={styles.digitTxtStyle}
          timeToShow={["H", "M", "S"]}
          timeLabels={{ h: null, m: null, s: null }}
          showSeparator
          separatorStyle={styles.separatorStyle}
        /> */}
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
      {/* <TextInput
        style={styles.input}
        placeholder="Nomor Rekening"
        value="xxxx-xxxx-xxxx"
        editable={false}
      /> */}
      <View
        style={[
          styles.input,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            // alignItems: "center",
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
      {/* <TextInput
        style={styles.input}
        placeholder="Total Bayar"
        value="Rp 230.000"
        editable={false}
      /> */}
      <View
        style={[
          styles.input,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            // alignItems: "center",
          },
        ]}
      >
        <Text>Rp 230.000</Text>
        <TouchableOpacity onPress={() => copyToClipboard((230000).toString())}>
          <Ionicons color={"#3C3C3C"} name={"copy-outline"} size={14} />
        </TouchableOpacity>
      </View>
      <Text style={styles.confirmationText}>
        Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
      </Text>
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Konfirmasi Pembayaran</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Lihat Daftar Pesanan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderId: {
    fontSize: 14,
    marginVertical: 10,
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  step: {
    fontSize: 14,
  },
  timer: {
    fontSize: 14,
    marginVertical: 10,
    color: "#000000",
    fontFamily: "PoppinsBold",
  },
  time: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
  },
  date: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "PoppinsBold",
  },
  carContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  carImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  carDetails: {
    flex: 1,
  },
  carName: {
    fontSize: 16,
    color: "#000000",
    fontFamily: "PoppinsBold",
  },
  carPrice: {
    fontSize: 16,
    color: "green",
  },
  transferTitle: {
    fontSize: 16,
    color: "#000000",
    fontFamily: "PoppinsBold",
    marginVertical: 10,
  },
  bankContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  bankName: {
    fontSize: 16,
    color: "#000000",
    fontFamily: "PoppinsBold",
    marginRight: 10,
  },
  bankDetails: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "PoppinsBold",
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
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  digitStyle: {
    backgroundColor: "#FF3366",
    borderRadius: 5,
    padding: 5,
  },
  digitTxtStyle: {
    color: "#FFF",
    fontWeight: "bold",
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
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
