import React,{Component} from 'react'

export default class Element extends Component{

  render(){
    const {bgcolor,txtcolor,title,children} = this.props;
    let divStyle={
      background:'#'+bgcolor,
      color: '#'+txtcolor
    }
    return(
      <div className="element" style={divStyle}><h2>{title}</h2>{children}</div>
    )
  }
}
