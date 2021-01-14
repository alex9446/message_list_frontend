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
    const event = {type: 'add', text: text};
    push_event(() => props.onAddPushEvents(event), event, props.onAddError, props.onCompletePushEvents);
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
    const event = {type: 'edit', remote_id: key, text: text};
    push_event(() => props.onAddPushEvents(event), event, props.onAddError, props.onCompletePushEvents);
  }

  function handleDelete(key) {
    setMessages(messages.filter(message => message.key !== key));
    const event = {type: 'delete', remote_id: key};
    push_event(() => props.onAddPushEvents(event), event, props.onAddError, props.onCompletePushEvents);
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
