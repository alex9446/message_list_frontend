import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

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
      <div
        id="theme-mode"
        role="button"
        aria-label="theme mode"
        tabIndex="0"
        onClick={handleClick}
        onKeyPress={handleClick}
      >
        <Icon
          path={darkMode ? mdiWeatherSunny : mdiWeatherNight}
          size={1}
        />
      </div>
    </>
  );
}
