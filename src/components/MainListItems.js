import React from 'react';
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import StarsIcon from '@material-ui/icons/Stars';
import ViewListIcon from '@material-ui/icons/ViewList';

const MainListItems = ({history}) => {
  return(
    <div>
      <ListItem button onClick={() => history.push('/spreadee')}>
        <ListItemIcon>
          <StarsIcon />
        </ListItemIcon>
        <ListItemText primary="プロダクト" />
      </ListItem>
      <ListItem button onClick={() => history.push('/my_products')}>
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        <ListItemText primary="自分のプロダクト" />
      </ListItem>
    </div>
	)
}
export default withRouter(connect(null, null)(MainListItems))
