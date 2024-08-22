import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import CarList from "@/components/CarList";
import Constants from "expo-constants";

export default function listcar() {
  const [cars, setCars] = useState([]); //variabe yang ngambil data dari array useState.

  useEffect(() => {
    // untuk menTrigger untuk menjalan kan function fetch API ketika screen nya di buka dan melihat ketika ada perubahan di State

    const getData = async () => {
      const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/car"
      );
      const body = await response.json();
      if (Array.isArray(body)) {
        // Check if body is an array
        setCars(body);
      } else {
        console.error("Fetched data is not an array:", body);
      }
      console.log(cars, body);
    };
    getData();
  }, []);

  const Item = ({ item: el }) => (
    <CarList
      key={el.id}
      image={{ uri: el.image }}
      carName={el.name}
      passenger={5}
      baggage={2}
      price={el.price}
    />
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.tittleText}>Daftar Mobil</Text>
      </View>
      <View>
        {cars.length > 0 ? (
          <FlatList
            data={cars}
            renderItem={Item}
            keyExtractor={(el) => el.id}
          />
        ) : (
          <View>
            <Text>No Data</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: Constants.statusBarHeight,
    padding: 20,
    // backgroundColor: "#000", // Optional: Add background color for the header
  },
  tittleText: {
    // color: "#ffffff",
    fontFamily: "PoppinsBold",
    fontSize: 24, // Optional: Increase font size for header
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  listContainer: {
    alignItems: "center",
    // justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
