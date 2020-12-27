import { mdiEraser, mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';

export function MyIcon(props) {
  return (
    <Icon
      className={props.class}
      onClick={props.onClick}
      onKeyPress={props.onClick}
      path={props.path}
      size={1}
      tabIndex="0"
    />
  );
}

export default function MessageBox(props) {
  return (
    <div className="message">
      <p>{props.text}</p>
      <MyIcon path={mdiPencil} class="button" onClick={props.onRequestEdit} />
      <MyIcon path={mdiEraser} class="button eraser" onClick={props.onDelete} />
    </div>
  );
}
