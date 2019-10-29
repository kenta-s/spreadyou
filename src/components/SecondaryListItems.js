import React from 'react';
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

const SecondaryListItems = ({history}) => {
  return(
    <div>
      <ListSubheader inset>ユーザー情報</ListSubheader>
      <ListItem button onClick={() => history.push('/user_info')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="情報" />
      </ListItem>
    </div>
  )
}

export default withRouter(connect(null, null)(SecondaryListItems))
