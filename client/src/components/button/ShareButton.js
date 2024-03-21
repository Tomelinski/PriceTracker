import React from "react";
import PropTypes from 'prop-types';
import {
  IconButton,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { ROUTE, DOMAIN_NAME } from "../../constants/Constants";

const ShareButton = ({ product }) => {
  const { id } = product;
  const itemURL = ROUTE.ITEM(id);

  return (
    <IconButton
      aria-label="Share"
      size="medium"
      onClick={() => {
        navigator.clipboard.writeText(DOMAIN_NAME + itemURL);
      }}
    >
      <ShareIcon />
    </IconButton>
  );
};

ShareButton.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ShareButton;
