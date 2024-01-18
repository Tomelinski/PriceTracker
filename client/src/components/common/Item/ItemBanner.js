import * as React from 'react';
import { Paper, Typography, Grid, Link, Box, Button  } from "@mui/material";
import { Table, TableBody, TableContainer } from "@mui/material";
import ItemSpecList from './ItemSpecList';


export default function ItemBanner(props) {
    const { product } = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'theme.palette.common.white',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'theme.palette.common.white',
        }}
      />
      <Grid container justifyContent="center">
        <Box sx={{ width: 350 }}>
            {<img src={product.imageURL} alt={product.name} />}
        </Box>
        <Grid item md={6}>
          <Box p={3} >
            <Box>
                <Typography component="h1" variant="h5" align="left" color="inherit" gutterBottom>
                    {product.name}
                </Typography>
            </Box>
            <Box>
                <Typography component="h1" variant="h5" align="left" color="inherit" gutterBottom>
                    Price: {product.price}
                </Typography>
            </Box>
            <Box mb={3}>
              <TableContainer component={Paper}>
                <Table aria-label="Product Specifications">
                    <TableBody>
                        <ItemSpecList specs={product.specifications}/>
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
            <Box>
                <Button variant="contained" size="large">
                    <Link variant="body2" underline="none" rel="noreferrer" color="yellow" href={product.siteURL}>
                        View on {product.retailer} 
                    </Link>
                </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
  }
