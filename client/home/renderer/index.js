import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import serialize from 'serialize-javascript';
import nunjucks from 'nunjucks';

import STATIC_HASH from 'Config/STATIC_HASH';
import App from '../components/App';

nunjucks.configure('./client/templates', { autoescape: false });

async function renderApp(data) {
  const helmetContext = {};
  const serializedData = serialize(data);

  const app = (
    <HelmetProvider context={helmetContext}>
      <App data={data} />
    </HelmetProvider>
  );

  const html = renderToString(app);

  const { helmet } = helmetContext;

  const script = `./client-${STATIC_HASH}.js`;
  const styles = `./styles-${STATIC_HASH}.css`;

  return nunjucks.render('prod.njk', {
    html,
    helmet,
    script,
    styles,
    state: serializedData,
  });
};

export default renderApp;
