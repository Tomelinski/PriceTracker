import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Grid } from "@mui/material";
import {
  createFavorites,
  deleteFavorites,
  fetchDealItems,
  fetchFavoriteIds,
} from "../../api/Axios";
import { DEAL_LIMIT } from "../../constants/Constants";
import { ItemGrid } from ".";

const ItemHome = () => {
  const auth = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [webProducts, setWebProducts] = useState([]);
  const [inStoreProducts, setInStoreProducts] = useState([]);
  const [dealsPerPage, setDealsPerPage] = useState(DEAL_LIMIT);
  const [inStoresPerPage, setInStoresPerPage] = useState(DEAL_LIMIT);

  const manageFavorites = async (productId) => {
    try {
      if (auth?.isLoggedIn) {
        const isFavorited = favorites.includes(productId);

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
        const webProductsResponse = await fetchDealItems(false, dealsPerPage);

        if (webProductsResponse?.data) {
          setWebProducts(webProductsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [dealsPerPage]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const inStoreProductsResponse = await fetchDealItems(
          true,
          inStoresPerPage
        );

        if (inStoreProductsResponse?.data) {
          setInStoreProducts(inStoreProductsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [inStoresPerPage]);

  const handleIncreaseItemsPerPage = (e) => {
    e.preventDefault();

    if (e.target.id === "increas-all") {
      setDealsPerPage((prevDealsPerPage) => prevDealsPerPage + 3);
    } else if (e.target.id === "increase-webOnly") {
      setDealsPerPage((prevDealsPerPage) => prevDealsPerPage + 3);
    } else if (e.target.id === "increase-inStoreOnly") {
      setInStoresPerPage((prevInStoresPerPage) => prevInStoresPerPage + 3);
    }
  };

  const checkFavorite = (productId) => {
    return favorites.length > 0 ? favorites.includes(productId) : false;
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <ItemGrid
          dealType={"webOnly"}
          items={webProducts}
          auth={auth}
          checkFavorite={checkFavorite}
          manageFavorites={manageFavorites}
          handleIncreaseItemsPerPage={handleIncreaseItemsPerPage}
        />
        <ItemGrid
          dealType={"inStoreOnly"}
          items={inStoreProducts}
          auth={auth}
          checkFavorite={checkFavorite}
          manageFavorites={manageFavorites}
          handleIncreaseItemsPerPage={handleIncreaseItemsPerPage}
        />
      </Grid>
    </Grid>
  );
};

export default ItemHome;
