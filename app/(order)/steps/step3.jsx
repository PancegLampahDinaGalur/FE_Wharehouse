import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

export default function step3() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tiket</Text>
      <Text style={styles.orderId}>Order ID: xxxxxxxx</Text>
      <View style={styles.invoiceContainer}>
        <Text>Invoice</Text>
        <Text style={styles.invoice}>INV/xx/xx-xxxx/</Text>
        <Button
          title="Download"
          onPress={() => {
            /* Handle download */
          }}
        />
      </View>
      <View style={styles.ticketContainer}>
        <Text>E-Tiket</Text>
        <View style={styles.pdfViewer}>
          <Text>PDF Viewer</Text>
        </View>
        <Text style={styles.instructions}>
          Tunjukkan tiket ini ke petugas JBO di pos penjemputan Anda.
        </Text>
      </View>
      <Button
        title="Lihat Daftar Pesanan"
        onPress={() => {
          /* Handle navigation */
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  orderId: {
    marginVertical: 10,
  },
  invoiceContainer: {
    marginVertical: 20,
  },
  invoice: {
    fontWeight: "bold",
  },
  ticketContainer: {
    marginVertical: 20,
  },
  pdfViewer: {
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  instructions: {
    marginVertical: 10,
  },
});
