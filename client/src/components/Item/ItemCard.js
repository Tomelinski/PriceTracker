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
import ItemPrice from "./itemPrice";

const ItemCard = ({ product }) => {
  const navigate = useNavigate();
  const { id, name, imageURL, siteURL } = product;

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
      <CardMedia
        component="img"
        sx={{ objectFit: "contain", height: 250, margin: ".5em .1em" }}
        image={imageURL}
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
          <ItemPrice product={product}/>
        </div>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleRedirect}
          size="small"
        >
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
