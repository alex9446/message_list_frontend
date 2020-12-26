import React from 'react';

export default function MessageBox(props) {
  return (
    <div className="message">
      <p>
        {props.text}
      </p>
    </div>
  );
}
