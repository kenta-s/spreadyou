import React from 'react';
import { connect } from "react-redux"
import {
  fetchMyProducts,
} from "../actions/myProducts"

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

const MyProducts = ({fetchMyProducts, myProducts}) => {
  const classes = useStyles();
  React.useEffect(() => {
    fetchMyProducts()
  }, [])

  const rows = myProducts
  return (
    <React.Fragment>
    { rows.length === 0
      ?
      <div>
        見つかりません
      </div>
      :
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>summary</TableCell>
            <TableCell align="right">url</TableCell>
            <TableCell align="right">created at</TableCell>
            <TableCell align="right">tweeted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.summary}
              </TableCell>
              <TableCell align="right">{row.url}</TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
              <TableCell align="right">{row.tweets.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    }
    </React.Fragment>
  )
}


const mapStateToProps = state => {
  return { 
    myProducts: state.myProducts.items,
    currentUser: state.reduxTokenAuth.currentUser,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMyProducts: () => dispatch(fetchMyProducts()),
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps 
)(MyProducts)
