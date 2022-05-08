import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SparklinesLine } from "react-sparklines";
import { SparklinesBars } from "react-sparklines";
import { SparklinesReferenceLine } from "react-sparklines";
import { Sparklines } from "react-sparklines";
import { fetchPollenData } from "../reducers/pollenSlice";

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

  const renderPollen = () => {
    if(!_.isEmpty(pollenData)) {
      const treeRisk = pollenData.tree.map(x => x.Value)
      const grassRisk = pollenData.grass.map(x => x.Value)
      const weedRisk = pollenData.weed.map(x => x.Value)

      return (
        <div className='row'>
          <p className='mean' >------------- mean</p>
          <div className='col grass'>
            <Sparklines data={grassRisk} >
              <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
              <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
              <SparklinesReferenceLine type='mean' />
            </Sparklines>
            <h3>Grass Pollen</h3>
            <img src='https://static.thenounproject.com/png/1903-200.png' alt='grass' width='80' />
            <p className={pollenData.grass[0].Category} >{pollenData.grass[0].Category} Risk</p>
          </div>
          <div className='col tree'>
            <Sparklines data={treeRisk}>
              <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
              <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
              <SparklinesReferenceLine type='mean' />
            </Sparklines>
            <h3>Tree Pollen</h3>
            <img src="https://www.pngitem.com/pimgs/m/124-1243883_palm-tree-top-png-tree-icon-png-transparent.png" alt='tree' width='80' />
            <p className={pollenData.tree[0].Category} >{pollenData.tree[0].Category} Risk</p>
          </div>
          <div className='col weed' >
            <Sparklines data={weedRisk}>
              <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
              <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
              <SparklinesReferenceLine type='mean' />
            </Sparklines>
            <h3>Weed Pollen</h3>
            <img src='https://cdn-icons-png.flaticon.com/512/25/25207.png' alt='weed' width='80' />
            <p className={pollenData.weed[0].Category} >{pollenData.weed[0].Category} Risk</p>
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