import React, {useEffect} from 'react';
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import qs from 'qs'
import { signIn } from '../actions/common'

const TwitterAuthCallback = ({history}) => {
  useEffect(() => {
    const params = qs.parse(window.location.search.slice(1))

    const credentials = {
      authToken: params["auth_token"],
      uid: params["uid"],
      client: params["client_id"],
      expiry: params["expiry"],
    }

    signIn(credentials)
      .then(
        history.push('/spreadee')
      )

  })

  // TODO: make this look nice
  return (
    <div>
      loading...
    </div>
  )
}

export default withRouter(connect(
  null,
  null
)(TwitterAuthCallback))
