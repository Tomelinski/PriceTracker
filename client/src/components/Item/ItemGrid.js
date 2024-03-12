import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { ItemCard } from ".";

const ItemGrid = ({
  dealType,
  items,
  auth,
  checkFavorite,
  manageFavorites,
  handleIncreaseItemsPerPage,
}) => {
  return (
    <Box>
      <Box mt={3}>
        <Typography variant="h4" gutterBottom>
          {dealType}
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          {items.length > 0 ? (
            items.map((product) => (
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
            <Typography variant="body2">No {dealType} available.</Typography>
          )}
        </Grid>
      </Box>
      <Box mt={3}>
        <Button
          id={`increase-${dealType}`}
          variant="text"
          color="error"
          onClick={handleIncreaseItemsPerPage}
        >
          Show More
        </Button>
      </Box>
    </Box>
  );
};

export default ItemGrid;
