import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import EventIcon from './event-icon';

export default function ThemeMode() {
  const [darkMode, setDarkMode] = useState(null);

  function getMode() {
    if (darkMode === null) return 'no-mode';
    if (darkMode === true) return 'dark-mode';
    return 'light-mode';
  }

  function handleClick() {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <Helmet>
        <body className={getMode()} />
      </Helmet>
      <div id="theme-mode">
        <EventIcon
          path={darkMode ? mdiWeatherSunny : mdiWeatherNight}
          onClick={handleClick}
        />
      </div>
    </>
  );
}
