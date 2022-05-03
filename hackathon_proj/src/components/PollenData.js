import _ from "lodash";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPollenData } from "../reducers/pollenSlice";


const PollenData = () => {
  const dispatch = useDispatch();
  const latitude = useSelector(state => state.location.latitude);
  const longitude = useSelector(state => state.location.longitude);
  const city = useSelector(state => state.location.city);
  const state = useSelector(state => state.location.state);
  const pollenData = useSelector(state => state.pollen)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let plants = [];

  const renderPollen = useCallback(() => {
    if(!_.isEmpty(plants)) {
      return plants.map(p => {
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
  }, [plants])

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(fetchPollenData({latitude, longitude}))
    }
  }, [latitude, longitude, dispatch])
  
  const renderPollenHeader = () => {
    if(!_.isEmpty(plants)){
      return (
        <h2 className='pollen-header'>{'Pollen levels in ' + city + ', ' + state +  ':'}</h2>
      )
    }
  }
  
  if(pollenData[0]){
    plants.push(pollenData[0].data[0].types.grass)
    plants.push(pollenData[0].data[0].types.weed)
    plants.push(pollenData[0].data[0].types.tree)
  }

  return (
    <div className='container align-content-center row pollen-div'>
      {renderPollenHeader()}
      {renderPollen()}
    </div>
  )
};

export default PollenData;