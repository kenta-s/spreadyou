import React from 'react';
import { connect } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

const PageNotFound = () => {
  const classes = useStyles();
  return (
    <div>
      Page not found
    </div>
  )
}

export default connect(
  null,
  null,
)(PageNotFound)
