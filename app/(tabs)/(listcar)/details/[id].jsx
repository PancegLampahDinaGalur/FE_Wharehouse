import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import Constants from "expo-constants";
import { Row, Column } from "@/components/Grid";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { getCarDetail, selectCar } from "@/redux/reducers/car/carDetailSlice";
import { router } from "expo-router";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

// export default function details() {
//   const { id } = useLocalSearchParams();
//   const [cars, setCars] = useState({});
//   const [loading, setLoading] = useState(false);

export default function details() {
  // const [cars, setCars] = useState([]);
  // const [loading, setLoading] = useState(false);
  const { data } = useSelector(selectCar);
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  // console.log(data);
  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    dispatch(getCarDetail({ id, signal }));

    return () => {
      //cancel req sebelum component di close
      controller.abort();
    };
  }, []);

  // useEffect(() => {
  //   const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
  //   const signal = controller.signal; // UseEffect cleanup

  //   setLoading(true); //loading state
  //   const getData = async () => {
  //     console.log(id);
  //     try {
  //       const response = await fetch(
  //         "https://api-car-rental.binaracademy.org/customer/car/" + id,
  //         { signal: signal } // UseEffect cleanup
  //       );
  //       const body = await response.json();
  //       setCars(body);
  //     } catch (e) {
  //       // Error Handling
  //       if (err.name === "AbortError") {
  //         console.log("successfully aborted");
  //       } else {
  //         console.log(err);
  //       }
  //     }
  //   };
  //   getData();
  //   return () => {
  //     // cancel request sebelum component di close
  //     controller.abort();
  //   };
  // }, [id]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}> {data.name} </Text>
        <Row justifyContent={"center"}>
          <Column style={styles.textIcon}>
            <Ionicons
              // style={styles.iconStyle}
              size={14}
              name={"people-outline"}
              color={"#8A8A8A"}
            />
            <Text style={styles.capacityText}>{5}</Text>
          </Column>
          <Column style={styles.textIcon}>
            <Ionicons
              // style={styles.iconStyle}
              size={14}
              name={"bag-outline"}
              color={"#8A8A8A"}
            />
            <Text style={styles.capacityText}>{4}</Text>
          </Column>
        </Row>
        <Image style={styles.imgCar} source={{ uri: data.image }} />

        {/* Card Below the Image */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detail Mobil</Text>
          <Text style={styles.cardText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatCurrency.format(data.price)}</Text>
        <Button
          color="#3D7B3F"
          title="Lanjutkan Pembayaran"
          onPress={() => router.navigate("/(order)")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flex: 1, // Allow the container to take full height
    alignItems: "center", // Center items horizontally
    // paddingHorizontal: 20,
  },
  titleText: {
    color: "#000000",
    fontFamily: "PoppinsBold",
    // marginBottom: 80, // Add margin to separate text from image
    alignSelf: "center", // Align text to the left
    fontSize: 20,
  },
  imgCar: {
    width: "70%", // Set width to 100% to fit the screen
    height: "70%", // Maintain aspect ratio
    aspectRatio: 1, // Adjust this value based on the image's aspect ratio
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  price: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#EEEEEE",
    position: "fixed",
    bottom: 0,
    padding: 20,
    width: "100%",
  },
  textDesc: {
    padding: 30,
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
  },
  descText: {
    textAlign: "center", // Center the text
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  card: {
    backgroundColor: "#FFFFFF", // Card background color
    borderRadius: 10, // Rounded corners
    padding: 15, // Padding inside the card
    marginTop: 20, // Space above the card
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 3, // For Android shadow
    width: "90%", // Width of the card
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18, // Title font size
    fontWeight: "bold", // Title font weight
    marginBottom: 10, // Space below the title
  },
  cardText: {
    fontSize: 14, // Text font size
    color: "#333", // Text color
  },
});
