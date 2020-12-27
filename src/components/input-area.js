import React, { useState } from 'react';
import InputBox from './input-box';

export default function InputArea(props) {
  const [showInput, setShowInput] = useState(false);

  function handleShowInput() {
    setShowInput(true);
  }

  function handleSubmit(text) {
    setShowInput(false);
    props.onSubmit(text);
  }

  return (
    <>
      {showInput && <InputBox onSubmit={handleSubmit} />}
      <div
        className="add button message"
        role="button"
        tabIndex="0"
        onClick={handleShowInput}
        onKeyPress={handleShowInput}
      >
        <p>Add message</p>
      </div>
    </>
  );
}
