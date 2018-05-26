import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Rough from 'roughjs'

class ReactRough extends Component {
	componentDidMount() {
		const { height, width, render, children } = this.props

		let canvas = document.createElement('canvas')
		canvas.height = height
		canvas.width = width

		let rc = Rough.canvas(canvas)

		if (render) render(rc)

		if (children) {
			React.Children.map(children, child => {
				const type = child.type.name.toLowerCase()
				const { points, ...data } = child.props

				rc[type](...points, data)
			})
		}

		ReactDOM.findDOMNode(this).appendChild(canvas)
	}

	render() {
		return <div />
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