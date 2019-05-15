import React from 'react';

import Helmet from 'react-helmet-async';

import styles from './styles.scss';

class App extends React.Component {
  render() {
    return (
      <div className={styles.component}>
        <Helmet>
          <html lang='en' dir='ltr' />
          <meta key='charSet' charSet='utf-8' />,
          <meta key="httpEquiv='Content-Type'" httpEquiv='Content-Type' content='text/html; charset=UTF-8' />,
          <meta key="httpEquiv='X-UA-Compatible'" httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />,
          <meta key='viewport' name='viewport' content='width=device-width, initial-scale=1' />,
          <title>Home Page</title>
        </Helmet>
        <h1>Hello from {this.props.data.name}</h1>
      </div>
    );
  }
}

export default App;
