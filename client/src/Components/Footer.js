import React, { Component } from 'react';
import '../App.css';

export default class Footer extends Component{
    constructor(props){
        super(props)
        this.state={
            title: this.props.title,
            backgroundColor:this.props.mainColor,
            color:this.props.secondaryColor
        }
    }

    componentWillReceiveProps(newProps){
        console.log(newProps);
        this.setState({backgroundColor:newProps.mainColor});
        this.setState({color:newProps.secondaryColor});
    }

    render(){
        const headerStyle={
            backgroundColor:this.state.backgroundColor,
            color:this.state.color,
            position: 'relative',
            clear: 'both',
            bottom: 0,
        }
        return(
             <footer className="App-footer" style={headerStyle}>
                <h3>Author: Armond St.Juste</h3>
                <h3><a href="https://paypal.me/Armond787" style={{color:"inherit"}} >Buy me a beer!</a></h3>
            </footer>
        )
    }
}