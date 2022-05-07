import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = [];
const pollenUrl = 'https://api.ambeedata.com/forecast/pollen/by-lat-lng?lat=';
const endUrl = '&x-api-key='
const pollenApiKey = '14a8747da52d1e8728fa03bf64c8bbefcef4fdc517587b7b8616df0ad4095428';

// export const fetchPollenData = createAsyncThunk('pollen/fetchPollenData', async ({latitude, longitude, props}) => {
//   try {
//     const today = new Date();
//     let sixHours = new Date();
//     sixHours.setDate(today.getDate()+1);

//     const createTimeString = (date) => {
//       const hours = date.getUTCHours().toString().padStart(2, '0');
//       const minutes = date.getUTCMinutes().toString().padStart(2, '0');
//       const seconds = date.getSeconds().toString().padStart(2, '0');
//       return (hours + ':' + minutes + ':' + seconds);
//     }
    
//     const now = today.toISOString().split('T')[0]+' '+(createTimeString(today));
//     const later = sixHours.toISOString().split('T')[0]+' '+(createTimeString(sixHours));

//     const response = await axios.get(pollenUrl + latitude + '&lng=' + longitude + '&from=' + now + '&to=' + later + endUrl + pollenApiKey);

//     props.load(false)

//     return {
//       response: response.data
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
//   extraReducers: (builder) => {
//     builder.addCase(fetchPollenData.fulfilled, (state, action) => {
//       const count = action.payload.response.data.map(x => {
//         return x.Count
//       });
//       const risk = action.payload.response.data[0].Risk;
//       return {
//         ...state,
//         count: count,
//         risk: risk
//       }
//     })
//   }
})

// export const { addPollenData } = pollenSlice.actions
export default pollenSlice.reducer