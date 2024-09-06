import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router"; // Make sure to import Link from expo-router
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalPopup from "../../components/modal";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import {
  postlogin,
  selectDataAuth,
  closeModal,
} from "@/redux/reducers/auth/loginSlice";
import { Formik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

async function save(value) {
  await SecureStore.setItemAsync("user", JSON.stringify(value));
}

export default function index() {
  const { data, errorMessage, isModalVisible, isError, isLogin } =
    useSelector(selectDataAuth);
  // const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    console.log(values);
    dispatch(postlogin(values));
    await save(data);
  };

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        dispatch(closeModal());
        if (!isError) {
          router.replace("../(tabs)");
        }
      }, 1000);
    }
  }, [isModalVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/images/logo-tmmin.png")} />
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
      <>
        <Text style={styles.title}>Welcome Back!</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit} // Correctly pass handleSubmit
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Contoh: padjar@gmail.com"
                    keyboardType="email-address"
                  />
                </View>
                {errors.email && touched.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholder="6+ karakter"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>
              <View>
                <TouchableOpacity
                  onPress={handleSubmit} // Call handleSubmit directly
                  style={styles.signInButton}
                >
                  <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </>

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
  // input: {
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   borderRadius: 5,
  //   padding: 10,
  //   fontSize: 16,
  //   flex: 1,
  // },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  passwordInput: {
    flex: 1,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
