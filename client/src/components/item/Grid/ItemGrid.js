import React from "react";
import PropTypes from 'prop-types';
import {
  Box, Grid, Typography, Button,
} from "@mui/material";
import { ItemCard } from "../Card";

const ItemGrid = ({
  dealType,
  items,
  auth,
  checkFavorite,
  manageFavorites,
  checkNotification,
  manageNotifications,
  handleIncreaseItemsPerPage,
}) => (
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
                isNotification={checkNotification(product.id)}
                manageNotifications={manageNotifications}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body2">
            {`No ${dealType} available.`}
          </Typography>
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

ItemGrid.propTypes = {
  dealType: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  checkFavorite: PropTypes.func.isRequired,
  manageFavorites: PropTypes.func.isRequired,
  checkNotification: PropTypes.func.isRequired,
  manageNotifications: PropTypes.func.isRequired,
  handleIncreaseItemsPerPage: PropTypes.func.isRequired,
};

export default ItemGrid;
