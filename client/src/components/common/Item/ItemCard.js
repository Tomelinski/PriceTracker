import * as React from 'react';
import { Card,CardActions,CardContent,CardMedia,Button,Typography } from "@mui/material";

const ItemCard = (props) => {
  const { item } = props;

    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={item.imageURL}
          title="Costco Item"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            test title
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View Price History</Button>
        </CardActions>
      </Card>
    );
  }

export default ItemCard;