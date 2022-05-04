import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLatAndLong, fetchFips } from '../reducers/locationSlice';
import { fetchCovidData, setCovidData } from '../reducers/covidSlice';
import _ from 'lodash'

const CovidData = () => {

  const dispatch = useDispatch();

  const locationState = useSelector(state => state.location)
  const covidState = useSelector(state => state.covid)

  useEffect(() => {
    if (locationState.zipcode) {
      dispatch(fetchLatAndLong(locationState.zipcode));
    }
  }, [locationState.zipcode, dispatch]);

  useEffect(() => {
    if (locationState.latitude && locationState.longitude) {
      const latAndLong = {
        lat: locationState.latitude,
        long: locationState.longitude
      }
      dispatch(fetchFips(latAndLong));
    }
  }, [locationState.latitude, locationState.longitude, dispatch]);

  useEffect(() => {
    if (locationState.fips) {
      dispatch(fetchCovidData(locationState.fips))
    }
  }, [locationState.fips, dispatch]);
  
  useEffect(() => {
    if (covidState.metrics) {
      dispatch(setCovidData(covidState))
    }
  }, [covidState.metrics, covidState, dispatch]);

  const getTotalCases = () => {
    if (covidState.vaxCompleted) {
      const totalCases = Math.floor((covidState.population / 100000) * covidState.weeklyNewCasesPer100k);
      return totalCases
    }
  }
  
  return (
    <div>{getTotalCases()}</div>
  )
}

export default CovidData