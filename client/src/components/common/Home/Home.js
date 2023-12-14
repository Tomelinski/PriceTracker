import React from "react";
import { Box, Stack, Button } from "@mui/material";

const Home = () => {
  
  const clickHandler = () => {
    
  };

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={clickHandler}>Text Here</Button>
        </Stack>
      </Box>
    </>
  );
};

export default Home;