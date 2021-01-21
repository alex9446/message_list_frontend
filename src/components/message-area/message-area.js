import React, { useEffect, useState } from 'react';

import InputArea from './input-area/input-area';
import { fetch_last_action, fetch_messages, getSyncTiming, push_event } from '../../utils/api-connector';
import MessageRows from './message-rows';
import { nextKey } from '../../utils/next-id-key';

export default function MessageArea(props) {
  const [lastAction, setLastAction] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => fetch_last_action(setLastAction), getSyncTiming());
    return () => clearInterval(interval);
  }, []);

  useEffect(() => fetch_messages(setMessages), [lastAction]);

  function handle_push_event(event) {
    props.onIncrementPendingEvents();
    push_event(event, props.onAddError, props.onDecrementPendingEvents);
  }

  function handleAdd(text) {
    setMessages(messages.concat([{
      key: nextKey(messages),
      text: text,
      preview: true
    }]));

    const event = {type: 'add', try: 1, data: {text: text}};
    handle_push_event(event);
  }

  function handleEdit(key, text) {
    setMessages(messages.map(message => {
      if (message.key === key) {
        if (text === null) {
          message.edit = true;
        } else {
          delete message.edit;
          message.text = text;
          message.preview = true;
        }
      }
      return message;
    }));

    if (text !== null) {
      const event = {type: 'edit', try: 1, data: {remote_id: key, text: text}};
      handle_push_event(event);
    }
  }

  function handleDelete(key) {
    setMessages(messages.filter(message => message.key !== key));

    const event = {type: 'delete', try: 1, data: {remote_id: key}};
    handle_push_event(event);
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
