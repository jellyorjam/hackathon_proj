import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const covidSlice = createSlice ({
  name: 'covid',
  initialState,
  reducers: {
    addCovidData(state, action) {
      state.push(action.payload)
    }
  }
})

export const { addCovidData } = covidSlice.actions
export default covidSlice.reducer