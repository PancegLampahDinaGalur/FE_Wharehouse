import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectOrder } from "@/redux/reducers/order/orderSlice";
import { selectCar } from "@/redux/reducers/car/carDetailSlice";
import CarList from "@/components/CarList";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const paymentMethod = ["BCA", "MANDIRI", "BNI"];

export default function step1({ setActiveStep, onPromoApply }) {
  const [selectedMethod, setselectedMethod] = useState(null);
  const { carId } = useSelector(selectOrder);
  const { data } = useSelector(selectCar);
  const formatIDR = useCallback((price) => formatCurrency.format(price), []); // callback untuk mememories sebuah fungsi
  return (
    <View style={styles.container}>
      <CarList
        image={{ uri: data.image }}
        carName={data.name}
        passengers={5}
        baggage={4}
        price={data.price}
      />
      <Text style={styles.textBold}>Pilih Bank Transfer</Text>
      <Text style={styles.textBold}>
        Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau
        Mobile Banking
      </Text>
      <View>
        {paymentMethod.map((e) => (
          <Button
            style={styles.paymentMethod}
            onPress={() => setselectedMethod(e)}
          >
            <Text style={styles.paymentBox}>{e}</Text>
            <Text style={styles.paymentText}>{e} Transfer</Text>
            {selectedMethod === e && (
              <Ionicons size={20} name={"checkmark"} style={styles.check} />
            )}
          </Button>
        ))}
      </View>
      <View style={styles.promoContainer}>
        <Text style={styles.promoTitle}>% Pakai Kode Promo</Text>
        <View style={styles.promoInputContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Tulis catatanmu di sini"
            placeholderTextColor="#8A8A8A"
          />
          <TouchableOpacity style={styles.applyButton} onPress={onPromoApply}>
            <Text style={styles.applyButtonText}>Terapkan</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatIDR(data.price || 0)}</Text>
          <View style={styles.buttonContainer}>
            <Button
              disabled={selectedMethod ? false : true}
              color="#3D7B3F"
              onPress={() => {
                setActiveStep(1);
              }}
              title="Lanjutkan Pembayaran"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  textBold: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    // marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 20,
    borderWidthBottom: 1,
    borderColorBottom: "#D0D0D0",
  },
  paymentBox: {
    width: "35%",
    textAlign: "center",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "#D0D0D0",
    marginRight: 10,
  },
  paymentText: {
    fontSize: 14,
    color: "#000000",
    flex: 1, // Allow the text to take available space
    textAlign: "left", // Align text to the left
    paddingTop: 10,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: "center", // Center the content in the footer
  },
  price: {
    flexDirection: "row",
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  buttonContainer: {
    width: "100%", // Full width for the button
    borderRadius: 5, // Rounded corners
    overflow: "hidden", // Ensure the button has rounded corners
  },
  promoContainer: {
    marginTop: 30,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  promoInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 2,
    padding: 5,
    // marginRight: 10, // Space between input and button
  },
  applyButton: {
    backgroundColor: "#3D7B3F", // Dark green background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    color: "#FFFFFF", // White text color
    fontWeight: "bold",
  },
  check: {
    marginLeft: "auto",
  },
});
