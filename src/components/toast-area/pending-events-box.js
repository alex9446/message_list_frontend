import React from 'react';

export default function PendingEventsBox(props) {
  const pending_events = props.children;

  if (pending_events > 0) {
    return (
      <div id="pending-events-box" className="message">
        <p>{pending_events} pending events</p>
      </div>
    );
  }
  return null;
}
