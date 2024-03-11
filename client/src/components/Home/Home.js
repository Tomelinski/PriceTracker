import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ItemSearch } from "../search";
import QuickTips from "../tips/QuickTips";
import ItemHome from "../item/ItemHome";

const Home = () => {
  return (
    <>
      <Box mb={3}>
        <Typography variant="h4" align="center">
          Home
        </Typography>
      </Box>
      <Box mb={3}>
        <ItemSearch />
      </Box>
      <Box mb={3}>
        <ItemHome />
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={8}>
          <Box mb={3}>
            <Typography variant="h4" align="center">
              Quick Tips
            </Typography>
          </Box>
          <Box mb={3}>
            <QuickTips />
          </Box>
        </ Grid>
      </ Grid>
    </>
  );
};

export default Home;
