import React from "react";
import { Grid, Button } from "@mui/material";

const CHART_COLORS_HEX = ["#d62728", "#2ca02c", "#1f77b4", "#2ca02c"];
// const CHART_COLORS = ["red", "green", "Blue", "green"];


export default function ItemLegend({ legend }) {
  const chartNames = Object.keys(legend);

  return (
      <Grid container spacing={2}>
        {Object.entries(legend).map(([key, value], i) => (
          <Grid item xs={2} key={`${key}-button`}>
            <Button
              variant="outlined"
              sx={{ 
                color: CHART_COLORS_HEX[i],
                borderColor: CHART_COLORS_HEX[i] 
              }}
            >
              {key} Price: ${value}
            </Button>
          </Grid>
        ))}
      </Grid>
  );
};
