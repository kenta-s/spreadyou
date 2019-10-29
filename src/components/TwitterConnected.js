import React from 'react';
import { connect } from "react-redux"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

const TwitterConnected = () => {
  const classes = useStyles();
  return (
    <div>
      TODO: twitter connection succeeded
    </div>
  )
}

export default connect(
  null,
  null,
)(TwitterConnected)
