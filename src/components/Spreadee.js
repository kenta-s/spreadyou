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
import TextField from '@material-ui/core/TextField';
import Title from './Title';

import {
  fetchSpreadee,
} from "../actions/spreadee"
import {
  postTweet,
} from "../actions/tweets"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220,
  },
}));

const Spreadee = ({fetchSpreadee, spreadee, postTweet}) => {
  const classes = useStyles();
  const [tweetContent, setTweetContent] = React.useState('おすすめです')

  React.useEffect(() => {
    fetchSpreadee()
  }, [])

  const suffixMessage = `${spreadee.url}\n\nスプレジュでサービスを広めませんか？\nhttps://ja.spreadyou.net`

  return (
    <div>
      {spreadee
        ?
        <React.Fragment>
          <Title>{spreadee.summary}</Title>
          <p>{spreadee.description}</p>
          <Link href={spreadee.url} target="_blank" rel="noopener">{spreadee.url}</Link>
          <form validate autoComplete="off">
            <TextField
              label="紹介文"
              multiline
              rows="6"
              value={tweetContent}
              onChange={(e) => {setTweetContent(e.target.value)}}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="ツイートのイメージ"
              disabled
              multiline
              rows="6"
              value={`${tweetContent}\n${suffixMessage}`}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </form>
          {
            spreadee.isSpread
            ?
            <Button
			        disabled
              type="button"
              variant="contained"
              color="primary"
            >
              ツイート済み
            </Button>
            :
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => {
                postTweet(spreadee.id, tweetContent)
              }}
            >
              ツイート
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
    postTweet: (productId, content) => dispatch(postTweet(productId, content)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spreadee)
