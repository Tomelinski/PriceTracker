import React from "react";
import { Box } from "@mui/material";
import { ItemSearch } from "../search";
import QuickTips from "../tips/QuickTips";
import { ItemHome } from "../item/Home";

const Home = () => (
  <>
    <Box mb={3}>
      <ItemSearch />
    </Box>
    <Box mb={3}>
      <ItemHome />
    </Box>
    <Box mb={3}>
      <QuickTips />
    </Box>
  </>
);

export default Home;
