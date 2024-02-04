import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constants/Constants";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { id, name, imageURL, price, siteURL } = item;

  const handleRedirect = async (e) => {
    e.preventDefault();
    try {
      navigate(`${ROUTE.ITEM}/${id}`);
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  return (
    <Card sx={{ maxWidth: 375 }}>
        <CardMedia component="img" sx={{ objectFit: "contain", height: 250, margin: '.5em .1em' }} image={imageURL} title="Costco Item" />
        <CardContent 
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "110px",
            padding: '1em',
          }}
          align='left'
        >
          <Typography gutterBottom variant="h6">
            {name}
          </Typography>
          <Typography variant="h6">Price: {price}</Typography>
        </CardContent>
      <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
        <Button variant="outlined" color="error" onClick={handleRedirect} size="small">
          View Price History
        </Button>
        <Button variant="outlined" color="error" href={siteURL} size="small">
          Visit Costco
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
