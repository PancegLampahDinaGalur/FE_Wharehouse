import { View, Text } from "react-native";
import { ProgressStep, ProgressSteps } from "react-native-progress-stepper";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Footer from "./steps/Footer";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCar } from "@/redux/reducers/car/carDetailSlice";
import {
  selectOrder,
  setStateByName,
  postOrder,
  setCarId,
  resetState,
} from "@/redux/reducers/order/orderSlice";
import { selectDataAuth } from "@/redux/reducers/auth/loginSlice";
import moment from "moment";
// export const selectDataAuth = state => state.dataLogin; //selector

export default function Index() {
  const dispatch = useDispatch(); // Initialize dispatch
  const [activeStep, setActiveStep] = useState(0);
  const { data } = useSelector(selectCar);
  const { selectedBank, dataOrder, isLoading } = useSelector(selectOrder);

  // Define startRentAt and finishRentAt based on your logic
  const startRentAt = new Date(); // Example: current date/time
  const finishRentAt = new Date(startRentAt.getTime() + 24 * 60 * 60 * 1000); // Example: 1 day later
  const token = useSelector(selectDataAuth).data.access_token;
  const formData = {
    carId: data.id,
    startRentAt: startRentAt,
    finishRentAt: finishRentAt,
  };

  const handleNextPress = async () => {
    const payload = {
      formData: {
        start_rent_at: moment().format("YYYY-MM-DD"),
        finish_rent_at: moment().add(4, "day").format("YYYY-MM-DD"),
        car_id: data.id,
      },
      token: token,
    };
    await dispatch(postOrder(payload));
    setActiveStep(1);
  };

  useEffect(() => {
    // console.log("dataOrder Before: ", dataOrder);
    // dispatch(resetState());
    console.log("dataOrder After: ", dataOrder);
    if (Object.keys(dataOrder).length > 0 && !isLoading) {
      console.log("dataOrder", dataOrder);
      setActiveStep(activeStep + 1);
    }
  }, []);

  useEffect(() => {
    if (activeStep === 1) {
      // dispatch(resetState()); // Reset state when activeStep is 1
    }
    console.log(activeStep);
  }, [activeStep]);

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ flex: 1 }}>
        <ProgressSteps activeStep={activeStep}>
          <ProgressStep label="Pilih Metode" removeBtnRow={true}>
            <Step1 setActiveStep={setActiveStep} />
          </ProgressStep>
          <ProgressStep label="Bayar" removeBtnRow={true}>
            <Step2 setActiveStep={setActiveStep} />
          </ProgressStep>
          <ProgressStep label="Tiket" removeBtnRow={true}>
            <Step3 setActiveStep={setActiveStep} />
          </ProgressStep>
        </ProgressSteps>
      </View>
      {activeStep === 0 && (
        <Footer
          price={data.price || 0}
          buttonText="Bayar"
          onPress={handleNextPress}
          disabled={!selectedBank}
          buttonColor={selectedBank ? "#3D7B3F" : "#c8e6c9"}
        />
      )}
    </View>
  );
}
