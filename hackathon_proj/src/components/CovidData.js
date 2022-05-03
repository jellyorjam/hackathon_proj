import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLatAndLong, fetchFips } from '../reducers/locationSlice';
import { fetchCovidData, setCovidData } from '../reducers/covidSlice';

const CovidData = () => {
  
  const dispatch = useDispatch();
  const zipcode = useSelector(state => state.location.zipcode);
  const latitude = useSelector(state => state.location.latitude);
  const longitude = useSelector(state => state.location.longitude);
  const fips = useSelector(state => state.location.fips);
  const countyCovidStats = useSelector(state => state.covid.metrics);
  const state = useSelector(state => state.covid)

  useEffect(() => {
    if (zipcode) {
      dispatch(fetchLatAndLong(zipcode));
    }
  }, [zipcode, dispatch]);

  useEffect(() => {
    if (latitude && longitude) {
      const latAndLong = {
        lat: latitude,
        long: longitude
      }
      dispatch(fetchFips(latAndLong))
    }
  }, [latitude, longitude, dispatch]);

  useEffect(() => {
    if (fips) {
      dispatch(fetchCovidData(fips))
    }
  }, [fips, dispatch]);
  
  useEffect(() => {
    if (countyCovidStats) {
      dispatch(setCovidData(state))
    }
  }, [countyCovidStats, state, dispatch])
  
  return (
    <div>Hello</div>
  )
}

export default CovidData