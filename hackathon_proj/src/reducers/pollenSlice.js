import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const pollenSlice = createSlice ({
  name: 'pollen',
  initialState,
  reducers: {
    addPollenData(state, action) {
      state.push(action.payload)
    }
  }
})

export const { addPollenData } = pollenSlice.actions
export default pollenSlice.reducer