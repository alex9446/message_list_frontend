import React from 'react';
import { Helmet } from 'react-helmet';

export default function Head(props) {
  return (
    <Helmet>
      <html lang={props.lang ? props.lang : 'en'} />
      <title>
        {props.title ? props.title + ' - ' : ''}Message List
      </title>
    </Helmet>
  );
}
