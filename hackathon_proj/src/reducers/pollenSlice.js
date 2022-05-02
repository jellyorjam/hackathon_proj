import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { fetchLatAndLong } from './locationSlice';

const initialState = [];

const pollenUrl = 'https://api.breezometer.com/pollen/v2/forecast/daily?lat=';
const endUrl = '&days=3&key='
const pollenApiKey = '6ed80b00f59c48c1aa34e239f05265e2';

export const fetchPollenData = createAsyncThunk('pollen/fetchPollenData', async () => {
  try {
    const response = await axios.get(pollenUrl + '45.317&lon=-91.6542' + endUrl + pollenApiKey);
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