import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = [];

const pollenUrl = 'https://api.breezometer.com/pollen/v2/forecast/daily?lat=';
const endUrl = '&days=1&key='
const pollenApiKey = '6ed80b00f59c48c1aa34e239f05265e2';

export const fetchPollenData = createAsyncThunk('pollen/fetchPollenData', async ({latitude, longitude}) => {
  try {
    const response = await axios.get(pollenUrl + latitude + '&lon=' + longitude + endUrl + pollenApiKey + '&features=types_information,plants_information');
    return response.data;
  }
  catch (err) {
    return err;
  }
})

const pollenSlice = createSlice ({
  name: 'pollen',
  initialState,
  reducers: {
    addPollenData(state, action) {
      state.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPollenData.fulfilled, (state, action) => {
      state.push(action.payload)
    })
  }
})

export const { addPollenData } = pollenSlice.actions
export default pollenSlice.reducer