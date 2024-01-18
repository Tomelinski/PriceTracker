import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ItemSearch } from "../../search";
import ItemPage from "../Item/ItemPage";

const Home = () => {
  
  const clickHandler = () => {
    
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10}>
        <Box mt={3}>
          <Typography variant="h4" align="center">
            Home
          </Typography>
        </Box>
        <Box mt={3} mb={3}>
          <ItemSearch />
        </Box>
        <Box>
          <ItemPage />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;