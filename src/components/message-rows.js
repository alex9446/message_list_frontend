import React from 'react';

import MessageBox from './message-box';

export default function MessageRows(props) {
  return props.children.map(message => {
    return (
      <MessageBox
        key={message.key}
        id={'message-' + message.key}
        text={message.text}
      />
    );
  });
}
