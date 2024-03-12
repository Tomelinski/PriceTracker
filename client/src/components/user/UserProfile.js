import React from "react";
import { Box, Grid } from "@mui/material";
import { UserFavorites, UserBanner } from "./";

const UserProfile = () => {

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <Box mb={3}>
            <UserBanner />
        </Box>
        <Box mb={3}>
            <UserFavorites />
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
