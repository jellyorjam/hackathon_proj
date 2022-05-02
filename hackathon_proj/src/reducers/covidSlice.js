import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { create } from 'yup/lib/Reference';
import axios from 'axios'

const covidUrl = 'https://api.covidactnow.org/v2/county/';
const covidApiKey = '993361375f23423f860daaf3fa49b1a6';
const county = '01001'

const initialState = [];

export const fetchCovidData = createAsyncThunk('covid/fetchCovidData', async () => {
  try {
    const response = await axios.get(covidUrl + county + '.json?apiKey=' + covidApiKey)
    return response.data
  }
  catch (err) {
    return err
  }
})

const covidSlice = createSlice ({
  name: 'covid',
  initialState,
  reducers: {
    setCovidData(state, action) {
      state.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCovidData.fulfilled, (state, action) => {
      state.push(action.payload)
    })
  }
})


export const { setCovidData } = covidSlice.actions
export default covidSlice.reducer