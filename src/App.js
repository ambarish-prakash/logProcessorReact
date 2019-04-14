import React, { Component } from 'react';

import Status from './Status.js';
import Upload from './Upload.js';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isUpload: true, uploadClass: "selected", statusClass: "notSelected"};
    //this.onClickTop = this.onClickTop.bind(this,val);
  }

  onClickTop(val){
    this.setState({ isUpload: val});
    if(val){
      this.setState({ uploadClass: "selected", statusClass: "notSelected" });
    }else {
      this.setState({ uploadClass: "notSelected", statusClass: "selected" });
    }
  }

  render() {
    return (
<div className="App">
        <header className="App-header">
         Log Processor
        </header>
        <header className="App-sub-header">
          <div className={[this.state.uploadClass, "App-list-item-left"].join(' ')} onClick={() => this.onClickTop(true)}>Upload</div>
          <div className={[this.state.statusClass, "App-list-item-right"].join(' ')} onClick={() => this.onClickTop(false)}>Status</div> 
        </header>
        { this.state.isUpload && <Upload />}
        { !this.state.isUpload && <Status />}
        </div>
    );
  };
}

export default App;

/*
//<ul className="App-header-list">
*/