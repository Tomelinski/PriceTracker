import * as React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

const ItemPrice = ({ product }) => {
  const { prevPrice, dealAmount, price } = product;

  const generateRow = (label, value) => (
    <TableRow key={label}>
      <TableCell sx={{
        alignItems: 'flex-start', borderBottom: "none", width: '10%', padding: '0',
      }}
      >
        <Typography variant="body2" align="right" color="inherit">
          {label}
        </Typography>
      </TableCell>
      <TableCell sx={{ borderBottom: "none", padding: '0' }}>
        <Typography variant="body2" align="right" color="inherit">
          $
          {value}
        </Typography>
      </TableCell>
    </TableRow>
  );

  return (
    <Table mb={3} style={{ width: 150 }}>
      <TableBody>
        {generateRow('Original:', prevPrice)}
        {generateRow('Discount:', dealAmount)}
        {generateRow('Price:', price)}
      </TableBody>
    </Table>
  );
};

ItemPrice.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ItemPrice;
