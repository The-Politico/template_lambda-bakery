import React from 'react';
import styles from './styles.scss';

class App extends React.Component {
  render() {
    return (
      <div className={styles.component}>
        <h1>Hello from {this.props.data.name}</h1>
      </div>
    );
  }
}

export default App;
