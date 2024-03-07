import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ItemSearch } from "../search";
import QuickTips from "../tips/QuickTips";
import ItemQuickLinks from "../item/ItemQuickLinks";

const Home = () => {
  return (
    <>
      <Box mt={3}>
        <Typography variant="h4" align="center">
          Home
        </Typography>
      </Box>
      <Box mt={3} mb={3}>
        <ItemSearch />
      </Box>
      <Box>
        <ItemQuickLinks />
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={8}>
          <Box mt={3} mb={3}>
            <Typography variant="h4" align="center">
              Quick Tips
            </Typography>
            <QuickTips />
          </Box>
        </ Grid>
      </ Grid>
    </>
  );
};

export default Home;
