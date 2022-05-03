import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const locationUrl = 'https://thezipcodes.com/api/v1/search?zipCode=';
const locationApiKey = '4b19cd5cd687808ad130966e8ff781ae';

const getCountyInfoUrl = 'https://geo.fcc.gov/api/census/block/find?';


const initialState = [];

export const fetchLatAndLong = createAsyncThunk('location/fetchLatAndLong', async (zipcode) => {
  try {
    const response = await axios.get(locationUrl + zipcode + '&countryCode=US&apiKey=' + locationApiKey)
    return response.data
  }
  catch (err) {
    return err
  }
});

export const fetchFips = createAsyncThunk('location/fetchFips', async (latAndLong) => {
  try {
    const response = await axios.get(getCountyInfoUrl + 'latitude=' + latAndLong.lat + '&longitude=' + latAndLong.long + '&censusYear=2020&format=json')
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
      return {
        ...state,
        latitude: action.payload.location[0].latitude,
        longitude: action.payload.location[0].longitude
      }
    })
    .addCase(fetchFips.fulfilled, (state, action) => {
      return {
        ...state,
        fips: action.payload.County.FIPS
      }
    })
  }
})

export const { setZipcode } = locationSlice.actions
export default locationSlice.reducer