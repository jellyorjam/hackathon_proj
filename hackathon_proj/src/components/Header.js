import React from 'react';
import CovidData from './CovidData'
import PollenData from './PollenData';
import Search from './Search';

const Header = () => {
  return (
    <div className='App-header'>
      <br/>
      <h1>Covid or Allergies?</h1>
      <br/>
      <Search />
      <br/>
      <PollenData />
      <br/>
      <CovidData />
      <br/>
    </div>
  )
}

export default Header;