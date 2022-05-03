import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPollenData } from "../reducers/pollenSlice";


const PollenData = () => {
  const dispatch = useDispatch();
  const latitude = useSelector(state => state.location.latitude);
  const longitude = useSelector(state => state.location.longitude);

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(fetchPollenData({latitude, longitude}))
    }
  }, [latitude, longitude, dispatch])

  const pollenData = useSelector(state => state.pollen)
  let plants = [];

  const renderPollen = () => {
    console.log(!_.isEmpty(plants))
    if(!_.isEmpty(plants)) {
      return plants.map(p => {
        switch(p.display_name){
          case 'Grass':
            return (
              <div className='col-4'>
                <img width='40' src='https://static.thenounproject.com/png/1903-200.png' alt='grass' />
                <p>{p.display_name}</p>
              </div>
            )
          case 'Weed':
            return (
              <div className='col-4'>
                <img width='40' src='https://cdn-icons-png.flaticon.com/512/25/25207.png' alt='weed' />
                <p>{p.display_name}</p>
              </div>
            )
          case 'Tree':
            return (
              <div className='col-4'>
                <img width='40' src='https://www.freeiconspng.com/thumbs/tree-icon/tree-icon-png-tree-icon-bw-1.jpg' alt='tree' />
                <p>{p.display_name}</p>
              </div>
            )
          default:
            return <p>no pollen</p>
        }
      })
    }
  }
  
  if(pollenData[0]){
    plants.push(pollenData[0].data[0].types.grass)
    plants.push(pollenData[0].data[0].types.weed)
    plants.push(pollenData[0].data[0].types.tree)
  }

  return (
    <div className='row'>
      {renderPollen()}
    </div>
  )
};

export default PollenData;