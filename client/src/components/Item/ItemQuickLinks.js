import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Box, Grid, Typography, Button } from "@mui/material";
import { createFavorites, deleteFavorites, fetchDealItems, fetchFavorites } from "../../api/Axios";
import ItemCard from "./ItemCard";

const ItemQuickLinks = () => {
  const auth = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [dealProducts, setDealProducts] = useState([]);
  const [inStoreProducts, setInStoreProducts] = useState([]);
  const [dealsPerPage, setDealsPerPage] = useState(3);
  const [inStoresPerPage, setInStoresPerPage] = useState(3);

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
      console.error('Error updating favorites:', error);
    }
  };

  useEffect(() => {
    const getFavorites = async () => {
      try {
        if (auth?.isLoggedIn) {
          const favoritesResponse = await fetchFavorites(auth.userData.id);

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
        const dealProductsResponse = await fetchDealItems(false, dealsPerPage);

        if (dealProductsResponse && dealProductsResponse.data) {
          setDealProducts(dealProductsResponse.data);
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

        if (inStoreProductsResponse && inStoreProductsResponse.data) {
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

    if (e.target.id === "increaseDeals") {
      setDealsPerPage((prevDealsPerPage) => prevDealsPerPage + 3);
    } else if (e.target.id === "increaseInStore") {
      setInStoresPerPage((prevInStoresPerPage) => prevInStoresPerPage + 3);
    }
  };

  const checkFavorite = (productId) => {
    return favorites.length > 0 ? favorites.includes(productId) : false;
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <Box mt={3}>
          <Typography variant="h4" gutterBottom>
            Best Deals
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            {dealProducts.length > 0 ? (
              dealProducts.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={4}>
                  <ItemCard
                    product={product}
                    auth={auth}
                    favorited={checkFavorite(product.id)}
                    manageFavorites={manageFavorites}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="body2">
                No deal products available.
              </Typography>
            )}
          </Grid>
        </Box>
        <Box mt={3}>
          <Button
            id="increaseDeals"
            variant="text"
            color="error"
            onClick={handleIncreaseItemsPerPage}
          >
            Show More
          </Button>
        </Box>

        <Box mt={3}>
          <Typography variant="h4" gutterBottom>
            In-Store only Deals
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            {inStoreProducts.length > 0 ? (
              inStoreProducts.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={4}>
                  <ItemCard
                    product={product}
                    auth={auth}
                    favorited={checkFavorite(product.id)}
                    manageFavorites={manageFavorites}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="body2">
                No in-store deal products available.
              </Typography>
            )}
          </Grid>
        </Box>
        <Box mt={3}>
          <Button
            id="increaseInStore"
            variant="text"
            color="error"
            onClick={handleIncreaseItemsPerPage}
          >
            Show More
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ItemQuickLinks;
