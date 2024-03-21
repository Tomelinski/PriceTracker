import React from "react";
import PropTypes from 'prop-types';
import { Grid, Button } from "@mui/material";

const CHART_COLORS_HEX = ["#d62728", "#2ca02c", "#1f77b4", "#2ca02c"];
// const CHART_COLORS = ["red", "green", "Blue", "green"];

const ItemLegend = ({ legend }) => (
  <Grid container spacing={2}>
    {Object.entries(legend).map(([key, value], i) => (
      <Grid item xs={2} key={`${key}-button`}>
        <Button
          variant="outlined"
          sx={{
            color: CHART_COLORS_HEX[i],
            borderColor: CHART_COLORS_HEX[i],
          }}
        >
          {key}
          {' '}
          Price: $
          {value}
        </Button>
      </Grid>
    ))}
  </Grid>
);

ItemLegend.propTypes = {
  legend: PropTypes.object.isRequired,
};

export default ItemLegend;
