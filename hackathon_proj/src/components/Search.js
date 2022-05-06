import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setZipcode } from "../reducers/locationSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetOnNewClick } from "../reducers/covidSlice";
import _ from 'lodash';

const schema = yup.object().shape({
  zipcode: yup.string()
  .required()
  .matches(/^[0-9]+$/, "Must be a number")
  .min(5, "Must be exactly 5 digits")
  .max(5, "Must be exactly 5 digits")
});

const Search = ({load}) => {
  const dispatch = useDispatch();
  const covidState = useSelector(state => state.covid)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmitHandler = (data) => {
    load(true);
    if (_.isEmpty(covidState)) {
      dispatch(setZipcode(data));
    }
    else {
      dispatch(resetOnNewClick());
      dispatch(setZipcode(data));
    }
    
    reset();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="container align-content-center">
        <input {...register("zipcode")} className="form-control search-bar"
            placeholder="Search Covid and Pollen data for your zip code" type="zipcode" required />
        <p className="red">{errors.zipcode?.message}</p>
        <br/>
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Search;