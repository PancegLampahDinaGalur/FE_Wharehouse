import { Text, Image, StyleSheet, Platform, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxFlatList from "@/components/ParallaxFlatList";
import { Link } from "expo-router";
import { View } from "react-native";
import Constants from "expo-constants";
import { Row, Column } from "@/components/Grid";
import ButtonIcon from "@/components/ButtonIcon";
import CarList from "@/components/CarList";
import { useState, useEffect } from "react";
import { router } from "expo-router";
// useState: kalo setiap ada perubahan setiap component ada perubahan
//kalo const: tidak

export default function HomeScreen() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    setLoading(true); //loading state
    const getData = async () => {
      try {
        const response = await fetch(
          "https://api-car-rental.binaracademy.org/customer/car",
          { signal: signal } // UseEffect cleanup
        );
        const body = await response.json();
        setCars(body);
      } catch (e) {
        // Error Handling
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      }
    };
    getData();
    return () => {
      // cancel request sebelum component di close
      controller.abort();
    };
  }, []);

  return (
    <ParallaxFlatList
      headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
      headerImage={
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>Hi, Nama</Text>
            <Text style={styles.titleText}>Location</Text>
          </View>
          <View>
            <Image
              style={styles.imageProfile}
              source={require("@/assets/images/img_photo.png")}
            />
          </View>
        </View>
      }
      banner={
        <>
          <View style={styles.banner}>
            <View style={styles.bannerContainer}>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerText}>
                  Sewa Mobil Berkualitas di kawasanmu
                </Text>
                <Button color="#3D7B3F" title="Sewa Mobil" />
              </View>
              <View>
                <Image source={require("@/assets/images/img_car.png")} />
              </View>
            </View>
          </View>
          <View>
            <Row justifyContent={"space-between"}>
              <Column
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <ButtonIcon
                  text={"Sewa Mobil"}
                  name={"car-outline"}
                  color={"#ffffff"}
                />
                <Text style={styles.butText}> Sewa Mobil </Text>
              </Column>
              <Column
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <ButtonIcon
                  text={"Oleh-Oleh"}
                  name={"cube-outline"}
                  color={"#ffffff"}
                />
                <Text style={styles.butText}> Oleh-Oleh </Text>
              </Column>
              <Column
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <ButtonIcon
                  text={"Penginapan"}
                  name={"key-outline"}
                  color={"#ffffff"}
                />
                <Text style={styles.butText}> Penginapan </Text>
              </Column>
              <Column
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <ButtonIcon
                  text={"Wisata"}
                  name={"camera-outline"}
                  color={"#ffffff"}
                />
                <Text style={styles.butText}> Wisata </Text>
              </Column>
            </Row>
            <View style={styles.subText}>
              <Text style={styles.subText}> Daftar Mobil Terbaik </Text>
            </View>
          </View>
        </>
      }
      loading={loading}
      data={cars}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CarList
          style={{ marginHorizontal: 20 }}
          key={item.id}
          image={{ uri: item.image }}
          carName={item.name}
          passengers={5}
          baggage={4}
          price={item.price}
          onPress={() => router.navigate("(listcar)/details/" + item.id)}
        />
      )}
      viewabilityConfig={{
        waitForInteraction: true,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  titleText: {
    color: "#ffffff",
    fontFamily: "PoppinsBold",
  },
  imageProfile: {
    height: 35,
    width: 35,
  },
  banner: {
    backgroundColor: "#AF392F",
    marginTop: -100,
    overflow: "hidden",
    borderRadius: 5,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bannerTextContainer: {
    width: "45%",
    padding: 15,
  },
  bannerText: {
    color: "#ffffff",
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
  butText: {
    color: "#000000",
    fontFamily: "PoppinsBold",
    // fontSize: 20,
  },
  subText: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    color: "#000000",
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
});
