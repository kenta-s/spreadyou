import React from 'react';
import { connect } from "react-redux"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
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
  fetchSpreadee,
} from "../actions/spreadee"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

const Spreadee = ({fetchSpreadee, spreadee}) => {
  const classes = useStyles();
  React.useEffect(() => {
    fetchSpreadee()
  }, [])
  return (
    <div>
      {spreadee
        ?
        <React.Fragment>
          <p>{spreadee.summary}</p>
          <p>{spreadee.description}</p>
          <Link href={spreadee.url} target="_blank" rel="noopener">{spreadee.url}</Link>
          {
            spreadee.isSpread
            ?
            <Button
			        disabled
              type="button"
              fullWidth
              variant="contained"
              color="primary"
            >
              Tweet済み
            </Button>
            :
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
            >
              Tweet
            </Button>
          }
        </React.Fragment>
        : <span>not found</span>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    spreadee: state.spreadee,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSpreadee: () => dispatch(fetchSpreadee()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spreadee)
