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
import TwitterConnected from '../components/TwitterConnected';
import PageNotFound from '../components/PageNotFound';

// const App = ({history}) => {
//   return (
//     <Dashboard history={history} /> 
//   );
// }

const App = () => (
  <div>
    <Switch>
      <AppRoute exact path="/products" layout={MainLayout}  component={Products} />
      <AppRoute exact path="/my_products" layout={MainLayout}  component={MyProducts} />
      <AppRoute exact path="/user_info"  layout={UserLayout} component={UserInfo} />
			<AppRoute component={PageNotFound} />
    </Switch>
  </div>
)


export default App;
