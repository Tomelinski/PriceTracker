import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE, DOMAIN_NAME } from "../../constants/Constants";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { ItemPrice } from ".";

const ItemCard = ({ product, auth, favorited, manageFavorites }) => {
  const navigate = useNavigate();
  const { id, name, imageURL, siteURL } = product;
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
          <IconButton
            aria-label="Favorite"
            size="medium"
            onClick={() => auth?.isLoggedIn && manageFavorites(id)}
          >
            {auth?.isLoggedIn ? (
              favorited ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton
            aria-label="Share"
            size="medium"
            onClick={() => {
              navigator.clipboard.writeText(DOMAIN_NAME + itemURL);
            }}
          >
            <ShareIcon />
          </IconButton>
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
        <div align="right">
          <ItemPrice product={product} />
        </div>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate(itemURL)}
          size="small"
        >
          View Price History
        </Button>
        <Button variant="outlined" color="error" onClick={() => window.open(siteURL)} size="small">
          Visit Costco
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
