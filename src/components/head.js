import React from 'react';
import { Helmet } from 'react-helmet';

import favicon from '../images/favicon.svg';

export default function Head(props) {
  return (
    <Helmet>
      <html lang={props.lang ? props.lang : 'en'} />
      <title>
        {props.title ? props.title + ' - ' : ''}Message List
      </title>
      <link rel="icon" href={favicon} type="image/svg+xml" />
      <meta name="description" content="A simple client service for saving and managing messages.
                                        It connect to the server service with REST API." />
    </Helmet>
  );
}
