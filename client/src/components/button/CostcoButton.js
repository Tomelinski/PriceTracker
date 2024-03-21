import React from "react";
import PropTypes from 'prop-types';
import { Button } from "@mui/material";

const CostcoButton = ({ siteURL }) => (
  <Button
    variant="outlined"
    color="error"
    onClick={() => window.open(siteURL)}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...(siteURL === "" ? { disabled: true } : {})}
    size="small"
  >
    Visit Costco
  </Button>
);

CostcoButton.propTypes = {
  siteURL: PropTypes.string.isRequired,
};

export default CostcoButton;
