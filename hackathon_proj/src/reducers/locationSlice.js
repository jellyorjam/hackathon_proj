import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios'

const locationUrl = 'https://thezipcodes.com/api/v1/search?zipCode=';
const locationApiKey = '4b19cd5cd687808ad130966e8ff781ae'


const initialState = [];

export const fetchLatAndLong = createAsyncThunk('location/fetchLatAndLong', async (zipcode) => {
  try {
    const response = await axios.get(locationUrl + zipcode + '&countryCode=US&apiKey=' + locationApiKey)
    return response.data
  }
  catch (err) {
    return err
  }
})

const locationSlice = createSlice ({
  name: 'location',
  initialState,
  reducers: {
    setZipcode(state, action) {
     return action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLatAndLong.fulfilled, (state, action) => {
      state.push(action.payload)
    })
  }
})

export const { setZipcode } = locationSlice.actions
export default locationSlice.reducer