import React, { useContext } from "react";
import {
  Paper, Typography, Grid, Box,
} from "@mui/material";
import AuthContext from "../../../context/authContext";

const UserBanner = () => {
  const auth = useContext(AuthContext);
  const { name, emailAddress } = auth.user;

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
        <Grid item md={6} m="2.5rem 0">
          <Box p={3}>
            <Box mb={3}>
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
            <Box mb={3}>
              <Typography
                component="h1"
                variant="h5"
                align="left"
                color="inherit"
                gutterBottom
              >
                {emailAddress}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default UserBanner;
