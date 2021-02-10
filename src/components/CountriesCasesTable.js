import React from 'react'
import numeral from 'numeral'
import sortData from './Util';
import { withStyles, makeStyles, Table, 
    TableBody, TableCell, TableContainer,
     TableHead, TableRow,Paper} from '@material-ui/core'
import './Table.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    
  },
  tablecontainer:{
    height: 580,
  }
});

function CountriesCasesTable({countries}) {
    const classes = useStyles();
    return (

    <TableContainer component={Paper} className={classes.tablecontainer}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Country</StyledTableCell>
            <StyledTableCell align="right">Cases</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries.map((country) => (
            <StyledTableRow key={country.country}>
              <StyledTableCell component="th" scope="row">
                {country.country}
              </StyledTableCell>
              <StyledTableCell align="right">{numeral(country.cases).format("0,0")}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default CountriesCasesTable
