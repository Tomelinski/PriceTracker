import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { fetchItem } from "../../api/Axios";
import { ROUTE } from "../../constants/Constants";
import "./ItemSearch.css";

const ItemSearch = () => {
  const navigate = useNavigate();
  const [productURL, setProductURL] = useState();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const item = await fetchItem(null, productURL);
      navigate(ROUTE.ITEM(item.id), { state: { itemObject: item } });
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="search-container">
        <div className="search-icon-wrapper">
          <SearchIcon />
        </div>
        <InputBase
          sx={{ width: "35rem" }}
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
