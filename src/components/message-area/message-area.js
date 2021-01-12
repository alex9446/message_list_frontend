import React, { useEffect, useState } from 'react';

import InputArea from './input-area/input-area';
import { fetch_last_action, fetch_messages, getSyncTiming, push_event } from '../../utils/api-connector';
import MessageRows from './message-rows';
import nextKey from '../../utils/next-key';

export default function MessageArea(props) {
  const [lastAction, setLastAction] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => fetch_last_action(setLastAction), getSyncTiming());
    return () => clearInterval(interval);
  }, []);

  useEffect(() => fetch_messages(setMessages), [lastAction]);

  function handleAdd(text) {
    setMessages(messages.slice().concat({
      key: nextKey(messages.slice()),
      text: text
    }));
    push_event(0, [{id: 0, type: 'add', text: text}]);  // TEMP
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
    push_event(0, [{id: 0, remote_id: key, type: 'edit', text: text}]);  // TEMP
  }

  function handleDelete(key) {
    setMessages(messages.filter(message => message.key !== key));
    push_event(0, [{id: 0, remote_id: key, type: 'delete'}]);  // TEMP
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
