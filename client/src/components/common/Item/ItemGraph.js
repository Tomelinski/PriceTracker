import React, { useState, useEffect } from "react";
import ItemLegend from "./ItemLegend";
import { Paper, Grid, Typography, Divider } from "@mui/material";

import Plotly from "plotly.js-dist";

const ItemGraph = ({ priceHistory, retailer }) => {
  const [dates, setDates] = useState([]);
  const [prices, setPrices] = useState([]);

  const [graph, setGraph] = useState([]);

  const [legend, setLegend] = useState({
    Highest: 0,
    Lowest: 0,
    Average: 0,
    Current: 0,
  });
  const CHART_COLORS = ["red", "green", "Blue", "green"];
  const CHART_NAMES = ["Highest", "Lowest", "Average", "Price History"];

  const hover = `%{x}<br><i>Price</i>: $%{y:.2f}`;
  const hoverDoted = (name) => `${name} <i>Price</i>: $%{y:.2f}`;

  const makeGraph = (name, color = "blue") => {
    const yVal =
      name === "Highest" || name === "Lowest" || name === "Average"
        ? Array(prices.length).fill(legend[name])
        : prices;

    const dash = ["Highest", "Lowest", "Average"].includes(name)
      ? "dash"
      : null;

    setGraph((g) => [
      ...g,
      {
        x: dates,
        y: yVal,
        mode: "lines",
        name: name,
        line: { shape: "hv", fill: "tonexty", color: color, dash: dash },
        hovertemplate: name === "Price History" ? hover : hoverDoted(name),
        type: "scatter",
      },
      {
        x: dates.slice(-1),
        y: yVal.slice(-1),
        mode: "markers+text",
        name: name,
        line: { color: color },
        text: yVal.slice(-1)[0],
        textposition: "middle right",
        showlegend: false,
        type: "scatter",
      },
    ]);
  };

  useEffect(() => {
    const updatedDates = priceHistory.map((history) => history.date);
    const updatedPrices = priceHistory.map((history) => history.price);
    setDates(updatedDates);
    setPrices(updatedPrices);
  }, [priceHistory]);

  useEffect(() => {
    if (prices.length > 0) {
      setLegend({
        Highest: Math.max(...prices),
        Lowest: Math.min(...prices),
        Average: getAverage(prices),
        Current: prices.slice(-1)[0],
      });
    }
  }, [prices]);

  useEffect(() => {
    if (graph.length <= 0 && prices.length > 0) {
      CHART_NAMES.map((name, i) => {
        makeGraph(name, CHART_COLORS[i]);
      });
    }
  }, [legend]);

  useEffect(() => {
    const padding = yPadding(prices);

    const selectorOptions = {
      buttons: [
        {
          step: "month",
          stepmode: "backward",
          count: 1,
          label: "1m",
        },
        {
          step: "month",
          stepmode: "backward",
          count: 6,
          label: "6m",
        },
        {
          step: "year",
          stepmode: "backward",
          count: 1,
          label: "1y",
        },
        {
          step: "all",
        },
      ],
    };

    const layout = {
      xaxis: {
        type: "date",
        tickformat: "%d %b, %Y",
        rangeselector: selectorOptions,
      },
      yaxis: {
        range: [legend.Lowest - padding, legend.Highest + padding],
        fixedrange: true,
        tickformat: "$,d",
      },
      hovermode: "closest",
      type: "scatter",
      spikemode: "toaxis",
      legend: {
        font: { size: 16 },
        yref: "paper",
      },
    };

    Plotly.newPlot("graph", graph, layout, {
      responsive: true,
    });
  }, [legend, graph, prices]);

  const getAverage = (data) => {
    const numericData = data.map(Number);
    const sum = numericData.reduce(
      (acc, val) => acc + (isNaN(val) ? 0 : val),
      0
    );
    const average = data.length > 0 ? sum / data.length : 0;

    return average.toFixed(2);
  };

  const yPadding = (data) => {
    const maxPrice = Math.max(...data);

    if (maxPrice >= 600) {
      return 50;
    } else if (maxPrice >= 400) {
      return 30;
    } else if (maxPrice >= 200) {
      return 20;
    } else {
      return 10;
    }
  };

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
      <Typography
        component="h1"
        variant="h5"
        align="center"
        color="inherit"
        m={1}
      >
        {retailer} Price History
      </Typography>
      <Divider light />
      <Grid container m={2} spacing={2}>
        <ItemLegend legend={legend} />
      </Grid>
      <Grid id="graph" container></Grid>
    </Paper>
  );
}

export default ItemGraph;