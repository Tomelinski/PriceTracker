import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ItemSearch } from "../../search";
import QuickTips from "../../tips/QuickTips";

const Home = () => {

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
        
      </Grid>
      <Grid item xs={6}>
      <Box mt={3} mb={3} xs={6}>
          <Typography  variant="h4" align="center">
            Quick Tips
          </Typography>
          <QuickTips />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;