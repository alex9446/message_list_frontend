import { mdiCloseCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';

export default function ErrorBox(props) {
  const first_error = props.children.find(error => error.visible === true);

  if (first_error) {
    function handleHideError() {
      props.onHideError(first_error.id);
    }

    return (
      <div id="error-box" className="message">
        <p>{first_error.text}</p>
        <div
          role="button"
          aria-label="hide error"
          tabIndex="0"
          onClick={handleHideError}
          onKeyPress={handleHideError}
        >
          <Icon
            path={mdiCloseCircleOutline}
            size={1}
          />
        </div>
      </div>
    );
  }
  return null;
}
