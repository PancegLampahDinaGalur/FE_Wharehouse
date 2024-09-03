// import { View, Text, StyleSheet, Image, Button } from "react-native";
// import React, { useEffect, useState } from "react";
// import Constants from "expo-constants";
// import * as SecureStore from "expo-secure-store";
// import { useDispatch, useSelector } from "react-redux";
// import { selectDataAuth, logout } from "@/redux/reducers/auth/loginSlice";
// import { router } from "expo-router";

// // async function getUser() {
// //   const user = await SecureStore.getItem("user");
// //   return user ? JSON.parse(user) : null; // Parse the user data if it exists
// // }

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const { data, isLogin } = useSelector(selectDataAuth);
//   const dispatch = useDispatch();

//   return (
//     <View style={styles.container}>
//       {data?.access_token ? (
//         <>
//           <View>
//             <Text style={styles.titleText}>Akun</Text>
//           </View>
//           <View style={styles.image}>
//             <Image
//               source={require("@/assets/images/Allura - Park 1.png")}
//               style={{ height: 300, width: 300 }}
//             />
//           </View>

//           <Button
//             title={"logout"}
//             onPress={() => {
//               dispatch(logout());
//               router.replace("/(Auth)");
//             }}
//           />
//         </>
//       ) : (
//         <>
//           <Button
//             style={styles.buttonStyle}
//             title={"register"}
//             onPress={() => router.navigate("/(Auth)/register")}
//           />
//         </>
//       )}
//     </View>
//   );
// }

// // const handleLogout = async () => {
// //   await deleteUser();
// //   setUserData(null);
// //   router.navigate("../(auth)");
// // };

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       const userData = await getUser();
// //       setUser(userData); // Set the user data in state
// //     };
// //     fetchUser();
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.header}>
// //         <Text style={styles.titleText}>Akun</Text>
// //         {user ? ( // If user data exists, display user info
// //           <View>
// //             <Text style={styles.cardText}>
// //               {user.name} {/* Display user name */}
// //             </Text>
// //             <Text style={styles.cardText}>
// //               {user.email} {/* Display user email or other data */}
// //             </Text>
// //             <View style={styles.cardContainer}>
// //               <Image
// //                 source={require("@/assets/images/Allura - Park 1.png")}
// //                 style={styles.image} // Use the image style
// //               />
// //               <Button color="#000000" title="Log Out" />

// //             </View>
// //           </View>
// //         ) : (
// //           // If no user data, display image and button
// //           <View style={styles.cardContainer}>
// //             <Image
// //               source={require("@/assets/images/Allura - Park 1.png")}
// //               style={styles.image} // Use the image style
// //             />
// //             <Button color="#3D7B3F" title="Register" />
// //           </View>
// //         )}
// //       </View>
// //     </View>
// //   );
// // }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: Constants.statusBarHeight + 10,
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   titleText: {
//     color: "#000000",
//     fontFamily: "PoppinsBold",
//     // marginBottom: 80,
//     alignSelf: "flex-start",
//     fontSize: 20,
//   },
//   cardContainer: {
//     // marginTop: 80,
//     overflow: "hidden",
//     alignItems: "center",
//   },
//   image: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingBottom: 10,
//   },
//   cardText: {
//     color: "#000000", // Fixed color code
//     fontFamily: "PoppinsBold",
//     fontSize: 10,
//     padding: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonStyle: {
//     paddingTop: 10,
//   },
// });

import { View, Text, StyleSheet, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { selectDataAuth, logout } from "@/redux/reducers/auth/loginSlice";
import { router } from "expo-router";

export default function Profile() {
  const [user, setUser] = useState(null);
  const { data, isLogin } = useSelector(selectDataAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await SecureStore.getItem("user");
      setUser(userData ? JSON.parse(userData) : null); // Set the user data in state
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {data?.access_token ? ( // If user is logged in, display account details
        <>
          <View style={styles.header}>
            <Text style={styles.titleText}>Profile</Text>
          </View>
          <View style={styles.profileContainer}>
            {user && ( // Only display user info if user data exists
              <>
                <Text style={styles.cardText}>{user.name}</Text>
                <Text style={styles.cardText}>{user.email}</Text>
              </>
            )}
            <Image
              source={require("@/assets/images/killua.png")}
              style={styles.image}
            />
            <Text style={styles.cardText}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Obcaecati iusto minus est expedita. Quam, molestias blanditiis?
              Sequi a vero exercitationem doloribus dolores! Consequuntur
              impedit consectetur magni hic, laborum dolorum! Libero quisquam
            </Text>
          </View>
          <View style={styles.footer}>
            <Button
              // style={styles.buttonStyle}
              title={"logout"}
              onPress={() => {
                dispatch(logout());
                router.replace("/(Auth)");
              }}
            />
          </View>
        </>
      ) : (
        // If user is not logged in, display registration button
        <Button
          style={styles.buttonStyle}
          title={"register"}
          onPress={() => router.navigate("/(Auth)/register")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    marginBottom: 20,
  },
  titleText: {
    color: "#000000",
    fontFamily: "PoppinsBold",
    fontSize: 20,
    alignSelf: "flex-start",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    height: 200,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    color: "#000000",
    fontFamily: "PoppinsBold",
    fontSize: 16, // Adjusted font size for better readability
    padding: 10,
    textAlign: "center", // Center text within the card
  },
  buttonStyle: {
    paddingTop: 10,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
});
