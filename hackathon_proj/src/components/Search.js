import { useState } from "react";

const Search = () => {
  const [search, createSearch] = useState('');

  const handleSubmit = () => {
    console.log(search)
  }
  return (
    <div className="container align-content-center">
      <br/>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => createSearch(e.target.value)} className="form-control search-bar" placeholder="Search Covid and Pollen data for your zip code" />
      </form>
    </div>
  )
};

export default Search;