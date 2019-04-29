import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import './Status.css';
import { withSnackbar } from 'notistack';

class Upload extends Component {

	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      formD: new FormData(),      
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
  }

  handleSubmit(evt) {
  	evt.preventDefault();
  	
  	console.log(this.state.formD);
  	
  	fetch('http://ec2-13-59-252-195.us-east-2.compute.amazonaws.com:8090/uploadFile', {
      method: 'POST',
      body: this.state.formD
    })
    .then(res => res.json())
    .then(result => {
      if(result){
      	 this.props.enqueueSnackbar("Upload Successful", { variant: 'success'});
      }else {
      	this.props.enqueueSnackbar("Upload Failed", { variant: 'error'});
      }
    });

  }


	handleChange1(e){

    const files = Array.from(e.target.files);
    this.setState({ uploading: true });

    const formData = new FormData();
    const file = files[0];

    formData.append('file',file);

    this.setState({formD: formData });

}


  render() {
    return (
      <div className="white">
      <h3 className="h3"> File Upload </h3><br/>
      <form className="form" onSubmit={this.handleSubmit}>
        <label className="label">
          <p className="fileInput">Log File:</p>
          <input type="file" placeholder="CSV Log File" onChange={this.handleChange1} className="inputFile" />
        </label><br/><br/>
        <input className="upload" type="submit" value="Upload" />
      </form>
      </div>
    );
  };
}

export default withSnackbar(Upload);
