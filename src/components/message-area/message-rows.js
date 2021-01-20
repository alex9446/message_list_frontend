import React from 'react';

import InputBox from './input-area/input-box';
import MessageBox from './message-box';

function getMessageRow(props, message) {
  function handleEdit(text) {
    if (typeof text !== 'string') { text = null; }
    props.onEdit(message.key, text);
  }

  function handleDelete() {
    props.onDelete(message.key);
  }

  if (message.edit) {
    return (
      <InputBox
        key={message.key}
        text={message.text}
        onSubmit={handleEdit}
      />
    );
  } else {
    return (
      <MessageBox
        key={message.key}
        text={message.text}
        preview={message.preview}
        onRequestEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  }
}

export default function MessageRows(props) {
  return props.children.map(message => getMessageRow(props, message));
}
