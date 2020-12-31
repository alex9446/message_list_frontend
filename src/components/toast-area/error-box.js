import { mdiCloseCircleOutline } from '@mdi/js';
import React from 'react';

import EventIcon from '../event-icon';

export default function ErrorBox(props) {
  const first_error = props.children.find(error => error.visible === true);

  if (first_error) {
    function handleHideError() {
      props.onHideError(first_error.key);
    }

    return (
      <div id="error-box" className="message">
        <p>{first_error.text}</p>
        <EventIcon path={mdiCloseCircleOutline} onClick={handleHideError} />
      </div>
    );
  }
  return null;
}
