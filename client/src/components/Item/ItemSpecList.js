import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 8,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ItemSpecList = ({ specs }) => {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Product Specifications">
        <TableBody>
          {Object.entries(specs).map(([key, value]) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row">
                {key}
              </StyledTableCell>
              <StyledTableCell>{value}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemSpecList;
