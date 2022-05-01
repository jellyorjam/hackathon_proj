import React from 'react';
import CovidData from './CovidData'
import Search from './Search';

const Header = () => {
  return (
    <div>
      <br/>
      <h1>Covid or Allergies?</h1>
      <br/>
      <Search />
      <div>< CovidData /></div>
    </div>
  )
}

export default Header;