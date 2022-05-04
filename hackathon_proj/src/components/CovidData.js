import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLatAndLong, fetchFips } from '../reducers/locationSlice';
import { fetchCovidData, setCovidData, totalCases } from '../reducers/covidSlice';
import { PieChart } from 'reaviz';

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


  const renderCovidHeader = () => {
    if (covidState.readyToRender) {
      return (
        <div>
          <h2 className='covid-header'>{'Covid Stats in ' + locationState.city + ', ' + locationState.state +  ':'}</h2>
        </div>
      )
    }
  }

  const renderCovidData = () => {
    if (covidState.readyToRender) {
      return (
        <div className='covid-row'>
          <div className='col-4'>
          <i className="fa-solid fa-virus-covid fa-6x"></i>
            <div className='titles'>Total New Cases In the Past 7 Days</div>
            <div className='nums'>{covidState.totalCases}</div> 
          </div>
          <div className='col-4'>
            <div className='titles'>Test Positivity Ratio</div>
            <div className='nums'>{covidState.testPositivityRatio}%</div>
            <div className='titles'>CDC Transmission Level</div>
            <div className='nums'>{covidState.cdcTransmissionLevel}</div>
          </div>
          <div className='col-2'>
             <PieChart 
                data={[
                        { key: '% of Population Vaccinated', data: covidState.vaxCompleted},
                        { key: '% of Population Not Vaccinated', data: 100 - covidState.vaxCompleted}
                       ]}
              />
          </div>
          <div className='col-2'> <PieChart 
                data={[
                        { key: '% of Population Boosted', data: covidState.vaxWithBooster},
                        { key: '% of Population Not Boosted', data: 100 - covidState.vaxWithBooster}
                       ]}
              /></div>
        </div>
      )
    }
  }
  
  return (
    <div className='container align-content-center row covid-div'>
      {renderCovidHeader()}
      {renderCovidData()}
    </div>
  
  )
}

export default CovidData