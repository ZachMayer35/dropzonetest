import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropzone from 'react-dropzone';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      files: []
    }
    this.onDrop = this.onDrop.bind(this);
  }
  render() {
    const { files } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Dropzone onDrop={this.onDrop}>Drop Files Here</Dropzone>
        <div>
          {
            files.map((file) => (
              <img key={file} src={file} />
            ))
          }
        </div>
      </div>
    );
  }
  onDrop (acceptedfiles, rejectedFiles, e) {
    console.log(`Received Files: ${JSON.stringify(acceptedfiles)}`);
    this.setState({ files: [] });
    const fileBlobs = [];
    const numFiles = acceptedfiles.length;
    for(let i = 0; i < numFiles; i++){
      fileBlobs.push();
      const fileReader = new FileReader();
      fileReader.onload = function(){
        fileBlobs.push(fileReader.result);
        if(fileBlobs.length === numFiles){
          this.setState({ files: fileBlobs });
        }
      }.bind(this);
      fileReader.readAsDataURL(e.dataTransfer.items[i].getAsFile());
    }
  }
}


export default App;
