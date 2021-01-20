import { mdiEraser, mdiPencil } from '@mdi/js';
import React from 'react';

import EventIcon from '../event-icon';

export default function MessageBox(props) {
  return (
    <div className={props.preview ? 'message preview': 'message'}>
      <p>{props.text}</p>
      <EventIcon
        path={mdiPencil}
        title="edit"
        class="button pencil"
        onClick={props.preview ? null : props.onRequestEdit}
      />
      <EventIcon
        path={mdiEraser}
        title="delete"
        class="button eraser"
        onClick={props.preview ? null : props.onDelete}
      />
    </div>
  );
}
