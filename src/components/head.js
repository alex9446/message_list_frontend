import React from 'react';
import { Helmet } from 'react-helmet';

export default function Head(props) {
  return (
    <Helmet>
      <html lang={props.lang ? props.lang : 'en'} />
      <title>
        {props.title ? props.title + ' - ' : ''}Message List
      </title>
      <meta name="description" content="A simple client service for saving and managing messages.
                                        It connect to the server service with REST API." />
    </Helmet>
  );
}
