import React, {useEffect} from 'react';
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import qs from 'qs'

const TwitterAuthCallback = ({history}) => {
  useEffect(() => {
    const params = qs.parse(window.location.search.slice(1))

    localStorage.setItem("access-token", params["auth_token"])
    localStorage.setItem("uid", params["uid"])
    localStorage.setItem("token-type", "Bearer")
    localStorage.setItem("client", params["client_id"])
    localStorage.setItem("expiry", params["expiry"])
    history.push('/products')
  })

  // TODO: make this look nice
  return (
    <div>
      loading...
    </div>
  )
}

export default withRouter(TwitterAuthCallback)
