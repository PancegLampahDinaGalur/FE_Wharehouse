import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Footer = ({ price, buttonText, onPress, disabled, buttonColor }) => {
  const formatCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const formatIDR = (price) => formatCurrency.format(price);

  return (
    <View style={styles.footer}>
      <Text style={styles.price}>{formatIDR(price)}</Text>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: buttonColor },
          disabled && styles.buttonDisabled,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: "#d3d3d3",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Footer;
