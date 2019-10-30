import React from 'react';
import { Route, Switch } from 'react-router';
import AppRoute from './AppRoute'
import Dashboard from '../components/Dashboard';
import Products from '../components/Products';
// import Signin from '../components/Signin';
import MainLayout from './MainLayout';
import UserLayout from './UserLayout';

// const App = ({history}) => {
//   return (
//     <Dashboard history={history} /> 
//   );
// }

const App = () => (
  <div>
    <Switch>
      <AppRoute exact path="/products" layout={MainLayout} component={Products} />
      <AppRoute exact path="/signin" layout={UserLayout} component={Products} />
    </Switch>
  </div>
)


export default App;
