import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalPopup from "../../components/modal";

export default function register() {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
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
    try {
      const req = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: "Costumer",
          }),
        }
      );
      const body = await req.json();
      if (!req.ok)
        throw new Error(body.message || body[0].message || "Ada Kesalahan!!");
      console.log(body);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        router.navigate("/");
      }, 1000);
    } catch (e) {
      console.log(e);
      console.log(e.message);
      setErrorMessage(e.message);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setErrorMessage(null);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/images/logo-tmmin.png")} />
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Pajar"
          keyboardType="Nama Lengkap"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email*</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Contoh: Pajar22@gmail.com"
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
        style={styles.signInButton}
      >
        <Text style={styles.signInButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Have an account? </Text>
        <Link href="/" style={styles.signUpLink}>
          Sign In
        </Link>
      </View>
      <ModalPopup visible={modalVisible}>
        <View style={styles.modalBackground}>
          <Ionicons
            size={70}
            name={
              errorMessage == null ? "checkmark-circle-outline" : "close-circle"
            }
          />
          {errorMessage == null ? (
            <>
              <Text>Register Berhasil!</Text>
              <Text>Silahkan Login</Text>
            </>
          ) : (
            <Text>{errorMessage}</Text>
          )}
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
  logo: {
    width: 200,
    height: 40,
    resizeMode: "contain",
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
