import React from 'react';
import { connect } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
    position: 'absolute',
    top: 'calc(50% - 40px)',
    left: 'calc(50% - 40px)',
  },
}));

const Loading = ({loading}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      { loading && 
        <CircularProgress className={classes.progress} />
      }
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return { 
    loading: state.loading.status,
  }
};

export default connect(
  mapStateToProps,
  null
)(Loading);
