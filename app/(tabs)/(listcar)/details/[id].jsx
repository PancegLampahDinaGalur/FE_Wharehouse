// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   StyleSheet,
//   Button,
// } from "react-native";
// import React from "react";
// import { useLocalSearchParams } from "expo-router";
// import { useState, useEffect } from "react";
// import Constants from "expo-constants";
// import { Row, Column } from "@/components/Grid";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { useSelector, useDispatch } from "react-redux";
// import { getCarDetail, selectCar } from "@/redux/reducers/car/carDetailSlice";
// import { router } from "expo-router";

// const formatCurrency = new Intl.NumberFormat("id-ID", {
//   style: "currency",
//   currency: "IDR",
// });

// // export default function details() {
// //   const { id } = useLocalSearchParams();
// //   const [cars, setCars] = useState({});
// //   const [loading, setLoading] = useState(false);

// export default function details() {
//   // const [cars, setCars] = useState([]);
//   // const [loading, setLoading] = useState(false);
//   const { data } = useSelector(selectCar);
//   const { id } = useLocalSearchParams();
//   const dispatch = useDispatch();
//   // console.log(data);
//   useEffect(() => {
//     const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
//     const signal = controller.signal; // UseEffect cleanup

//     dispatch(getCarDetail({ id, signal }));

//     return () => {
//       //cancel req sebelum component di close
//       controller.abort();
//     };
//   }, []);

//   // useEffect(() => {
//   //   const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
//   //   const signal = controller.signal; // UseEffect cleanup

//   //   setLoading(true); //loading state
//   //   const getData = async () => {
//   //     console.log(id);
//   //     try {
//   //       const response = await fetch(
//   //         "https://api-car-rental.binaracademy.org/customer/car/" + id,
//   //         { signal: signal } // UseEffect cleanup
//   //       );
//   //       const body = await response.json();
//   //       setCars(body);
//   //     } catch (e) {
//   //       // Error Handling
//   //       if (err.name === "AbortError") {
//   //         console.log("successfully aborted");
//   //       } else {
//   //         console.log(err);
//   //       }
//   //     }
//   //   };
//   //   getData();
//   //   return () => {
//   //     // cancel request sebelum component di close
//   //     controller.abort();
//   //   };
//   // }, [id]);

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <Text style={styles.titleText}> {data.name} </Text>
//         <Row justifyContent={"center"}>
//           <Column style={styles.textIcon}>
//             <Ionicons
//               // style={styles.iconStyle}
//               size={14}
//               name={"people-outline"}
//               color={"#8A8A8A"}
//             />
//             <Text style={styles.capacityText}>{5}</Text>
//           </Column>
//           <Column style={styles.textIcon}>
//             <Ionicons
//               // style={styles.iconStyle}
//               size={14}
//               name={"bag-outline"}
//               color={"#8A8A8A"}
//             />
//             <Text style={styles.capacityText}>{4}</Text>
//           </Column>
//         </Row>
//         <Image style={styles.imgCar} source={{ uri: data.image }} />

//         {/* Card Below the Image */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Detail Mobil</Text>
//           <Text style={styles.cardText}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </Text>
//         </View>
//       </ScrollView>
//       <View style={styles.footer}>
//         <Text style={styles.price}>{formatCurrency.format(data.price)}</Text>
//         <Button
//           color="#3D7B3F"
//           title="Lanjutkan Pembayaran"
//           onPress={() => router.navigate("/(order)")}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: Constants.statusBarHeight + 10,
//     flex: 1, // Allow the container to take full height
//     alignItems: "center", // Center items horizontally
//     // paddingHorizontal: 20,
//   },
//   titleText: {
//     color: "#000000",
//     fontFamily: "PoppinsBold",
//     // marginBottom: 80, // Add margin to separate text from image
//     alignSelf: "center", // Align text to the left
//     fontSize: 20,
//   },
//   imgCar: {
//     width: "70%", // Set width to 100% to fit the screen
//     height: "70%", // Maintain aspect ratio
//     aspectRatio: 1, // Adjust this value based on the image's aspect ratio
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   price: {
//     fontFamily: "PoppinsBold",
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   footer: {
//     backgroundColor: "#EEEEEE",
//     position: "fixed",
//     bottom: 0,
//     padding: 20,
//     width: "100%",
//   },
//   textDesc: {
//     padding: 30,
//     alignItems: "center", // Center items horizontally
//     justifyContent: "center", // Center items vertically
//   },
//   descText: {
//     textAlign: "center", // Center the text
//   },
//   textIcon: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 2,
//   },
//   iconStyle: {
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//   },
//   textIcon: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 2,
//   },
//   card: {
//     backgroundColor: "#FFFFFF", // Card background color
//     borderRadius: 10, // Rounded corners
//     padding: 15, // Padding inside the card
//     marginTop: 20, // Space above the card
//     shadowColor: "#000", // Shadow color
//     shadowOffset: { width: 0, height: 2 }, // Shadow offset
//     shadowOpacity: 0.2, // Shadow opacity
//     shadowRadius: 4, // Shadow radius
//     elevation: 3, // For Android shadow
//     width: "90%", // Width of the card
//     justifyContent: "center",
//   },
//   cardTitle: {
//     fontSize: 18, // Title font size
//     fontWeight: "bold", // Title font weight
//     marginBottom: 10, // Space below the title
//   },
//   cardText: {
//     fontSize: 14, // Text font size
//     color: "#333", // Text color
//   },
// });

import { View, Text, ScrollView, Image, StyleSheet, Button } from "react-native";
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

export default function Details() {
  const { data } = useSelector(selectCar);
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getCarDetail({ id, signal }));

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>{data.name}</Text>
        <Row justifyContent={"center"} style={styles.iconRow}>
          <Column style={styles.textIcon}>
            <Ionicons size={14} name={"people-outline"} color={"#8A8A8A"} />
            <Text style={styles.capacityText}>{5}</Text>
          </Column>
          <Column style={styles.textIcon}>
            <Ionicons size={14} name={"bag-outline"} color={"#8A8A8A"} />
            <Text style={styles.capacityText}>{4}</Text>
          </Column>
        </Row>
        <Image style={styles.imgCar} source={{ uri: data.image }} />

        {/* Card Below the Image */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tentang Paket</Text>
          <View style={styles.packageSection}>
            <Text style={styles.packageTitle}>Include</Text>
            <Text style={styles.packageItem}>Apa saja yang termasuk dalam paket misal durasi max 12 jam</Text>
            <Text style={styles.packageItem}>Sudah termasuk bensin selama 12 jam</Text>
            <Text style={styles.packageItem}>Sudah termasuk Tiket Wisata</Text>
            <Text style={styles.packageItem}>Sudah termasuk pajak</Text>
          </View>
          <View style={styles.packageSection}>
            <Text style={styles.packageTitle}>Exclude</Text>
            <Text style={styles.packageItem}>Tidak termasuk biaya makan sopir Rp 75.000/hari</Text>
            <Text style={styles.packageItem}>Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam</Text>
            <Text style={styles.packageItem}>Tidak termasuk akomodasi penginapan</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatCurrency.format(data.price)}</Text>
        <Button color="#3D7B3F" title="Lanjutkan Pembayaran" onPress={() => router.navigate("/(order)")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  titleText: {
    color: "#000000",
    fontFamily: "PoppinsBold",
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  iconRow: {
    marginBottom: 10,
  },
  imgCar: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  packageSection: {
    marginBottom: 15,
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  packageItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  footer: {
    backgroundColor: "#EEEEEE",
    padding: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    color: "#000",
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
