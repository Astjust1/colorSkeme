import PalletteItem from './PalletteItem';
import React, {Component} from 'react';
import { isString } from 'util';
//import {Rectangle} from 'react-rough';
import {Rectangle} from './ReactRough';


export default class ColorPallette extends Component{
        constructor(props){
            super(props)
            this.state ={
                colors:this.props.colors
            }
        }

        componentWillReceiveProps(newProps){
            this.setState({colors:newProps.colors});
        }

        makeRGB(colorObj) {
            if (!isString(colorObj)) {
                const red = colorObj.red;
                const green = colorObj.green;
                const blue = colorObj.blue;
                return `rgb(${red},${green},${blue})`;
            }
            return colorObj;
        }


        render(){
            let pallettes = (isString(this.state.colors[0])) || this.state.colors.map( (colorObj,index)=>{
                return <PalletteItem key={index} color={this.makeRGB(colorObj)}/>
            });
            return(
                <ul>
                {
                    (isString(this.state.colors[0]) || this.state.colors.map((color)=>{
                         let options = {
                              // x, y, width, height
                             fill: this.makeRGB(color),
                             fillWeight: 2.5
                         };
                        return <Rectangle width={200} height={200} points={[10, 10, 200, 200]} data={options}/>
                    }))
                }
                </ul>
            )
        }

};