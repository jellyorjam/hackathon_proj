import React from 'react';
import { useSelector } from 'react-redux';
import { PieArcSeries, PieArcLabel, PieChart} from 'reaviz';

const CovidContent = () => {

  const covidState = useSelector(state => state.covid);
  const locationState = useSelector(state => state.location)

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
          <h2 className='covid-header'>{'Covid Stats in ' + locationState.city + ', ' + locationState.state +  ':'}</h2>
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
              <i className="fa-solid fa-virus-covid fa-6x"></i>
              <div className='nums'>{covidState.totalCases}</div> 
            </div>
           <div className='col-4'>  
              <div className='nums'>{covidState.testPositivityRatio}%</div>
              <div className='titles'>CDC Transmission Level</div>
              <div className='nums'>{covidState.cdcTransmissionLevel}</div>
              <div>{renderMeter()}</div>
            </div>
            <div className='col-2'>
             <PieChart 
                series={<PieArcSeries colorScheme={['rgb(3, 102, 252)', 'rgb(255, 248, 225)']} explode={true} label={<PieArcLabel fontFill='white'/>}/>}
                data={
                  [
                    { key: '% of Population Vaccinated', data: covidState.vaxCompleted},
                    { key: '% of Population Not Vaccinated', data: 100 - covidState.vaxCompleted}
                  ]}
              />
            </div>  
            <div className='col-2'>
             <PieChart 
                series={<PieArcSeries colorScheme={['rgb(255, 248, 225)', 'rgb(3, 102, 252)']}
                 label={<PieArcLabel fontFill='white'/>}/>}
                data={
                  [
                    { key: '% of Population Boosted', data: covidState.vaxWithBooster},
                    { key: '% of Population Not Boosted', data: 100 - covidState.vaxWithBooster}
                  ]}
              />
            </div>
         </div>
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

export default CovidContent;