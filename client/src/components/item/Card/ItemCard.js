import React from "react";
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../constants/Constants";
import { ItemPrice } from "../Price";
import {
  FavoriteButton,
  NotificationButton,
  ShareButton,
  NavigateButton,
  CostcoButton,
} from "../../button";

const ItemCard = ({
  product,
  auth,
  favorited,
  manageFavorites,
  isNotification,
  manageNotifications,
}) => {
  const navigate = useNavigate();
  const {
    id, name, imageURL, siteURL,
  } = product;
  const itemURL = ROUTE.ITEM(id);

  return (
    <Card sx={{ maxWidth: 375 }}>
      <Grid container justifyContent="right" sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            mx: 1,
            my: 1,
            top: 0,
            right: 0,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <FavoriteButton
            product={product}
            auth={auth}
            favorited={favorited}
            manageFavorites={manageFavorites}
          />
          <ShareButton product={product} />
          <NotificationButton
            product={product}
            auth={auth}
            isNotification={isNotification}
            manageNotifications={manageNotifications}
          />
        </Box>
      </Grid>
      <CardMedia
        component="img"
        sx={{ objectFit: "contain", height: 250, margin: ".5em .1em" }}
        image={imageURL}
        onClick={() => navigate(itemURL)}
        title="Costco Item"
      />
      <CardContent
        sx={{
          display: "flex",
          backgroundColor: "#f8f9fa",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "120px",
          padding: "1em",
        }}
      >
        <Typography align="left" gutterBottom variant="h6">
          {name}
        </Typography>
        <Box align="right">
          <ItemPrice product={product} />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
        <NavigateButton itemURL={itemURL} />
        <CostcoButton siteURL={siteURL ?? ''} />
      </CardActions>
    </Card>
  );
};

ItemCard.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  favorited: PropTypes.bool.isRequired,
  manageFavorites: PropTypes.func.isRequired,
  isNotification: PropTypes.bool.isRequired,
  manageNotifications: PropTypes.func.isRequired,
};

export default ItemCard;
