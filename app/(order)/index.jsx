// import { View, Text, StyleSheet } from "react-native";
// import React from "react";
// import { ProgressStep, ProgressSteps } from "react-native-progress-stepper";
// import Constants from "expo-constants";

// export default function index() {
//   return (
//     <View style={{ flex: 1 }}>
//       <ProgressSteps>
//         <ProgressStep label="Pilih Metode">
//           <View style={{ alignItems: "center" }}>
//             <Text style={styles.titleText}>Pilih Metode Pembayaran</Text>
//           </View>
//         </ProgressStep>
//         <ProgressStep label="Bayar">
//           <View style={{ alignItems: "center" }}>
//             <Text style={styles.titleText}>Bayar</Text>
//           </View>
//         </ProgressStep>
//         <ProgressStep label="Tiket">
//           <View style={{ alignItems: "center" }}>
//             <Text style={styles.titleText}>Tiket</Text>
//           </View>
//         </ProgressStep>
//       </ProgressSteps>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: Constants.statusBarHeight + 10,
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   titleText: {
//     color: "#000000",
//     fontFamily: "PoppinsBold",
//     // marginBottom: 80,
//     alignSelf: "center",
//     fontSize: 15,
//   },
// });

import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button } from "react-native";
import React from "react";
import { ProgressStep, ProgressSteps } from "react-native-progress-stepper";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <ProgressSteps activeStepIconBorderColor="#3D7B3F" completedProgressBarColor="#3D7B3F" completedStepIconColor="#3D7B3F" activeLabelColor="#3D7B3F">
        <ProgressStep label="Pilih Metode">
          <View style={styles.container}>
            {/* Car Details Card */}
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Image style={styles.carImage} source={{ uri: "https://link_to_car_image.com/car.jpg" }} />
                <View style={styles.carInfo}>
                  <Text style={styles.carName}>Innova Zenix</Text>
                  <View style={styles.iconRow}>
                    <Ionicons name="people-outline" size={14} color="#8A8A8A" />
                    <Text style={styles.capacityText}>4</Text>
                    <Ionicons name="bag-outline" size={14} color="#8A8A8A" style={{ marginLeft: 10 }} />
                    <Text style={styles.capacityText}>2</Text>
                  </View>
                  <Text style={styles.priceText}>Rp 230.000</Text>
                </View>
              </View>
            </View>

            {/* Bank Transfer Options */}
            <Text style={styles.sectionTitle}>Pilih Bank Transfer</Text>
            <Text style={styles.sectionDescription}>Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau Mobile Banking</Text>
            <TouchableOpacity style={styles.bankOption}>
              <Text style={styles.bankButtonText}>BCA</Text>
              <Text style={styles.bankOptionText}>BCA Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bankOption}>
              <Text style={styles.bankButtonText}>BNI</Text>
              <Text style={styles.bankOptionText}>BNI Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bankOption}>
              <Text style={styles.bankButtonText}>Mandiri</Text>
              <Text style={styles.bankOptionText}>Mandiri Transfer</Text>
            </TouchableOpacity>

            {/* Promo Code Section */}
            <View style={styles.promoSection}>
              <Text style={styles.promoLabel}>Pakai Kode Promo</Text>
              <TextInput style={styles.promoInput} placeholder="Tulis catatanmu di sini" />
              <Button title="Terapkan" color="#3D7B3F" onPress={() => console.log("Promo Applied")} />
            </View>
          </View>
        </ProgressStep>

        <ProgressStep label="Bayar">
          <View style={{ alignItems: "center" }}>
            <Text style={styles.titleText}>Bayar</Text>
          </View>
        </ProgressStep>

        <ProgressStep label="Tiket">
          <View style={{ alignItems: "center" }}>
            <Text style={styles.titleText}>Tiket</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Rp 230.000</Text>
        <Button title="Bayar" color="#3D7B3F" onPress={() => console.log("Proceed to Payment")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  titleText: {
    color: "#000000",
    fontFamily: "PoppinsBold",
    alignSelf: "center",
    fontSize: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  carImage: {
    width: 80,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  capacityText: {
    fontSize: 14,
    color: "#8A8A8A",
    marginLeft: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3D7B3F",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  bankOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginBottom: 10,
  },
  bankButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bankOptionText: {
    fontSize: 14,
    color: "#8A8A8A",
  },
  promoSection: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  promoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  promoInput: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#EEEEEE",
    padding: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalPrice: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    color: "#000",
  },
});
