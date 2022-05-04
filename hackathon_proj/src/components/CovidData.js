import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLatAndLong, fetchFips } from '../reducers/locationSlice';
import { fetchCovidData, setCovidData, totalCases } from '../reducers/covidSlice';

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

  useEffect(() => {
    if (covidState.vaxCompleted) {
      const calculateTotalCases = Math.floor((covidState.population / 100000) * covidState.weeklyNewCasesPer100k);
      dispatch(totalCases(calculateTotalCases))
    }
  }, [covidState.vaxCompleted, covidState.population, covidState.weeklyNewCasesPer100k, dispatch]);

  
  return (
    <div>
        <div>{covidState.totalCases}</div>
        <div>{covidState.testPositivityRatio}</div>
        <div>{covidState.vaxCompleted}</div>
        <div>{covidState.vaxWithBooster}</div>
        <div>{covidState.cdcTransmissionLevel}</div>
    </div>
  
  )
}

export default CovidData