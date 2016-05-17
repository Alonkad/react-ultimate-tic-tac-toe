import React from 'react';
import { Link } from 'react-router';

const NoMatch = () =>
  <div>
    <h2>404</h2>
    <Link to="/">Back to homepage</Link>
  </div>;


export default NoMatch;
