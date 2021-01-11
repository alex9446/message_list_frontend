import React, { useState } from 'react';

import ErrorBox from '../components/toast-area/error-box';
import Head from '../components/head';
import MessageArea from '../components/message-area/message-area';
import nextKey from '../utils/next-key';
import PendingEventsBox from '../components/toast-area/pending-events-box';
import ThemeMode from '../components/theme-mode';

export default function Index() {
  const [errors, setErrors] = useState([]);
  const [pushEvents, setPushEvents] = useState([]);

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
      <Head />
      <MessageArea onAddError={handleAddError} />
      <ThemeMode />
      <ErrorBox onHideError={handleHideError} >
        {errors}
      </ErrorBox>
      <PendingEventsBox>{pushEvents}</PendingEventsBox>
    </div>
  );
}
