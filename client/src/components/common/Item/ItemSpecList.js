import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function ItemSpecList(props) {
    const { specs } = props;

    return (
        <>
            {Object.entries(specs).map(([key, value]) => (
                <StyledTableRow key={key}>
                    <StyledTableCell component="th" scope="row">
                        {key} 
                    </StyledTableCell>
                    <StyledTableCell>{value}</StyledTableCell>
                </StyledTableRow>
            ))}
        </>
    );
}
