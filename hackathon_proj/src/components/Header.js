import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CovidData from './CovidData'
import PollenData from './PollenData';
import Search from './Search';

const Header = () => {
  const [isLoading, load] = useState(false);
  const pollen = useSelector(state => state.pollen)

  return (
    <div className='App-header'>
      <br/>
      <h1>Covid or Allergies?</h1>
      <br/>
      <Search load={load} />
      <br/>
      <CovidData />
      <br/>
      <PollenData load={load} />
    </div>
  )
}

export default Header;