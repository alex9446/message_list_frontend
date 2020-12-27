import React from 'react';

export default function MessageBox(props) {
  return (
    <div
      id={props.id}
      className="message"
    >
      <p>
        {props.text}
      </p>
    </div>
  );
}
