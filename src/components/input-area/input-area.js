import React, { useState } from 'react';

import InputBox from './input-box';
import InputButton from './input-button';

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
      <InputButton onClick={handleShowInput} />
    </>
  );
}
