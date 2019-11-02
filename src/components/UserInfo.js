import React from 'react';
import { connect } from "react-redux"
import { fetchUserInfo } from '../actions/userInfo'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

const UserInfo = ({userInfo, fetchUserInfo}) => {
  const classes = useStyles();
  React.useEffect(() => {
    fetchUserInfo()
  }, [])
  return (
    <div>
      <Title>ユーザー情報</Title>
      {
        userInfo &&
        <React.Fragment>
          {userInfo.spPoint}
        </React.Fragment>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserInfo: () => dispatch(fetchUserInfo()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo)
