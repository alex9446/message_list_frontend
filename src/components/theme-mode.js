import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

function getDefaultDarkMode() {
  let darkMode = null;
  if (typeof localStorage !== 'undefined' && localStorage.getItem('darkMode') !== null) {
    darkMode = localStorage.getItem('darkMode') === '1' ? true : false;
  }
  return darkMode;
}

export default function ThemeMode() {
  const [darkMode, setDarkMode] = useState(getDefaultDarkMode);

  function getMode() {
    if (darkMode === null) return 'no-mode';
    if (darkMode === true) return 'dark-mode';
    return 'light-mode';
  }

  function handleClick() {
    const invertedDarkMode = !darkMode;

    setDarkMode(invertedDarkMode);
    localStorage.setItem('darkMode', invertedDarkMode ? '1' : '0');
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
