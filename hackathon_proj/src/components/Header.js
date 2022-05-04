import React, { useState } from 'react';
import CovidData from './CovidData'
import PollenData from './PollenData';
import Search from './Search';

const Header = () => {
  const [isLoading, load] = useState(false);
  return (
    <div className='App-header'>
      <br/>
      <h1>Covid or Allergies?</h1>
      <br/>
      <Search load={load} />
      <CovidData />
      <br/>
      <PollenData isLoading={isLoading} load={load} />
    </div>
  )
}

export default Header;