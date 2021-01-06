import { mdiEraser, mdiPencil } from '@mdi/js';
import React from 'react';

import EventIcon from '../event-icon';

export default function MessageBox(props) {
  return (
    <div className="message">
      <p>{props.text}</p>
      <EventIcon path={mdiPencil} class="button pencil" onClick={props.onRequestEdit} />
      <EventIcon path={mdiEraser} class="button eraser" onClick={props.onDelete} />
    </div>
  );
}
