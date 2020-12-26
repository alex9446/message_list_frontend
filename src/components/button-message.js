import React from 'react';

export default function ButtonMessage(props) {
  return (
    <div
      className={props.class + ' button message'}
      role="button"
      tabIndex="0"
      onClick={props.onClick}
      onKeyPress={props.onClick}
    >
      <p>
        {props.text}
      </p>
    </div>
  );
}
