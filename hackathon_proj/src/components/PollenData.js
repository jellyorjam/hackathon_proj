import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SparklinesLine } from "react-sparklines";
import { SparklinesBars } from "react-sparklines";
import { SparklinesReferenceLine } from "react-sparklines";
import { Sparklines } from "react-sparklines";
//import { fetchPollenData } from "../reducers/pollenSlice";

const PollenData = (props) => {
  const dispatch = useDispatch();
  const latitude = useSelector(state => state.location.latitude);
  const longitude = useSelector(state => state.location.longitude);
  const city = useSelector(state => state.location.city);
  const state = useSelector(state => state.location.state);

  const pollenData = useSelector(state => state.pollen.pollenData);

  // useEffect(() => {
  //   if (latitude && longitude) {
  //     dispatch(fetchPollenData({latitude, longitude, props}))
  //   }
  // }, [latitude, longitude, props, dispatch])
  
  const renderPollen = () => {
    if(!_.isEmpty(pollenData.count)) {
      props.load(false);
      const grass = pollenData.count.map(p => {
        return [p.grass_pollen];
      })
      const tree = pollenData.count.map(p => {
        return [p.tree_pollen];
      })
      const weed = pollenData.count.map(p => {
        return [p.weed_pollen];
      })

      return (
        <div className='row'>
          <p className='mean' >------------- mean</p>
          <div className='col grass'>
            <Sparklines data={grass} height='90'>
              <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
              <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
              <SparklinesReferenceLine type='mean' />
            </Sparklines>
            <h3>Grass Pollen</h3>
            <img src='https://static.thenounproject.com/png/1903-200.png' alt='grass' width='80' />
            <p className={pollenData.risk.grass_pollen} >{pollenData.risk.grass_pollen} Risk</p>
          </div>
          <div className='col tree'>
            <Sparklines data={tree} height='90'>
              <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
              <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
              <SparklinesReferenceLine type='mean' />
            </Sparklines>
            <h3>Tree Pollen</h3>
            <img src='https://cdn-icons.flaticon.com/png/512/3337/premium/3337730.png?token=exp=1651548574~hmac=ba998497cc4901bc4f3d36e37e319fb5' alt='tree' width='80' />
            <p className={pollenData.risk.tree_pollen} >{pollenData.risk.tree_pollen} Risk</p>
          </div>
          <div className='col weed' >
            <Sparklines data={weed} height='90'>
              <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
              <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
              <SparklinesReferenceLine type='mean' />
            </Sparklines>
            <h3>Weed Pollen</h3>
            <img src='https://cdn-icons-png.flaticon.com/512/25/25207.png' alt='weed' width='80' />
            <p className={pollenData.risk.weed_pollen} >{pollenData.risk.weed_pollen} Risk</p>
          </div>
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