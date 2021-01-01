import { Link } from 'gatsby';
import React from 'react';

import Head from '../components/head';

export default function NotFound() {
  return (
    <div id="not-found-page">
      <Head title="404" />
      <h1>Page not found!</h1>
      <Link to="/">
        <p>Return to HOME</p>
      </Link>
    </div>
  );
}
