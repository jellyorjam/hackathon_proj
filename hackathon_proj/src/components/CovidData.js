import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLatAndLong } from '../reducers/locationSlice';

const CovidData = () => {

  const zipcode = useSelector(state => state.location[0])

  useEffect(() => {
    if (zipcode) {
      console.log('use effect')
    }
  }, [zipcode])

  
  return (
    <div>Hello</div>
  )
}

export default CovidData