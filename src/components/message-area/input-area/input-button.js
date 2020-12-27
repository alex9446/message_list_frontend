import { mdiPlusBox } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';

export default function InputButton(props) {
  return (
    <div
      className="add button message"
      role="button"
      tabIndex="0"
      onClick={props.onClick}
      onKeyPress={props.onClick}
    >
      <p>Add message</p>
      <Icon path={mdiPlusBox} size={1} />
    </div>
  );
}
