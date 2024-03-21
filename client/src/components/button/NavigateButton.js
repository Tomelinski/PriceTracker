import React from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const NavigateButton = ({ itemURL }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={() => navigate(itemURL)}
      size="small"
    >
      View Price History
    </Button>
  );
};

NavigateButton.propTypes = {
  itemURL: PropTypes.string.isRequired,
};

export default NavigateButton;
