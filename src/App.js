import React, { Component } from 'react';
import './App.css';
import Home from './home/home'
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

class App extends Component{

  render() {
    return (
      <div>
        <header><span className="header-text"> FinCorp Ltd. </span><span className="floatRight paddingTop"><HomeIcon></HomeIcon>&nbsp;&nbsp;<PowerSettingsNewIcon></PowerSettingsNewIcon></span></header>
        <Home />
        <footer>Copyright 2022 FinCorp Ltd.<span className="floatRight">Version 1.0.0</span></footer>
      </div>
    )
  }
}

export default App;
