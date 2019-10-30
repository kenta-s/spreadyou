import React from 'react';
import { withRouter } from 'react-router'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({history}) => {
  const classes = useStyles();

  return (
  <React.Fragment>
  <Typography component="h1" variant="h5">
    ログイン
  </Typography>
    <form className={classes.form} noValidate>
      <TextField
			  disabled
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
			  disabled
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
			  disabled
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
			  disabled
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>

			<p style={{color: 'red', textAlign: 'center'}}>
			  現在Twitter認証が必須です↓
			</p>

      <Button
			  href="http://127.0.0.1:3000/api/v1/auth/twitter?auth_origin_url=http://127.0.0.1:3000/twitter_auth_callbacks"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Twitterアカウントでログイン
      </Button>

      <Grid container>
        { /*
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        */ }
        <Grid item>
          <Link href="#" variant="body2" onClick={(e) => {
              e.preventDefault
              history.push('/signup')
            }}>
            {"アカウントをお持ちでない場合はこちらから登録"}
          </Link>
        </Grid>
      </Grid>
    </form>
  </React.Fragment>
  )
}

export default withRouter(SignIn)
