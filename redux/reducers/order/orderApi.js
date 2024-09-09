import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { postLogin } from "./authApi";

export const postOrder = createAsyncThunk("postOrder",
  async (payload , { rejectWithValue }) => {
    token = payload.token
    formData = payload.formData
    console.log("payload", formData.car_id)
    try {
      const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access_token": token,
          },
          body: JSON.stringify({
            "start_rent_at": formData.start_rent_at,
            "finish_rent_at": formData.finish_rent_at, // Fixed typo
            "car_id": formData.car_id,

          // body: formData  
          }),
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); // Handle error response
      }

      const data = await response?.json();
      console.log("postOrder body", data)
      return data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.message); // Handle network errors
    }
  }
);


// export const putOrderSlip = createAsyncThunk("putOrderSlip",
//   async ({ token, id, formData }, { rejectWithValue }) => {
//     // console.log("order API formData", formData)
//     try {
//       console.log("order API formData", formData)
//       const response = await fetch(
//         "https://api-car-rental.binaracademy.org/customer/order/" + id + "/slip" , // Fixed URL concatenation
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "multipart/form-data",
//             "access_token": token,
//           },
//           body: formData, // Ensure body is JSON stringified
//         }
//       );

//       const body = await response?.json(); // Moved this line inside try block
       
//       console.log("body", body)
//       if (!response.ok) throw new Error(body.message); // Handle error response
      
//       return body; // Return the response body
//     } catch (error) {
//       return rejectWithValue(error.message); // Handle network errors
//     }
//   }
// );

export const putOrderSlip = createAsyncThunk("order/postOrderSlip", async ({token, id, formData}, {rejectWithValue}) => {
  console.log("order API", token, id, formData)
     try {
        const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/order/" + id + "/slip",
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            "access_token": token
          },
          body: formData,
        }
      );
      const body = await response?.json();
      console.log(body)
      if(!response.ok) throw new Error(body.message);
      console.log("body", body)
      return body;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.message);
    }
});