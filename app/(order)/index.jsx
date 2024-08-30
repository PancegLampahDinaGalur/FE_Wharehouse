import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ProgressStep, ProgressSteps } from "react-native-progress-stepper";
import Constants from "expo-constants";

export default function index() {
  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps>
        <ProgressStep label="Pilih Metode">
          <View style={{ alignItems: "center" }}>
            <Text style={styles.titleText}>Pilih Metode Pembayaran</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flex: 1,
    paddingHorizontal: 20,
  },
  titleText: {
    color: "#000000",
    fontFamily: "PoppinsBold",
    // marginBottom: 80,
    alignSelf: "center",
    fontSize: 15,
  },
});
