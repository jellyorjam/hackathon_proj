import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const covidUrl = 'https://api.covidactnow.org/v2/county/';
const covidApiKey = '993361375f23423f860daaf3fa49b1a6';


const initialState = [];

export const fetchCovidData = createAsyncThunk('covid/fetchCovidData', async (fips) => {
  try {
    const response = await axios.get(covidUrl + fips + '.json?apiKey=' + covidApiKey)
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
      return {
        population: action.payload.population,
        weeklyNewCasesPer100k: action.payload.metrics.weeklyNewCasesPer100k,
        testPositivityRatio: action.payload.metrics.testPositivityRatio * 100,
        vaxCompleted: Math.floor(action.payload.metrics.vaccinationsCompletedRatio * 100),
        vaxWithBooster: Math.floor(action.payload.metrics.vaccinationsAdditionalDoseRatio * 100),
        cdcTransmissionLevel: action.payload.cdcTransmissionLevel,
        readyForTotalCases: true
      }
    },
    totalCases(state, action) {
      return {
        ...state,
        totalCases: action.payload,
        readyToRender: true
      }
    },
    resetOnNewClick(state, action) {
      return {
        ...state,
        readyToRender: false
      }
    },
    isLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCovidData.fulfilled, (state, action) => {
      return action.payload
    })
  }
})


export const { setCovidData, totalCases, resetOnNewClick, isLoading } = covidSlice.actions
export default covidSlice.reducer