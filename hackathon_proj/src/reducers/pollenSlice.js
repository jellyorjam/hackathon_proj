import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = [];
const pollenUrl = 'https://api.weatherbit.io/v2.0/current/airquality?postal_code=';
const endUrl = '&key='
const pollenApiKey = '054dc4133c69437ebadb3e7f7fbbfa20';

export const fetchPollenData = createAsyncThunk('pollen/fetchPollenData', async (zip) => {
  try {
    const response = await axios.get(pollenUrl + zip + endUrl + pollenApiKey);

    return {
      response: response.data
    }
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
    },
    pollenResetOnNewClick(state) {
      return {
        ...state,
        readyToRender: false
      }
    },
    pollenIsLoading(state, action) {
      return {
        ...state,
        pollenIsLoading: action.payload
      }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPollenData.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.response.data[0],
        highestRisk: action.payload.response.data[0].predominant_pollen_type
      }
    })
  }
})

export const { addPollenData, pollenIsLoading, pollenResetOnNewClick } = pollenSlice.actions
export default pollenSlice.reducer