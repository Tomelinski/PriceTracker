import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { fetchDealItems } from "../../api/Axios";
import ItemCard from "./ItemCard";

const ItemQuickLinks = () => {
  const [dealProducts, setDealProducts] = useState([]);
  const [inStoreProducts, setInStoreProducts] = useState([]);
  const [dealsPerPage, setDealsPerPage] = useState(3);
  const [inStoresPerPage, setInStoresPerPage] = useState(3);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const dealProductsResponse = await fetchDealItems(
          false,
          dealsPerPage
        );

        console.log(dealProductsResponse);
        
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

  return (
    <Container>
      <Box mt={3}>
        <Typography variant="h4" gutterBottom>
          Best Deals
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          {dealProducts.length > 0 ? (
            dealProducts.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4}>
                <ItemCard item={item} />
              </Grid>
            ))
          ) : (
            <Typography variant="body2">No deal products available.</Typography>
          )}
        </Grid>
      </Box>
      <Box mt={3}>
        <Button
          id="increaseDeals"
          variant="contained"
          onClick={handleIncreaseItemsPerPage}
        >
          Show More Deals
        </Button>
      </Box>

      <Box mt={3}>
        <Typography variant="h4" gutterBottom>
          In-Store only Deals
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          {inStoreProducts.length > 0 ? (
            inStoreProducts.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4}>
                <ItemCard item={item} />
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
          variant="contained"
          onClick={handleIncreaseItemsPerPage}
        >
          Show More InStore Only Deals
        </Button>
      </Box>
    </Container>
  );
};

export default ItemQuickLinks;
