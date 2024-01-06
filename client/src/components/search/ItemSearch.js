import React, { useState } from "react";
import "./ItemSearch.css";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { fetchItem } from "../../api/Axios";

const ItemSearch = () => {
    const [productURL, setProductURL] = useState();

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            await fetchItem(productURL).then((res) => {
                console.log(res);
            });
        } catch(err){
            console.log("Error: " + err)
        }
    }

  return (
    <form onSubmit={handleSearch}>
      <div className="search-container">
        <div className="search-icon-wrapper">
          <SearchIcon />
        </div>
        <InputBase
          className="styled-input-base"
          placeholder="Find Costco Product..."
          onChange={(e) => setProductURL(e.target.value)}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </form>
  );
};

export default ItemSearch;
