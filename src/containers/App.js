import React from 'react';
import { Route, Switch } from 'react-router';
import AppRoute from './AppRoute'
import Dashboard from '../components/Dashboard';
import Products from '../components/Products';
// import Signin from '../components/Signin';
import MainLayout from './MainLayout';
import UserLayout from './UserLayout';
import MyProducts from '../components/MyProducts';
import UserInfo from '../components/UserInfo';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import TwitterAuthCallback from '../components/TwitterAuthCallback';
import PageNotFound from '../components/PageNotFound';
import { generateRequireSignInWrapper } from 'redux-token-auth'
import FlashMessages from '../components/FlashMessages'

const App = () => (
	<div>
    <Switch>
      <AppRoute exact path="/products" layout={MainLayout}  component={Products} />
      <AppRoute exact path="/my_products" layout={MainLayout}  component={MyProducts} />
      <AppRoute exact path="/user_info"  layout={MainLayout} component={UserInfo} />
      <AppRoute exact path="/signup"  layout={UserLayout} component={SignUp} />
      <AppRoute exact path="/signin"  layout={UserLayout} component={SignIn} />
      <AppRoute exact path="/twitter_auth_callbacks"  layout={UserLayout} component={TwitterAuthCallback} />
      <AppRoute layout={UserLayout} component={PageNotFound} />
    </Switch>
		<FlashMessages />
	</div>
)


export default App;
