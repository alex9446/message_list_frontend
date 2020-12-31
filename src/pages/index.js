import React, { useState } from 'react';

import ErrorBox from '../components/toast-area/error-box';
import MessageArea from '../components/message-area/message-area';
import nextKey from '../utils/next-key';
import Title from '../components/title';

export default function Index() {
  const [errors, setErrors] = useState([]);

  function handleAddError(text) {
    setErrors(errors.slice().concat({
      key: nextKey(errors.slice()),
      text: text,
      visible: true
    }));
  }

  function handleHideError(key) {
    setErrors(errors.map(error => {
      if (error.key === key) {
        error.visible = false;
      }
      return error;
    }));
  }

  return (
    <div id="index-page">
      <Title />
      <MessageArea onAddError={handleAddError} />
      <ErrorBox onHideError={handleHideError} >
        {errors}
      </ErrorBox>
    </div>
  );
}
