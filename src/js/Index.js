import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import App from './components/App';
import Game from './components/Game';
import About from './components/About';
import NoMatch from './components/NoMatch';

window.React = React;

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

render(
  (<Router history={appHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Game} />
      <Route path="/about" component={About} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>), document.getElementById('content')
);
