import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

export const postlogin = createAsyncThunk(
  'auth/login',
  async (formData, {rejectWithValue}) => {
    try {
        const response = await fetch(
      "https://api-car-rental.binaracademy.org/customer/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            email: formData.email,
            password: formData.password, 
        }),
      }
    );
    //console.log("api",response.json)
     const body = await response?.json();
     if(!response.ok) throw new Error(body.message)
      return body   // Return the response data
  } catch (e) {
        console.log('error',e.toString())
        return rejectWithValue(e.message)
    }
});

//     const body = await response.json();
//     if (!response.ok) {
//       throw new Error(body.message || body[0].message || "Ada Kesalahan!!"); // Handle error response
//     }

//     return await response.json(); // Return the response data
//   }
// );
