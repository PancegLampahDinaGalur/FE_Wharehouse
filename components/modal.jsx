import { View, Text, Modal } from "react-native";
import React from "react";

export default function ModalPopup({ visible, children }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible} //untuk nampilkan modal menggunkan profs
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // menggunkan bgcolor hitam dan transfaransi 5</Modal>
        }}
      >
        {children}
      </View>
    </Modal>
  );
}
