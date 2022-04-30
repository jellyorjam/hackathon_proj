import { configureStore } from '@reduxjs/toolkit'

import covidReducer from './reducers/covidReducer'
import pollenReducer from './reducers/pollenReducer'

const store = configureStore({
  reducer: {
    covid: covidReducer,
    pollen: pollenReducer
  }
})

export default store