import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ItemSearch.css";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { fetchItem } from "../../api/Axios";
import { ROUTE } from "../../constants/Constants";

const ItemSearch = () => {
  const navigate = useNavigate();
    const [productURL, setProductURL] = useState();

  const handleSearch = async (e) => {
      e.preventDefault();

      try {
          await fetchItem(null, productURL).then((res) => {
            if (res.status === 200) {
              navigate(`${ROUTE.ITEM}/${res.data.id}`, { state: { itemObject: res.data } });
            }
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
          sx={{width: '35rem'}}
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
