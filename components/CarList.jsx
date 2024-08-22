import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Row, Column } from "./Grid";
import Ionicons from "@expo/vector-icons/Ionicons";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "idr",
});

export default function CarList({ image, carName, passenger, baggage, price }) {
  return (
    <View style={styles.card}>
      <Row alignItems={"center"} gap={30}>
        <Column>
          <Image style={styles.img} source={image} />
        </Column>
        <Column>
          <Text style={styles.carName}>{carName}</Text>
          <Row>
            <Column style={styles.textIcon}>
              <Ionicons size={14} name="people-outline" color="#8A8A8A" />
              <Text style={styles.capacityText}>{passenger}</Text>
            </Column>
            <Column style={styles.textIcon}>
              <Ionicons size={14} name="bag-outline" color="#8A8A8A" />
              <Text style={styles.capacityText}>{baggage}</Text>
            </Column>
          </Row>
          <Text style={styles.price}>{formatCurrency.format(price)}</Text>
        </Column>
      </Row>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    shadowColor: "#000000",
    elevation: 1.5,
    borderRadius: 2,
    padding: 20,
    marginBottom: 10,
  },
  img: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },

  carName: {
    fontSize: 14,
  },
  capacityText: {
    color: "#8A8A8A",
  },
  price: {
    color: "#5CB85F",
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
