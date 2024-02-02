import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
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
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={imageURL} title="Costco Item" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2">Price: {price}</Typography>
      </CardContent>
      <CardActions>
        <Button href={siteURL} size="small">
          Visit Costco
        </Button>
        <Button onClick={handleRedirect} size="small">
          View Price History
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
