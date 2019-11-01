import React from 'react';
import { connect } from "react-redux"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import {
  fetchMyProducts,
} from "../actions/myProducts"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

const MyProducts = ({fetchMyProducts, myProducts}) => {
  const classes = useStyles();
  React.useEffect(() => {
    fetchMyProducts()
  }, [])
  return (
    <div>
      TODO: my product information here
      {myProducts.map(product => product.id)}
    </div>
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
