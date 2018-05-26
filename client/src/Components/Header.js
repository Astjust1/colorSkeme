import React, { Component } from 'react';
import Logo from '../logo.svg';
import '../App.css';

export default class Header extends Component{
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
            color:this.state.color
        }
        return(
             <header className="App-header" style={headerStyle}>
                <Logo className="App-logo" alt="logo" />
                <h1 className="App-title" >{this.state.title}</h1>
        </header>
        )
    }
}