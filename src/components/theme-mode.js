import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import React from 'react';
import { Helmet } from 'react-helmet';

import EventIcon from './event-icon';

export default function ThemeMode(props) {
  return (
    <>
      <Helmet>
        <body className={props.darkMode ? 'dark-mode' : 'light-mode'} />
      </Helmet>
      <div id="theme-mode">
        <EventIcon
          path={props.darkMode ? mdiWeatherSunny : mdiWeatherNight}
          onClick={props.onToggleMode}
        />
      </div>
    </>
  );
}
