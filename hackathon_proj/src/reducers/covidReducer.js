import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { create } from 'yup/lib/Reference';
import axios from 'axios'

const rootUrl = 'https://api.covidactnow.org/v2/county/';
const apiKey = '993361375f23423f860daaf3fa49b1a6';
const county = '01001'

const initialState = [];

export const fetchCovidData = createAsyncThunk('covd/fetchCovidData', async () => {
  try {
    const response = await axios.get(rootUrl + county + '.json?apiKey=' + apiKey)
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
    setZipcode(state, action) {
      state.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCovidData.fulfilled, (state, action) => {
      state.push(action.payload)
    })
  }
})


export const { setZipcode } = covidSlice.actions
export default covidSlice.reducer