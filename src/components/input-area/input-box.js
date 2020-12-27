import React, { useState } from 'react';

export default function InputBox(props) {
  const [text, setText] = useState('');

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleKey(event) {
    if (event.key === 'Enter') {
      props.onSubmit(text);
    }
  }

  return (
    <div className="input message">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onKeyPress={handleKey}
      />
    </div>
  );
}
