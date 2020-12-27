import React, { useState } from 'react';

import InputArea from './input-area';
import MessageRows from './message-rows';

export default function MessageArea() {
  const example_message = [
    { key: 0, text: 'a' },
    { key: 1, text: 'b' }
  ]

  const [messages, setMessages] = useState(example_message);

  function handleAdd(text) {
    setMessages(messages.slice().concat({
      key: messages.slice().pop().key + 1,
      text: text
    }));
  }

  return (
    <div id="message-area">
      <MessageRows>{messages}</MessageRows>
      <InputArea onSubmit={handleAdd} />
    </div>
  );
}
