import React, { useState } from 'react';

import InputArea from './input-area/input-area';
import MessageRows from './message-rows';
import nextKey from '../../utils/next-key';

export default function MessageArea() {
  const example_message = [
    { key: 0, text: 'a' },
    { key: 1, text: 'b' }
  ]

  const [messages, setMessages] = useState(example_message);

  function handleAdd(text) {
    setMessages(messages.slice().concat({
      key: nextKey(messages.slice()),
      text: text
    }));
  }

  function handleEdit(key, text) {
    setMessages(messages.map(message => {
      if (message.key === key) {
        if (text === null) {
          message.edit = true;
        } else {
          delete message.edit;
          message.text = text;
        }
      }
      return message;
    }));
  }

  function handleDelete(key) {
    setMessages(messages.filter(message => message.key !== key));
  }

  return (
    <div id="message-area">
      <MessageRows onEdit={handleEdit} onDelete={handleDelete} >
        {messages}
      </MessageRows>
      <InputArea onSubmit={handleAdd} />
    </div>
  );
}
