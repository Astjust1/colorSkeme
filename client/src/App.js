import React, { Component } from 'react';
import Header from './Components/Header';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { isString } from 'util';
import ColorPallette from './Components/ColorPallette';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
const divStyle = {
  textAlign:'center'
}
const style = {
  position: 'relative',
  width: 300,
  height: 200,
  borderWidth: 2,
  borderColor: 'rgb(102,102,102)',
  borderStyle: 'dashed',
  borderRadius: 5
}
class App extends Component {
  constructor(props){
    super(props);
    this.handleColorUpload = this.handleColorUpload.bind(this);
    this.state = {
      colors : ["black","green","white"]
    }
  }

  handleColorUpload(data){
    this.setState({colors: data});
  }

  onDrop(acceptedFile,rejectedFiles) {
      //shorthand incase more than one file is uploaded
     if(acceptedFile.length){
       Alert.success('Successful Upload! Hang tight for your Color Skeme',{
         position: 'top',
         effect: 'genie',
         timeout: 1500
       })
     }
      const file = acceptedFile[0];
      console.log(file);
      if (file.size > 10485760){
        Alert.error('That image is too big, please try a smaller file.',{
          position: 'top',
          effect: 'genie'
        });
        window.URL.revokeObjectURL(file.preview);
        acceptedFile = [];
        return;
      }
      const data = new FormData();
      data.append('file', file);
      data.append('fileName', file.name);
      axios.post('/ML/getPallette', data).then((response) => {
        this.setState({
          colors: response.data
        });
        window.URL.revokeObjectURL(file.preview);
        acceptedFile = [];
        console.log(acceptedFile);
      }).catch((err) => {
        console.log(err);
        Alert.error('There was an error processing your image. Please try again',{
          position: 'top',
          effect: 'genie',
          timeout:1000
        })
      })
    }
  
  makeRGB(colorObj){
    if(!isString(colorObj)){
      const red = colorObj.red;
      const green = colorObj.green;
      const blue = colorObj.blue;
      return `rgb(${red},${green},${blue})`;
    }
    return colorObj;
  }

  render() {
    return (
      <div className="App">
        <Header title="Color Skeme" mainColor={this.makeRGB(this.state.colors[0])} secondaryColor={this.makeRGB(this.state.colors[2])}/>

          <Dropzone accept="image/*" style={style} onDrop={this.onDrop.bind(this)}>
                {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                    if (isDragReject) {
                    return "This file is not authorized";
                    }
                    return  "Click to add or drag and drop an image!";
                }}
            </Dropzone>
            <ColorPallette colors={this.state.colors}/>
            <Alert stack={{limit:1}}/>
      </div>
    );
  }
}

export default App;
