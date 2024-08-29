import { View, Text, StyleSheet, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

async function getUser() {
  const user = await SecureStore.getItem("user");
  return user ? JSON.parse(user) : null; // Parse the user data if it exists
}

export default function Profile() {
  const [user, setUser] = useState(null);

  // const handleLogout = async () => {
  //   await deleteUser();
  //   setUserData(null);
  //   router.navigate("../(auth)");
  // };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData); // Set the user data in state
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Akun</Text>
        {user ? ( // If user data exists, display user info
          <View>
            <Text style={styles.cardText}>
              {user.name} {/* Display user name */}
            </Text>
            <Text style={styles.cardText}>
              {user.email} {/* Display user email or other data */}
            </Text>
            <View style={styles.cardContainer}>
              <Image
                source={require("@/assets/images/Allura - Park 1.png")}
                style={styles.image} // Use the image style
              />
              <Button color="#000000" title="Log Out" />
              {/* onPress={handleLogout} */}
            </View>
          </View>
        ) : (
          // If no user data, display image and button
          <View style={styles.cardContainer}>
            <Image
              source={require("@/assets/images/Allura - Park 1.png")}
              style={styles.image} // Use the image style
            />
            <Button color="#3D7B3F" title="Register" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  titleText: {
    color: "#000000",
    fontFamily: "PoppinsBold",
    marginBottom: 80,
    alignSelf: "flex-start",
    fontSize: 20,
  },
  cardContainer: {
    marginTop: 80,
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: 290,
    height: 290,
  },
  cardText: {
    color: "#000000", // Fixed color code
    fontFamily: "PoppinsBold",
    fontSize: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
