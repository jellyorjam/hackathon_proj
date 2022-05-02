import { useSelector } from "react-redux";

const PollenData = () => {

  const data = useSelector((state) => {
    return state.pollen.value
  })

  console.log(data);

  return (
    <div>pollen</div>
  )
};

export default PollenData;