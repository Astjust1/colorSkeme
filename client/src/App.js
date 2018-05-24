import React, { Component } from 'react';
import Logo from './logo.svg';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Logo className="App-logo" alt="logo" />
          <h1 className="App-title">Color Skeme</h1>
        </header>
        <p className="App-intro">
          Color Pallette Soon Come.
        </p>
      </div>
    );
  }
}

export default App;
