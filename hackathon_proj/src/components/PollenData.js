import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPollenData } from "../reducers/pollenSlice";

const PollenData = (props) => {
  const dispatch = useDispatch();
  const latitude = useSelector(state => state.location.latitude);
  const longitude = useSelector(state => state.location.longitude);
  const city = useSelector(state => state.location.city);
  const state = useSelector(state => state.location.state);

  // const pollenData = useSelector(state => state.pollen.pollenData);
  const pollenData = {
    count: [
      {grass_pollen: 3, tree_pollen: 108, weed_pollen: 3},
      {grass_pollen: 3, tree_pollen: 109, weed_pollen: 3},
      {grass_pollen: 6, tree_pollen: 107, weed_pollen: 0},
      {grass_pollen: 1, tree_pollen: 88, weed_pollen: 1},
      {grass_pollen: 5, tree_pollen: 64, weed_pollen: 0},
      {grass_pollen: 0, tree_pollen: 64, weed_pollen: 0},
      {grass_pollen: 3, tree_pollen: 70, weed_pollen: 0},
      {grass_pollen: 2, tree_pollen: 83, weed_pollen: 2},
      {grass_pollen: 6, tree_pollen: 183, weed_pollen: 6},
      {grass_pollen: 6, tree_pollen: 111, weed_pollen: 0},
      {grass_pollen: 7, tree_pollen: 58, weed_pollen: 2},
      {grass_pollen: 3, tree_pollen: 52, weed_pollen: 3},
      {grass_pollen: 10, tree_pollen: 112, weed_pollen: 1},
      {grass_pollen: 8, tree_pollen: 106, weed_pollen: 0},
      {grass_pollen: 5, tree_pollen: 57, weed_pollen: 0},
      {grass_pollen: 3, tree_pollen: 58, weed_pollen: 3},
      {grass_pollen: 6, tree_pollen: 53, weed_pollen: 1},
      {grass_pollen: 7, tree_pollen: 59, weed_pollen: 2},
      {grass_pollen: 3, tree_pollen: 52, weed_pollen: 3},
      {grass_pollen: 10, tree_pollen: 109, weed_pollen: 1},
      {grass_pollen: 8, tree_pollen: 103, weed_pollen: 0},
      {grass_pollen: 9, tree_pollen: 103, weed_pollen: 1},
      {grass_pollen: 6, tree_pollen: 103, weed_pollen: 6},
      {grass_pollen: 12, tree_pollen: 96, weed_pollen: 3},
      {grass_pollen: 13, tree_pollen: 104, weed_pollen: 3},
      {grass_pollen: 6, tree_pollen: 99, weed_pollen: 6},
      {grass_pollen: 10, tree_pollen: 113, weed_pollen: 1},
      {grass_pollen: 9, tree_pollen: 110, weed_pollen: 0},
      {grass_pollen: 10, tree_pollen: 111, weed_pollen: 1},
      {grass_pollen: 6, tree_pollen: 109, weed_pollen: 6},
      {grass_pollen: 12, tree_pollen: 103, weed_pollen: 3},
      {grass_pollen: 13, tree_pollen: 108, weed_pollen: 4},
      {grass_pollen: 6, tree_pollen: 104, weed_pollen: 6},
      {grass_pollen: 10, tree_pollen: 113, weed_pollen: 1},
      {grass_pollen: 9, tree_pollen: 61, weed_pollen: 4},
      {grass_pollen: 7, tree_pollen: 72, weed_pollen: 0},
      {grass_pollen: 5, tree_pollen: 64, weed_pollen: 0},
      {grass_pollen: 6, tree_pollen: 62, weed_pollen: 0},
      {grass_pollen: 10, tree_pollen: 64, weed_pollen: 4},
      {grass_pollen: 8, tree_pollen: 66, weed_pollen: 2},
      {grass_pollen: 9, tree_pollen: 72, weed_pollen: 2},
      {grass_pollen: 9, tree_pollen: 61, weed_pollen: 4},
      {grass_pollen: 7, tree_pollen: 72, weed_pollen: 0},
      {grass_pollen: 6, tree_pollen: 67, weed_pollen: 0},
      {grass_pollen: 6, tree_pollen: 67, weed_pollen: 0},
      {grass_pollen: 10, tree_pollen: 67, weed_pollen: 4},
      {grass_pollen: 8, tree_pollen: 70, weed_pollen: 2},
      {grass_pollen: 10, tree_pollen: 82, weed_pollen: 3}
    ],
  isLoading: true,
  risk: {grass_pollen: 'Low', tree_pollen: 'Moderate', weed_pollen: 'Low'}
  }

  // useEffect(() => {
  //   if (latitude && longitude) {
  //     dispatch(fetchPollenData({latitude, longitude, props}))
  //   }
  // }, [latitude, longitude, props, dispatch])
  
  const renderPollen = () => {
    if(!_.isEmpty(pollenData.types)) {
      props.load(false);
      return pollenData.types.map(p => {
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

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(fetchPollenData({latitude, longitude}))
    }
  }, [latitude, longitude, dispatch])
  
  const renderPollenHeader = () => {
    if(!_.isEmpty(pollenData)){
      return (
        <h2 className='pollen-header'>{'Pollen levels in ' + city + ', ' + state +  ':'}</h2>
      )
    }
  }

  if (props.isLoading) {
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