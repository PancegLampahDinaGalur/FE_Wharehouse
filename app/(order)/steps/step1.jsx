import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder, setStateByName } from "@/redux/reducers/order/orderSlice";
import { selectCar } from "@/redux/reducers/car/carDetailSlice";
import CarList from "@/components/CarList";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const paymentMethods = [
  { bankName: "BCA", account: 12345678, name: "a. n Super Travel" },
  { bankName: "MANDIRI", account: 12345678, name: "a. n Super Travel" },
  { bankName: "BNI", account: 12345678, name: "a. n Super Travel" },
];

export default function step1({ setActiveStep }) {
  // Assuming setActiveStep is passed as a prop
  const [promoText, setPromoText] = useState(null);
  const { selectedBank, promo } = useSelector(selectOrder);
  const { data } = useSelector(selectCar);
  const dispatch = useDispatch();
  const formatIDR = useCallback((price) => formatCurrency.format(price), []); // callback to memoize the function

  return (
    <View style={styles.container}>
      <ScrollView>
        <CarList
          image={{ uri: data.image }}
          carName={data.name}
          passengers={5}
          baggage={4}
          price={data.price}
        />
        <Text style={styles.textBold}>Pilih Bank Transfer</Text>
        <Text style={styles.textBold}>
          Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau
          Mobile Banking
        </Text>
        <View style={{ marginBottom: 10 }}>
          {paymentMethods.map((e) => (
            <Button
              key={e.bankName}
              style={styles.paymentMethod}
              onPress={() =>
                dispatch(setStateByName({ name: "selectedBank", value: e }))
              }
            >
              <Text style={styles.paymentBox}>{e.bankName}</Text>
              <Text style={styles.paymentText}>{e.bankName} Transfer</Text>
              {selectedBank?.bankName === e.bankName && (
                <Ionicons
                  style={styles.check}
                  color={"#3D7B3F"}
                  size={20}
                  name={"checkmark"}
                />
              )}
            </Button>
          ))}
        </View>
        <View style={styles.promoContainer}>
          <Text style={styles.promoTitle}>% Pakai Kode Promo</Text>
          <View style={styles.promoForm}>
            {!promo ? (
              <>
                <TextInput
                  style={styles.promoInput}
                  onChangeText={(val) => setPromoText(val)}
                  placeholder="Tulis promomu disini"
                />
                <Button
                  style={styles.promoButton}
                  onPress={() =>
                    dispatch(
                      setStateByName({
                        name: "promo",
                        value: promoText,
                      })
                    )
                  }
                  title={"Terapkan"}
                  color="#3D7B3F"
                />
              </>
            ) : (
              <View style={styles.promoTextWrapper}>
                <Text style={styles.promoText}>{promo}</Text>
                <Pressable
                  onPress={() =>
                    dispatch(
                      setStateByName({
                        name: "promo",
                        value: null,
                      })
                    )
                  }
                >
                  <Ionicons
                    style={styles.check}
                    color={"#880808"}
                    size={30}
                    name={"close"}
                  />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatIDR(data.price || 0)}</Text>
          <View style={styles.buttonContainer}>
            <Button
              disabled={!selectedBank}
              color="#3D7B3F"
              onPress={() => {
                setActiveStep(1);
              }}
              title="Lanjutkan Pembayaran"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  textBold: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#D0D0D0",
  },
  paymentBox: {
    width: "35%",
    textAlign: "center",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "#D0D0D0",
    marginRight: 10,
  },
  paymentText: {
    fontSize: 14,
    color: "#000000",
    flex: 1,
    textAlign: "left",
    paddingTop: 10,
    fontFamily: "PoppinsBold",
  },
  footerContainer: {
    flex: 1,
    padding: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  price: {
    flexDirection: "row",
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  buttonContainer: {
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  promoContainer: {
    marginTop: 30,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "PoppinsBold",
  },
  promoForm: {
    flexDirection: "row",
    marginBottom: 10,
  },
  promoInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#000",
    width: "70%",
  },
  promoButton: {
    width: "30%",
    borderWidth: 1,
    borderColor: "#3D7B3F",
  },
  promoTextWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promoText: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  check: {
    marginLeft: "auto",
  },
});
