import React from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from '../components/Dashboard';

const App = ({history}) => {
  return (
    <Dashboard history={history} /> 
  );
}

export default App;
