import React, { useEffect, useState } from 'react';

import InputArea from './input-area/input-area';
import { fetch_last_action, fetch_messages } from '../../utils/api-connector';
import MessageRows from './message-rows';
import nextKey from '../../utils/next-key';

export default function MessageArea(props) {
  const [lastAction, setLastAction] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => fetch_last_action(setLastAction), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => fetch_messages(setMessages), [lastAction]);

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
