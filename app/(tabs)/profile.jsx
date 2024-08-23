import { View, Text, StyleSheet, Image, Button } from "react-native";
import React from "react";
import Constants from "expo-constants";

export default function profile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Akun</Text>
        <View style={styles.cardContainer}>
          <Image
            source={require("@/assets/images/Allura - Park 1.png")}
            // style={styles.image}
          />
          <View>
            <Text style={styles.cardText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              consequuntur excepturi iusto enim magni nihil sit veniam ex
              accusamus officiis?
            </Text>
            <Button color="#3D7B3F" title="Register" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flex: 1, // Allow the container to take full height
    // alignItems: "center", // Center items horizontally
    paddingHorizontal: 20,
  },
  titleText: {
    color: "#000000",
    fontFamily: "PoppinsBold",
    marginBottom: 80, // Add margin to separate text from image
    alignSelf: "flex-start", // Align text to the left
    fontSize: 20,
  },
  cardContainer: {
    // backgroundColor: "#AF392F",
    marginTop: 80, // Adjust margin as needed
    overflow: "hidden",
    alignItems: "center", // Center the image within the card
  },
  image: {
    width: 100, // Set width for the image
    height: 100, // Set height for the image
  },
  cardText: {
    color: "000000",
    fontFamily: "PoppinsBold",
    fontSize: 10,
    padding: 10,
    alignContent: "center",
  },
});
