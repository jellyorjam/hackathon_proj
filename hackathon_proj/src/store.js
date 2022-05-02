import { configureStore } from '@reduxjs/toolkit'

import covidReducer from './reducers/covidSlice'
import pollenReducer from './reducers/pollenSlice'
import locationReducer from './reducers/locationSlice'

const store = configureStore({
  reducer: {
    location: locationReducer,
    pollen: pollenReducer,
    covid: covidReducer
  }
})

export default store