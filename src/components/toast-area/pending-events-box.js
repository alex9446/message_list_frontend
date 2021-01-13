import React from 'react';

export default function PendingEventsBox(props) {
  const pending_events = props.children.filter(event => event.complete === false);

  if (pending_events.length > 0) {
    return (
      <div id="pending-events-box" className="message">
        <p>{pending_events.length} pending events</p>
      </div>
    );
  }
  return null;
}
