import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router"; // Pastikan import Link dari expo-router
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalPopup from "../../components/modal";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import {
  postlogin,
  selectDataAuth,
  closeModal,
} from "@/redux/reducers/auth/loginSlice";
import { NavigationHelpersContext } from "@react-navigation/native";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function index() {
  const { errorMessage, isModalVisible, isError, isLogin } =
    useSelector(selectDataAuth);
  const [modalVisible, setModalVisible] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  // const [status, setStatus] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text,
    });
    console.log(formData);
  };
  const handleSubmit = async () => {
    console.log("test submit", formData);
    dispatch(postlogin(formData));
  };

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        dispatch(closeModal());
        if (!isError) router.replace("../(tabs)");
      }, 1000);
    }
  }, [isModalVisible]);

  // useEffect(() => {
  //   if (isError) {
  //     setModalVisible(true);
  //     setTimeout(() => {
  //       setModalVisible(false);
  //     }, 1000);
  //   }
  // }, [isError]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/images/logo-tmmin.png")} />
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Welcome Back!</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Contoh: padjar@gmail.com"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange("password", text)}
          placeholder="6+ karakter"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        onPress={() => handleSubmit(true)}
        // onPress={() => router.navigate("../(tabs)")}
        style={styles.signInButton}
      >
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <Link href="../(Auth)/register" style={styles.signUpLink}>
          Sign Up for free
        </Link>
      </View>
      <ModalPopup visible={isModalVisible}>
        <View style={styles.modalBackground}>
          <Ionicons
            size={70}
            name={!isError ? "checkmark-circle-outline" : "close-circle"}
          />
          <Text>{!isError ? "Login Berhasil!" : errorMessage}</Text>
        </View>
      </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    fontFamily: "PoppinsRegular",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  signInButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
  modalBackground: {
    width: "90%",
    backgroundColor: "#fff",
    elevation: 20,
    borderRadius: 4,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
