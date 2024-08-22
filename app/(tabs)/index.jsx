import { Text, Image, StyleSheet, Platform, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { View } from "react-native";
import Constants from "expo-constants";
import { Row, Column } from "@/components/Grid";
import ButtonIcon from "@/components/ButtonIcon";
import CarList from "@/components/CarList";
import { useState, useEffect } from "react";
// useState: kalo setiap ada perubahan setiap component ada perubahan
//kalo const: tidak

export default function HomeScreen() {
  const [cars, setCars] = useState([]); //variabe yang ngambil data dari array useState.

  useEffect(() => {
    // untuk menTrigger untuk menjalan kan function fetch API ketika screen nya di buka dan melihat ketika ada perubahan di State

    const getData = async () => {
      const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/car"
      );
      const body = await response.json();
      setCars(body);
      // console.log(cars, body);
    };
    getData();
  }, []);

  // useState dan useEffect umeruapakan "HOOK" bawaan REACT

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
      headerImage={
        <View style={styles.container}>
          <View>
            <Text style={styles.tittleText}> Hi, GAESSSS</Text>
            <Text style={styles.tittleText}>Location</Text>
          </View>
          <View>
            <Image
              style={styles.imageProfile}
              source={require("@/assets/images/img_photo.png")}
            />
          </View>
        </View>
      }
    >
      <View style={styles.banner}>
        <View style={styles.bannerContainer}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerText}>
              Sewa Mobil Berkualitas di Kawasanmu
            </Text>
            <Button color="#3d7b3f" title="Sewa Mobil" />
          </View>
          <View>
            <Image source={require("@/assets/images/img_car2.png")} />
          </View>
        </View>
      </View>
      <View>
        <Row justifyContent={"space-between"}>
          <Column style={{ justifyContent: "center", alignItems: "center" }}>
            <ButtonIcon name={"car-outline"} color={"#ffffff"} />
            <Text>Sewa Mobil</Text>
          </Column>
          <Column style={{ justifyContent: "center", alignItems: "center" }}>
            <ButtonIcon name={"cube-outline"} color={"#ffffff"} />
            <Text>Oleh-Oleh</Text>
          </Column>
          <Column style={{ justifyContent: "center", alignItems: "center" }}>
            <ButtonIcon name={"key-outline"} color={"#ffffff"} />
            <Text>Penginapan</Text>
          </Column>
          <Column style={{ justifyContent: "center", alignItems: "center" }}>
            <ButtonIcon name={"camera-outline"} color={"#ffffff"} />
            <Text>Wisata</Text>
          </Column>
        </Row>
      </View>
      <View>
        {cars.length > 0 &&
          cars.map((el) => (
            <CarList
              key={el.id}
              image={{ uri: el.image }}
              carName={el.name}
              passenger={5}
              baggage={2}
              price={el.price}
            />
          ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  tittleText: {
    color: "#ffffff",
    fontFamily: "PoppinsBold",
  },
  imageProfile: {
    height: 35,
    width: 35,
  },
  imageCar: {
    height: 200,
    width: 200,
  },
  banner: {
    flex: 1,
    marginTop: -130,
    backgroundColor: "#AF392F",
    overflow: "hidden",
    paddingTop: 20,
    borderRadius: 5,
  },
  bannerContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bannerText: {
    color: "#ffffff",
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
  bannerTextContainer: {
    width: "45%",
    padding: 10,
    paddingBottom: 25,
  },
});
