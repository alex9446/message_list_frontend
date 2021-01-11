import React from 'react';

export default function PendingEventsBox(props) {
  const total_pending_events = props.children.length;

  if (total_pending_events > 1) {
    return (
      <div id="pending-events-box" className="message">
        <p>{total_pending_events} pending events</p>
      </div>
    );
  }
  return null;
}
