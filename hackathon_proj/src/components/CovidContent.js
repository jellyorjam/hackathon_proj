import React from 'react';
import { useSelector } from 'react-redux';
import { PieArcSeries, PieArcLabel, PieChart} from 'reaviz';
import _ from 'lodash';

const CovidContent = () => {

  const covidState = useSelector(state => state.covid);
  const locationState = useSelector(state => state.location);

  const checkIfFalsy = (dataPoint) => {
    return dataPoint ? dataPoint : 'Error retrieving data'
  }

  const roundToHundredth = (value) => {
    return Number(value.toFixed(2));
  };

  const renderMeter = () => {
    switch (covidState.cdcTransmissionLevel) {
      case 0:
        return (<div className="progress">
        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: 100}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
      </div>);
      case 1:
        return (<div className="progress">
        <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: 200}}  aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
      </div>);
      case 2:  
        return (<div className="progress">
      <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: 300}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    </div>);
      case 3: 
      return (<div className="progress">
      <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: 400}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
    </div>);
      default:
        return (<div>No data on CDC Transmission Levels available.</div>)
    }
  }


  const renderCovidHeader = () => {
    if (covidState.readyToRender) {
      return (
        <div>
          <h2 className='covid-header'>{'Covid Stats in ' + checkIfFalsy(locationState.city) + ', ' + checkIfFalsy(locationState.state)+  ':'}</h2>
        </div>
      )
    }
  }

  const renderCovidData = () => {
    if (covidState.readyToRender) {
      return (
        <div>
          <div className='covid-row'>
            <div className='col-4 titles'>Total New Cases In the Past 7 Days</div>
            <div className='col-4 titles'>Test Positivity Ratio</div>
            <div className='col-4 titles'>Vaccination Rates 
            <div className='small-hover'>Hover to View Vaccination Rates</div></div>
          </div>
          <div className='covid-row'>
            <div className='col-4'>
              <i className="fa-solid fa-virus-covid fa-8x"></i>
              <div className='nums'>{checkIfFalsy(covidState.totalCases)}</div>
            </div>
           <div className='col-4'>  
              <div className='nums test-pos'>{checkIfFalsy(roundToHundredth(covidState.testPositivityRatio))}%</div>
              <div className='titles'>CDC Transmission Level</div>
              <div className='nums'>{checkIfFalsy(covidState.cdcTransmissionLevel)}</div>
              <div className='levels'>0 = Low | 1 = Moderate | 2 = Substantial | 3 = High</div>
              <div className='meter'>{renderMeter()}</div>
            </div>
            <div className='col-2'>
             <PieChart 
                series={<PieArcSeries colorScheme={['rgb(3, 102, 252)', 'rgb(235, 174, 52)']} label={<PieArcLabel fontFill='white'/>}/>}
                data={
                  [
                    { key: '% of Population Vaccinated', data: checkIfFalsy(covidState.vaxCompleted)},
                    { key: '% of Population Not Vaccinated', data: 100 - checkIfFalsy(covidState.vaxCompleted)}
                  ]}
              />
            </div>  
            <div className='col-2'>
             <PieChart 
                series={<PieArcSeries colorScheme={['rgb(235, 174, 52)', 'rgb(3, 102, 252)']} 
                 label={<PieArcLabel fontFill='white'/>}/>}
                data={
                  [
                    { key: '% of Population Boosted', data: covidState.vaxWithBooster},
                    { key: '% of Population Not Boosted', data: 100 - checkIfFalsy(covidState.vaxWithBooster)}
                  ]}
              />
            </div>
         </div> 
         <div className='covid-row'>
            <div className='col-4'>Total Population: {checkIfFalsy(covidState.population.toLocaleString('en-US'))}</div>
            <div className='col-4 small-info'><i className="fa-solid fa-circle-question"></i>To learn more about how the CDC calculates community transmission levels, <a href='https://covid.cdc.gov/covid-data-tracker/#county-view?list_select_state=all_states&list_select_county=all_counties&data-type=Risk&null=Risk'>click here.</a></div>
            <div className='col-4 small-info'><i className="fa-solid fa-circle-question"></i>% vaccinated does not include those who received only one dose of a vaccine that requires two</div>
            </div>
         </div>
      )
    }
  }

 if (!_.isEmpty(covidState)) {
  return (
    <div className='container align-content-center row covid-div'>
      {renderCovidHeader()}
      {renderCovidData()}
    </div>
  
  )
 }
  
}

export default CovidContent;