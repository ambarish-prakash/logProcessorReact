import React, { Component } from 'react';
import './Status.css';

class Status extends Component {

	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      msg: "",
      orderType: "",
      orderId: "",
      timestamp: "",
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleSubmit(evt) {
	evt.preventDefault();
	var url = 'http://localhost:8090/status/' + this.state.orderType + '/' + this.state.orderId + '/' + this.state.timestamp;
	console.log(url);
	fetch(url)
     .then(res => res.json())
          .then(
        (result) => {
          this.setState({
            isLoaded: true,
            msg: result.result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            msg: "Error"
          });
        }
      )
}

handleChange1(evt){
	this.setState({orderType: evt.target.value});
}
handleChange2(evt){
	this.setState({orderId: evt.target.value});
}
handleChange3(evt){
	this.setState({timestamp: evt.target.value});
}

  render() {
    return (
      <div className="white">
      <h3 className="h3"> Order Details </h3>
      <form className="form" onSubmit={this.handleSubmit}>
        <label className="label">
          <p className="width">Order Type:</p>
          <input type="text" placeholder="Order" value={this.state.orderType} onChange={this.handleChange1} className="input" />
        </label><br/>
        <label className="label">
           <p className="width">Order Id:</p>
          <input type="text" placeholder="1" value={this.state.orderId} onChange={this.handleChange2} className="input" />
        </label><br/>
        <label className="label">
           <p className="width">Timestamp:</p> 
          <input type="text" placeholder={new Date().getTime()} value={this.state.timestamp} onChange={this.handleChange3} className="input" />
        </label><br/>
        <input className="submit" type="submit" value="Submit" />
      </form>
      <br/><br/>
      <h3 className="h3"> Status </h3>
        <p className="output">{this.state.msg} </p>
      </div>
    );
  };
}

export default Status;
