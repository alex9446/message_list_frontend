import React, { useState } from 'react';

import ButtonMessage from './button-message';
import MessageRows from './message-rows';

export default function MessageArea() {
  const [messages, setMessages] = useState(['a', 'b', 'c']);

  function handleAdd() {
    setMessages(messages.slice().concat('d'));
  }

  return (
    <div id="message-area">
      <MessageRows>{messages}</MessageRows>
      <ButtonMessage
        class="add"
        text="Add message"
        onClick={handleAdd}
      />
    </div>
  );
}
