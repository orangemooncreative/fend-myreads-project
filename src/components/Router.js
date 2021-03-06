import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';

// route the pages for the app including error handling for pages not found
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/search" component={SearchPage} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
