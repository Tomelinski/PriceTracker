import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Grid } from "@mui/material";
import {
  createFavorites,
  deleteFavorites,
  fetchFavoriteIds,
  fetchFavoriteItems
} from "../../api/Axios";
import { DEAL_LIMIT } from "../../constants/Constants";
import ItemGrid from "../item/ItemGrid";

const UserFavorites = () => {
  const auth = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [favoritesPerPage, setFavoritesPerPage] = useState(DEAL_LIMIT);

  const manageFavorites = async (productId) => {
    try {
      if (auth?.isLoggedIn) {
        const isFavorited = favorites.includes(productId);
        console.log(favorites);

        if (isFavorited) {
          await deleteFavorites(auth.userData.id, productId);
        } else {
          await createFavorites(auth.userData.id, productId);
        }

        setFavorites((prevFavorites) =>
          isFavorited
            ? prevFavorites.filter((id) => id !== productId)
            : [...prevFavorites, productId]
        );
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  useEffect(() => {
    const getFavorites = async () => {
      try {
        if (auth?.isLoggedIn) {
          const favoritesResponse = await fetchFavoriteIds(auth.userData.id);

          if (favoritesResponse) {
            setFavorites(favoritesResponse);
          }
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    getFavorites();
  }, [auth]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const favProductsResponse = await fetchFavoriteItems(auth.userData.id, favoritesPerPage);

        if (favProductsResponse) {
            setFavoriteProducts(favProductsResponse);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [favoritesPerPage]);

  const handleIncreaseItemsPerPage = (e) => {
    e.preventDefault();

    if (e.target.id === "increasFavorites") {
        setFavoritesPerPage((prevPerPage) => prevPerPage + 3);
    }
  };

  const checkFavorite = (productId) => {
    return favorites.length > 0 ? favorites.includes(productId) : false;
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <ItemGrid
          dealType={"Favorites"}
          items={favoriteProducts}
          auth={auth}
          checkFavorite={checkFavorite}
          manageFavorites={manageFavorites}
          handleIncreaseItemsPerPage={handleIncreaseItemsPerPage}
        />
      </Grid>
    </Grid>
  );
};

export default UserFavorites;
