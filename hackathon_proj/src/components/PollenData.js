import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPollenData } from "../reducers/pollenSlice";

const PollenData = ({isLoading, load}) => {
  const dispatch = useDispatch();
  const latitude = useSelector(state => state.location.latitude);
  const longitude = useSelector(state => state.location.longitude);
  const city = useSelector(state => state.location.city);
  const state = useSelector(state => state.location.state);
  const pollenData = useSelector(state => state.pollen)

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(fetchPollenData({latitude, longitude, load}))
    }
  }, [latitude, longitude, load, dispatch])
  
  const renderPollen = () => {
    if(!_.isEmpty(pollenData[0])) {
      return pollenData[0].map(p => {
        switch(p.data_available){
          case true:
            return (
              <div key={p.display_name} className='col-4'>
                <p className={p.index.category}>{p.index.category}</p>
                <img width='40' className={p.display_name} alt={p.display_name} />
                <p>{p.display_name}</p>
              </div>
            )
            case false:
              return (
                <div key={p.display_name} className='col-4'>
                <p className='none'>None</p>
                <img width='40' className={p.display_name} alt={p.display_name} />
                <p>{p.display_name}</p>
              </div>
              )
          default:
            return <p>sorry, something went wrong</p>
        }
      })
    }
  }

  const renderPollenHeader = () => {
    if(!_.isEmpty(pollenData[0])){
      return (
        <h2 className='pollen-header'>{'Pollen levels in ' + city + ', ' + state +  ':'}</h2>
      )
    }
  }

  console.log(isLoading)
  if (isLoading) {
    console.log('loading')
    return (
      <div>
        <img id="loading" src='https://i.gifer.com/YCZH.gif' alt='loading...'/>
      </div>
    )
  }
  
  if(!_.isEmpty(pollenData[0])){
    load(false);
    return (
      <div className='container align-content-center row pollen-div'>
        {renderPollenHeader()}
        {renderPollen()}
      </div>
    )
  }
};

export default PollenData; 