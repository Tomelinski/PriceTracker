import React from "react";
import { Box, Grid } from "@mui/material";
import { UserBanner } from "../banner";
import { UserContent } from "../content";

const UserProfile = () => (
  <Grid container justifyContent="center">
    <Grid item xs={10}>
      <Box mb={3}>
        <UserBanner />
      </Box>
      <Box mb={3}>
        <UserContent />
      </Box>
    </Grid>
  </Grid>
);

export default UserProfile;
