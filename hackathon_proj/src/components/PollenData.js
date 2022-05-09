import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPollenData } from "../reducers/pollenSlice";
import ProgressBar from 'react-bootstrap/ProgressBar'

const PollenData = () => {
  const dispatch = useDispatch();
  const city = useSelector(state => state.location.city);
  const state = useSelector(state => state.location.state);
  const zipcode = useSelector(state => state.location.zipcode);
  const pollenIsLoading = useSelector(state => state.pollen.isLoading)

  useEffect(() => {
    if(zipcode) {
      dispatch(fetchPollenData(zipcode))
    }
  }, [dispatch, zipcode])

  const pollenData = useSelector(state => state.pollen.data);
  const highest = useSelector(state => state.pollen.highestRisk);

  const checkRisk = (level) => {
    if(level === 0) {
      return 'Very Low';
    }
    if(level === 1) {
      return 'Low';
    }
    if(level === 2) {
      return 'Moderate';
    }
    if(level === 3) {
      return 'High'
    }
    if(level === 4) {
      return 'Very High'
    }
  }

  const renderPollen = () => {
    const tree = (pollenData.pollen_level_tree);
    const grass = (pollenData.pollen_level_grass);
    const weed = (pollenData.pollen_level_weed);
    
    if(!_.isEmpty(pollenData)) {
      return (
        <div className='row'>
          <p>{`Highest Risk: ${highest}`}</p>
          <div className='col grass'>
            <ProgressBar className='progress' max={4} now={grass} variant='success' label={`${pollenData.pollen_level_grass}/4`} />
            <p className='info'>risk level out of 4</p>
            <br/>
            <h3>Grass Pollen</h3>
            <img src='https://static.thenounproject.com/png/1903-200.png' alt='grass' width='80' />
            <p className={checkRisk(pollenData.pollen_level_grass)} >{checkRisk(pollenData.pollen_level_grass)} Risk</p>
          </div>
          <div className='col tree'>
            <ProgressBar className='progress' max={4} now={tree} variant='success' label={`${pollenData.pollen_level_tree}/4`} />
            <p className='info'>risk level out of 4</p>
            <br/>
            <h3>Tree Pollen</h3>
            <img src='https://www.pngitem.com/pimgs/b/50-505008_tree-pngs.png' alt='tree' width='120' />
            <p className={checkRisk(pollenData.pollen_level_tree)} >{checkRisk(pollenData.pollen_level_tree)} Risk</p>
          </div>
          <div className='col weed' >
            <ProgressBar className='progress' max={4} now={weed} variant='success' label={`${pollenData.pollen_level_weed}/4`} />
            <p className='info'>risk level out of 4</p>
            <br/>
            <h3>Weed Pollen</h3>
            <img src='https://cdn-icons-png.flaticon.com/512/25/25207.png' alt='weed' width='80' />
            <p className={checkRisk(pollenData.pollen_level_weed)} >{checkRisk(pollenData.pollen_level_weed)} Risk</p>
          </div>
          <p className='info'>for more info on pollen and air quality in your area <a href="https://weather.com/forecast/allergy/l/96f2f84af9a5f5d452eb0574d4e4d8a840c71b05e22264ebdc0056433a642c84">click here</a></p>
        </div>
      )
    }
  }
  
  const renderPollenHeader = () => {
    if(!_.isEmpty(pollenData)){
      return (
        <h2 className='pollen-header'>{'Pollen levels in ' + city + ', ' + state +  ':'}</h2>
      )
    }
  }

  if (pollenIsLoading) {
    return (
      <div>
        <img id="loading" src='https://i.gifer.com/YCZH.gif' alt='loading...'/>
      </div>
    )
  }
  
  if(!_.isEmpty(pollenData)){
    return (
      <div className='container align-content-center row pollen-div'>
        {renderPollenHeader()}
        {renderPollen()}
      </div>
    )
  }
};

export default PollenData; 