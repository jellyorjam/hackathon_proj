import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = [];
const pollenUrl = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
const endUrl = '?apikey='
const pollenApiKey = '%098m7cUZ5gGog7kUutlQk3loxrrWOQKgap';

export const fetchPollenData = createAsyncThunk('pollen/fetchPollenData', async (zip) => {
  try {
    const response = await axios.get(pollenUrl + zip + endUrl + pollenApiKey + '&language=en-us&details=true&metric=false');

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
      
      const grassArray = action.payload.response.DailyForecasts.map(day => {
        return day.AirAndPollen[1]
      })
      const weedArray = action.payload.response.DailyForecasts.map(day => {
        return day.AirAndPollen[3];
      })
      const treeArray = action.payload.response.DailyForecasts.map(day => {
        return day.AirAndPollen[4];
      })
      console.log(treeArray)

      return {
        ...state,
        data: {
          tree: treeArray,
          grass: grassArray,
          weed: weedArray
        }
      }
    })
  }
})

export const { addPollenData, pollenIsLoading, pollenResetOnNewClick } = pollenSlice.actions
export default pollenSlice.reducer