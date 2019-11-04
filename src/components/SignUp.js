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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = ({history}) => {
  const classes = useStyles();

  return (
  <React.Fragment>
    <Typography component="h1" variant="h5">
      ユーザー登録
    </Typography>
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
			      disabled
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
			      disabled
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
				{ /* 
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
				*/ }
      </Grid>
      <Button
			  disabled
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign Up
      </Button>

			<p style={{color: 'red', textAlign: 'center'}}>
			  現在Twitter認証が必須です↓
			</p>

      <Button
			  href="http://127.0.0.1:3000/api/v1/auth/twitter?auth_origin_url=http://127.0.0.1:5000/twitter_auth_callbacks"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Twitterアカウントでログイン
      </Button>

      <Grid container justify="flex-end">
        <Grid item>
          <Link href="#" variant="body2" onClick={e => {
            e.preventDefault
            history.push('/signin')
          }}>
            アカウントをお持ちの方はこちらからログイン
          </Link>
        </Grid>
      </Grid>
    </form>
  </React.Fragment>
  )
}

export default withRouter(SignUp)
