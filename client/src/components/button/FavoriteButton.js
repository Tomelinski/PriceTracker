import React from "react";
import PropTypes from 'prop-types';
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const favoriteButton = ({
  product, auth, favorited, manageFavorites,
}) => {
  const { id } = product;

  const isFavorited = () => {
    if (auth?.isLoggedIn && favorited) {
      return <FavoriteIcon />;
    }
    return <FavoriteBorderIcon />;
  };

  return (
    <IconButton
      aria-label="Favorite"
      size="medium"
      onClick={() => auth?.isLoggedIn && manageFavorites(id)}
    >
      {isFavorited()}
    </IconButton>
  );
};

favoriteButton.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  favorited: PropTypes.bool.isRequired,
  manageFavorites: PropTypes.func.isRequired,
};

export default favoriteButton;
