import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";
import { APP_NAME } from "../../constants/Constants";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        padding: "2rem",
        marginTop: "auto",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h6" color="text.primary" gutterBottom>
          {APP_NAME}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </Typography>

        <Box mt={2}>
          <Link href="/about" color="text.primary" sx={{ marginRight: 2 }}>
            About Us
          </Link>
          <Link href="/contact" color="text.primary">
            Contact
          </Link>
        </Box>

        {/* <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            Follow Us:
          </Typography>
          <Link
            href="https://twitter.com"
            color="text.primary"
            sx={{ marginRight: 2 }}
          >
            Twitter
          </Link>
          <Link href="https://facebook.com" color="text.primary">
            Facebook
          </Link>
        </Box> */}
      </Container>
    </Box>
  );
};

export default Footer;
