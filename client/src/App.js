import React, { Component } from 'react';
import Header from './Components/Header';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { isString } from 'util';
import ColorPallette from './Components/ColorPallette';
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

  onDrop(acceptedFile) {
      //shorthand incase more than one file is uploaded
      const file = acceptedFile[0];
      const data = new FormData();
      data.append('file', file);
      data.append('fileName', file.name);
      axios.post('/ML/getPallette', data).then((response) => {
       // console.log(this(response.data));
       //console.log(this);
        //console.log(response.data);
        this.setState({
          colors: response.data
        });
        acceptedFile = [];
      }).catch((err) => {
        console.log(err);
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
                    return acceptedFiles.length || rejectedFiles.length
                    ? `Processing File!`
                    : "Drop an image to get your color skeme!";
                }}
            </Dropzone>
            <ColorPallette colors={this.state.colors}/>
      </div>
    );
  }
}

export default App;
