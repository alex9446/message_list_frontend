import Icon from '@mdi/react';
import React from 'react';

export default function EventIcon(props) {
  return (
    <Icon
      path={props.path}
      onClick={props.onClick}
      onKeyPress={props.onClick}
      title={props.title}
      className={props.class || ''}
      size={1}
      role="button"
      tabIndex="0"
    />
  );
}
