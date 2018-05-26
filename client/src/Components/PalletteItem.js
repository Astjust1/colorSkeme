import { Rectangle, ReactRough } from 'react-rough';
import React ,{Component} from 'react';



export default class PalletteItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            color: this.props.color,
        }
    }

    componentWillReceiveProps(newProps){
        //console.log(newProps);
        this.setState({color:newProps.color});
        this.forceUpdate();
    }

    render(){
        let color = this.state.color;
        //console.log(color);
        let options = {
            data: [10, 10, 200, 200], // x, y, width, height
            fill: color,
            fillWeight: 2.5
        };
        console.log(options);
       return(
           <span>
           <Rectangle width={220} height={220} options={options}/>
                <p>{this.state.color}</p>
           </span>
       ) 
    }
}