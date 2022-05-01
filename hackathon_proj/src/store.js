import { configureStore } from '@reduxjs/toolkit'

import covidReducer from './reducers/covidReducer'
import pollenReducer from './reducers/pollenReducer'

const store = configureStore({
  reducer: {
    pollen: pollenReducer,
    covid: covidReducer
  }
})

export default store