import React from 'react';
import { render, hydrate } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import 'Client/common/theme/base.scss';

import App from './components/App';

const ROOT = document.getElementById('app');

if (ROOT.hasChildNodes()) {
  // Use preloaded state and hydrate in production
  hydrate((
    <HelmetProvider>
      <App data={window.__PRELOADED_STATE__} />
    </HelmetProvider>
  ), ROOT);
} else {
  // Fetch example data and render in development
  fetch('./data.json', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(r => r.json())
    .then(data => {
      render((
        <HelmetProvider>
          <App data={data} />
        </HelmetProvider>
      ), ROOT);
    });
}
