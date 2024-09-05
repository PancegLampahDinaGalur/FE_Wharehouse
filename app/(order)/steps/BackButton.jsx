import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have installed @expo/vector-icons

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="arrow-back" size={24} color="black" />
      <Text style={styles.text}>Pembayaran</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BackButton;
