import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLatAndLong, fetchFips } from '../reducers/locationSlice';
import { fetchCovidData, setCovidData, totalCases, } from '../reducers/covidSlice';
import CovidContent from './CovidContent';

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
    if (locationState.readyForFetchFips) {
      const latAndLong = {
        lat: locationState.latitude,
        long: locationState.longitude
      }
      dispatch(fetchFips(latAndLong));
    }
  }, [locationState.latitude, locationState.longitude, locationState.readyForFetchFips, dispatch]);

  useEffect(() => {
    if (locationState.readyForFetchCovid) {
      dispatch(fetchCovidData(locationState.fips))
    }
  }, [locationState.fips, locationState.readyForFetchCovid, dispatch]);
  
  useEffect(() => {
    if (covidState.metrics) {
      dispatch(setCovidData(covidState))
    }
  }, [covidState.metrics, covidState, dispatch]);

  useEffect(() => {
    if (covidState.readyForTotalCases) {
      const calculateTotalCases = Math.floor((covidState.population / 100000) * covidState.weeklyNewCasesPer100k);
      dispatch(totalCases(calculateTotalCases))
    }
  }, [covidState.testPositivityRatio, covidState.readyForTotalCases, covidState.population, covidState.weeklyNewCasesPer100k,    dispatch]);


  return (
    <div><CovidContent/></div>
  )
}

export default CovidData