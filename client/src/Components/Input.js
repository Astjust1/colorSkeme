import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import pako from 'pako';
const style = {
    position:'relative',
    width: 300,
    height: 200,
    borderWidth:2,
    borderColor:'rgb(102,102,102)',
    borderStyle:'dashed',
    borderRadius:5
}
export default class Input extends Component{
    constructor(props){
        super(props);
    }

    handleColorData(data){
        this.props.handler(data);
    }
    onDrop(acceptedFile){
        //shorthand incase more than one file is uploaded
        const file = acceptedFile[0];
        const data = new FormData();
        data.append('file',file);
        data.append('fileName',file.name);
        axios.post('/ML/getPallette',data).then((response)=>{
            console.log(this(response.data));
            console.log(response.data);
            handleColorData(response.data);
            acceptedFile = [];
        }).catch((err)=>{
            console.log(err);
        })
        /*
        const reader = new FileReader();
        reader.onload = ()=>{
            const result = reader.result;
            //remove prefix for uploading
           // const dataStr = result.replace('data:;base64,','');
            let buff = new Uint8Array(result);
            console.log(buff);
            console.log(result);
            axios.post('/ML/getPallette',{buffer:buff},{
                responseType:'arraybuffer',
                headers: {'Content-Type': 'application/octet-stream'}
            })
            .then((response)=>{
                console.log(response);
            }).catch((err)=>{
                console.log(err);
            })*/
      //  }
        //reader.readAsArrayBuffer(file);
    }

    render(){
        return(
            <Dropzone accept="image/*" style={style} onDrop={this.onDrop.bind(this.handleColorData)}>
                {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                    if (isDragReject) {
                    return "This file is not authorized";
                    }
                    return acceptedFiles.length || rejectedFiles.length
                    ? `Processing File!`
                    : "Drop an image to get your color skeme!";
                }}
            </Dropzone>
        )
    }
}