import { Link } from 'gatsby';
import React from 'react';

import Title from '../components/title';

export default function NotFound() {
  return (
    <div id="not-found">
      <Title>404</Title>
      <h1>Page not found!</h1>
      <Link to="/">
        <p>Return to HOME</p>
      </Link>
    </div>
  );
}
