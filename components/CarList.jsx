import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Row, Column } from "./Grid";
import Ionicons from "@expo/vector-icons/Ionicons";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function CarList({
  image,
  carName,
  passengers,
  baggage,
  price,
  style,
  onPress,
}) {
  return (
    <Pressable style={{ ...styles.card, ...style }} onPress={onPress}>
      <Row alignItems={"center"} gap={20}>
        <Column>
          <Image style={styles.img} source={image} />
        </Column>
        <Column>
          <Text style={styles.carName}>{carName}</Text>
          <Row gap={5}>
            <Column style={styles.textIcon}>
              <Ionicons size={14} name={"people-outline"} color={"#8A8A8A"} />
              <Text style={styles.capacityText}>{passengers}</Text>
            </Column>
            <Column style={styles.textIcon}>
              <Ionicons size={14} name={"bag-outline"} color={"#8A8A8A"} />
              <Text style={styles.capacityText}>{baggage}</Text>
            </Column>
          </Row>
          <Text style={styles.price}>{formatCurrency.format(price)}</Text>
        </Column>
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "rgba(0,0,0,1)",
    // shadowOffset: {
    //     width: 0,
    //     height: 3,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 1.5,
    elevation: 2,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
    borderRadius: 2,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  img: {
    width: 80,
    height: 80,
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
