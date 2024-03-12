import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { QUICK_TIPS } from "../../constants/Constants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 24,
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

const QuickTips = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <Box mb={3}>
          <Typography variant="h4" align="center">
            Quick Tips
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="Quick tips">
            <TableBody>
              {QUICK_TIPS.map(({ title, description }) => (
                <StyledTableRow key={title}>
                  <StyledTableCell component="th" scope="row">
                    {title}
                  </StyledTableCell>
                  <StyledTableCell>{description}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default QuickTips;
