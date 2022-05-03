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

  console.log(useSelector(state => state.pollen))
  
  return (
    <div>pollen</div>
  )
};

export default PollenData;