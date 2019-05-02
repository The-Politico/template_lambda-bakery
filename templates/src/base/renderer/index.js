import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import serialize from 'serialize-javascript';

import App from '../components/App';
import HASH from 'Utils/staticHash';
import template from 'Utils/nunjucks';

async function renderApp(data) {
  const helmetContext = {};

  const app = (
    <HelmetProvider context={helmetContext}>
      <App {...data} />
    </HelmetProvider>
  );

  const html = renderToString(app);

  const { helmet } = helmetContext;

  const script = `./client-${HASH}.js`;
  const styles = `./styles-${HASH}.css`;

  return template.render('prod.njk', {
    html,
    helmet,
    script,
    styles,
    state: serialize(data),
  });
};

export default renderApp;
