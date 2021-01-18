import React, { useState } from 'react';

import ErrorBox from '../components/toast-area/error-box';
import Head from '../components/head';
import MessageArea from '../components/message-area/message-area';
import { nextId } from '../utils/next-id-key';
import PendingEventsBox from '../components/toast-area/pending-events-box';
import ThemeMode from '../components/theme-mode';

export default function Index() {
  const [errors, setErrors] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);

  function handleAddError(text) {
    setErrors(errors.concat({
      id: nextId(errors),
      text: text,
      visible: true
    }));
  }

  function handleHideError(id) {
    setErrors(errors.map(error => {
      if (error.id === id) { error.visible = false; }
      return error;
    }));
  }

  return (
    <div id="index-page">
      <Head />
      <MessageArea
        onAddError={handleAddError}
      />
      <ThemeMode />
      <ErrorBox onHideError={handleHideError} >
        {errors}
      </ErrorBox>
      <PendingEventsBox>{pendingEvents}</PendingEventsBox>
    </div>
  );
}
