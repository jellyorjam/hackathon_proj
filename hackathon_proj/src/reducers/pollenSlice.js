import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
//import axios from 'axios';
const initialState = [];
//const pollenUrl = 'https://api.ambeedata.com/history/pollen/by-lat-lng?lat=';
//const endUrl = '&x-api-key='
//const pollenApiKey = '56f5064fc3429b4ef888d6fab079b569784625f556160213a628d85173b0d2d2';

// export const fetchPollenData = createAsyncThunk('pollen/fetchPollenData', async ({latitude, longitude, props}) => {
//   try {
//     const today = new Date();
//     let tomorrow = new Date();
//     tomorrow.setDate(today.getDate() + 2);
    
//     const now = today.toISOString().split('T')[0]+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

//     const twentyFour = tomorrow.toISOString().split('T')[0]+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

//     const response = await axios.get(pollenUrl + latitude + '&lng=' + longitude + '&from=' + now + '&to=' + twentyFour + endUrl + pollenApiKey);

//     return {
//       response: response.data,
//       isLoading: props.isLoading
//     }
//   }
//   catch (err) {
//     return err;
//   }
// })

const pollenSlice = createSlice ({
  name: 'pollen',
  initialState,
  reducers: {
    addPollenData(state, action) {
      state.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchPollenData.fulfilled, (state, action) => {
    //   const count = action.payload.response.data.map(x => {
    //     return x.Count
    //   });
    //   const risk = action.payload.response.data[0].Risk;
    //   console.log({
    //     count: count,
    //     risk: risk,
    //     isLoading: action.payload.isLoading
    //   })
    //   return {
    //     ...state,
    //     count: count,
    //     risk: risk,
    //     isLoading: action.payload.isLoading
    //   }
    // })
  }
})

export const { addPollenData } = pollenSlice.actions
export default pollenSlice.reducer