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
import Title from './Title';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NewProductModal from './NewProductModal';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const MyProducts = ({fetchMyProducts, myProducts}) => {
  const classes = useStyles();
  const [newProductModalIsOpen, setProductModalOpen] = React.useState(false);
  React.useEffect(() => {
    fetchMyProducts()
  }, [])

  const rows = myProducts
  return (
    <React.Fragment>
    <Title>自分のプロダクト</Title>
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
    <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => setProductModalOpen(true)}>
      <AddIcon />
    </Fab>
    <NewProductModal open={newProductModalIsOpen} setOpen={setProductModalOpen} />
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
