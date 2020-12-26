import React from 'react';
import { Helmet } from 'react-helmet';

export default function Title(props) {
  return (
    <Helmet>
      <title>
        {props.children ? props.children + ' - ' : ''}Message List
      </title>
    </Helmet>
  );
}
