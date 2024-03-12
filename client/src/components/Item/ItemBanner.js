import * as React from "react";
import {
  Paper,
  Typography,
  Grid,
  Link,
  Box,
  Button,
  CardMedia,
} from "@mui/material";
import { ItemSpecList, ItemPrice } from ".";

const ItemBanner = ({ product }) => {
  const {
    name,
    imageURL,
    inStoreOnly,
    specifications,
    siteURL,
    retailer,
  } = product;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "theme.palette.common.white",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "theme.palette.common.white",
        }}
      />
      <Grid container justifyContent="center">
        <CardMedia
          component="img"
          sx={{ objectFit: "contain", width: 350, margin: ".5em .1em" }}
          image={imageURL}
          title={name}
        />
        <Grid item md={6} m="2.5rem 0">
          <Box p={3}>
            <Box>
              <Typography
                component="h1"
                variant="h5"
                align="left"
                color="inherit"
                gutterBottom
              >
                {name}
              </Typography>
            </Box>
            <ItemPrice product={product}/>
            <Box mb={3}>
              <ItemSpecList specs={specifications} />
            </Box>
            <Box position="absolute" bottom={"3em"}>
              <Button
                variant="outlined"
                color="error"
                size="large"
                {...(inStoreOnly ? { disabled: true } : {})}
              >
                <Link
                  variant="body2"
                  underline="none"
                  rel="noreferrer"
                  color="red"
                  href={siteURL}
                >
                  {inStoreOnly
                    ? `${retailer} In store only deal`
                    : `View on ${retailer}`}
                </Link>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ItemBanner;
