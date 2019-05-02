import React from 'react';
import { render, hydrate } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import fetchData from 'Utils/api';

import App from './components/App';

import 'Theme/base.scss';

fetchData().then(data => {
  const app = (
    <HelmetProvider>
      <App {...data} />
    </HelmetProvider>
  );

  const Render = process.env.ENVIRONMENT === 'development' ? render : hydrate;

  Render(app, document.getElementById('app'), () => {});
});
