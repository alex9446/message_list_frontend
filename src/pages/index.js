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
    const prev_errors = errors.slice();

    setErrors(prev_errors.concat({
      key: nextKey(prev_errors),
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

  function handleAddPushEvents(event) {
    const prev_pushEvents = pushEvents.slice();
    const event_id = nextKey(prev_pushEvents);

    setPushEvents(prev_pushEvents.concat({
      id: event_id,
      event: event,
      complete: false
    }));

    return event_id;
  }

  function handleCompletePushEvents(event_id) {
    setPushEvents(pushEvents.map(event => {
      if (event.id === event_id) {
        event.complete = true;
      }
      return event;
    }));
  }

  return (
    <div id="index-page">
      <Head />
      <MessageArea
        onAddError={handleAddError}
        onAddPushEvents={handleAddPushEvents}
        onCompletePushEvents={handleCompletePushEvents}
      />
      <ThemeMode />
      <ErrorBox onHideError={handleHideError} >
        {errors}
      </ErrorBox>
      <PendingEventsBox>{pushEvents}</PendingEventsBox>
    </div>
  );
}
