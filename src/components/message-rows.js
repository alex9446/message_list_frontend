import React from 'react';

import MessageBox from './message-box';

export default function MessageRows(props) {
  return props.children.map(message => {
    return <MessageBox key={message} text={message} />;
  });
}
