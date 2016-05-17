import React from 'react';
import { Link } from 'react-router';

const App = ({ children }) => (
  <div>
    <header>
      <h1><Link to="/">Ultimate Tic-Tac-Toe</Link></h1>
      <Link to="/rules" className="nav-link">Rules</Link>
      <Link to="/about" className="nav-link">About</Link>
    </header>
    <section>
      {children}
    </section>
  </div>
);

App.propTypes = { children: React.PropTypes.object };

export default App;
