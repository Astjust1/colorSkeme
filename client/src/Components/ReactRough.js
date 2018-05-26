import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Rough from 'roughjs'



export class Rect extends Component{
	constructor(props){
		super(props)
		this.state = {
			height: this.props.height,
			width: this.props.width,
			points: this.props.points,
			data: this.props.data,
			
		}
	}

	componentDidUpdate(){
		//console.log(this._reactInternalFiber.index);
		let index = this._reactInternalFiber.index;
		const { height, width, points,data} = this.state;
		//console.log(data);
		let canvas1 = document.getElementsByTagName('canvas')[index];
		let canvas = document.createElement('canvas');
		canvas.height = height;
		canvas.width = width;

		let rc = Rough.canvas(canvas)

		rc.rectangle(...points,data);
		//console.log(rc);
		//console.log(ReactDOM.findDOMNode(this));
		canvas1 = canvas;
		let canvasOld = ReactDOM.findDOMNode(this).getElementsByTagName('canvas')[0];
		console.log(canvasOld);
		let node = ReactDOM.findDOMNode(this);
		node.innerHTML='';
		node.appendChild(canvas);
		//ReactDOM.findDOMNode(this).replaceChild()
	}

	componentWillReceiveProps(newProps){
		//console.log(newProps);
		this.setState({
			height: newProps.height,
				width: newProps.width,
				points: newProps.points,
				data: newProps.data,
		})
	}

	componentDidMount(){
		const { height, width, points,data} = this.state;
		let canvas = document.createElement('canvas');
		canvas.height = height;
		canvas.width = width;

		let rc = Rough.canvas(canvas)

		rc.rectangle(...points,data);

		ReactDOM.findDOMNode(this).appendChild(canvas)

	}
	render(){
		return( <div id="rectDiv" />)
	}
}


class ReactRough extends Component {
	constructor(props){
		super(props)
		this.state = {
			height: this.props.height,
			width: this.props.width,
			render: this.props.render,
			children: this.props.children
		}
	}

	componentWillReceiveProps(newProps){
	//	console.log(newProps);
		this.setState({
			height: newProps.height,
			width: newProps.width,
			render: newProps.render,
			children: newProps.children
		})
	}

	componentDidUpdate(){
		console.log(this);
		const { height, width, render, children } = this.state

		let canvas = document.getElementsByTagName('canvas');
		console.log(canvas);
		for(let i = 0; i < canvas.length;++i){
			console.log(canvas[i]);
			canvas[i].height = height
			canvas[i].width = width

			let rc = Rough.canvas(canvas[i])

			if (render) render(rc)

			if (children) {
				console.log(children);
				React.Children.map(children, child => {
					const type = child.type.name.toLowerCase()
					const {
						points,
						...data
					} = child.props

					rc[type](...points, data)
				})
			}
			//ReactDOM.findDOMNode(this).appendChild(canvas[i]);
		}
		//ReactDOM.findDOMNode(this).removeChild('canvas')
		//ReactDOM.findDOMNode(this).remove();

	}

	componentDidMount() {
		//console.log(this.state);
		const { height, width, render, children } = this.state

		let canvas = document.createElement('canvas')
		canvas.height = height
		canvas.width = width

		let rc = Rough.canvas(canvas)

		if (render) render(rc)

		if (children) {
			console.log(children);
			React.Children.map(children, child => {
				const type = child.type.name.toLowerCase()
				const { points, ...data } = child.props

				rc[type](...points, data)
			})
		}

		ReactDOM.findDOMNode(this).appendChild(canvas)
	}

	render() {
		return <div id="canvasDiv"/>
	}
}

export const Arc = ({ width, height, points, ...data }) => {
	return (
		<ReactRough
			width={width}
			height={height}
			render={rc => {
				rc.arc(...points, data)
			}}
		/>
	)
}

export const Circle = ({ width, height, points, ...data }) => {
	return (
		<ReactRough
			width={width}
			height={height}
			render={rc => {
				rc.circle(...points, data)
			}}
		/>
	)
}

export const Curve = ({ width, height, points, ...data }) => {
	return (
		<ReactRough
			width={width}
			height={height}
			render={rc => {
				rc.curve(...points, data)
			}}
		/>
	)
}

export const Ellipse = ({ width, height, points, ...data }) => {
	return (
		<ReactRough
			width={width}
			height={height}
			render={rc => {
				rc.ellipse(...points, data)
			}}
		/>
	)
}

export const Line = ({ width, height, points, ...data }) => {
	return (
		<ReactRough
			width={width}
			height={height}
			render={rc => {
				rc.line(...points, data)
			}}
		/>
	)
}

export const Path = ({ width, height, points, ...data }) => {
	return (
		<ReactRough
			width={width}
			height={height}
			render={rc => {
				rc.path(...points, data)
			}}
		/>
	)
}

export const Polygon = ({ width, height, points, ...data }) => {
	return (
		<ReactRough
			width={width}
			height={height}
			render={rc => {
				rc.polygon(...points, data)
			}}
		/>
	)
}
/*
export const Rectangle = ({ width, height, points, ...data }) => {
	return (
		<ReactRough
			width={width}
			height={height}
			render={rc => {
				rc.rectangle(...points, data)
			}}
		/>
	)
}*/
export class Rectangle extends Component{
    constructor(props){
        super(props);
        this.state={
            width:this.props.width,
            height:this.props.height,
            points:this.props.points,
            data:this.props.data

        }
	}
	componentDidUpdate(){
		console.log(this);
	}
	componentDidMount(){
		console.log(`Rectangle state` + this.state);
	}

    componentWillReceiveProps(newProps){
        console.log(newProps);
        this.setState({
            width:newProps.width,
            height:newProps.height,
            points:newProps.points,
            data:newProps.data
        });
    }

    render(){
        return(
            <ReactRough width={this.state.width}
			height={this.state.height}
			render={rc => {
				rc.rectangle(...this.state.points, this.state.data)
			}}/>
        )
    }
}

export default ReactRough