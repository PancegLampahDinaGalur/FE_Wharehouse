import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialIcons";

export default GeoLocation = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Location Loading....."
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  //check if location is enable or not
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync(); //returns true or false
    if (!enabled) {
      //if not enable
      Alert.alert("Location not enabled", "Please enable your Location", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      setLocationServicesEnabled(enabled); //store true into state
    }
  };
  //get current location
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync(); //used for the pop up box where we give permission to use location
    console.log(status);
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    //get current position lat and long
    const { coords } = await Location.getCurrentPositionAsync();
    console.log(coords);

    if (coords) {
      const { latitude, longitude } = coords;
      console.log(latitude, longitude);

      //provide lat and long to get the the actual address
      let responce = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(responce);
      //loop on the responce to get the actual result
      for (let item of responce) {
        const loc =
          item.name !== ""
            ? `${item.name} ${item.city}`
            : `${item.region}, ${item.country}`;
        let address = loc;
        setDisplayCurrentAddress(address);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="location-on" size={20} color="#FFF" style={styles.icon} />
      <Text style={styles.addressText}>{displayCurrentAddress}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  addressText: {
    color: "#FFF", // Change text color to white
    fontFamily: "PoppinsBold",
    fontSize: 12,
  },
});
