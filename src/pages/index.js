import React, { useReducer, useState } from 'react';

import ErrorBox from '../components/toast-area/error-box';
import Head from '../components/head';
import MessageArea from '../components/message-area/message-area';
import { nextId } from '../utils/next-id-key';
import PendingEventsBox from '../components/toast-area/pending-events-box';
import ThemeMode from '../components/theme-mode';

function reducerErrors(state, action) {
  switch (action.type) {
    case 'add':
      return state.concat({
        id: nextId(state),
        text: action.payload,
        visible: true
      });
    case 'hide':
      return state.map(error => {
        if (error.id === action.payload) error.visible = false;
        return error;
      });
    default:
      throw new Error();
  }
}

export default function Index() {
  const [errors, dispatchErrors] = useReducer(reducerErrors, []);
  const [pendingEvents, setPendingEvents] = useState([]);

  function handleAddError(text) {
    dispatchErrors({type: 'add', payload: text});
  }

  function handleHideError(id) {
    dispatchErrors({type: 'hide', payload: id});
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
