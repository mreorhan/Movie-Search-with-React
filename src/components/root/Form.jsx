import React, {Component} from 'react'
import Auth from './Auth'
export default class Form extends Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            password:''
        }
        this.eventHandler= this.eventHandler.bind(this);
        this.sendData = this.sendData.bind(this);
    }
    eventHandler(e){
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    sendData(){
        const {name,password} = this.state;
        
        if(name==='' || password ==='')
        alert('name='+name +' pass='+ password)
        else
        {
            console.log(name)
            return(
                <div>>e</div>
            )
        }
        
    }
    render(){
        const {name,password} = this.state;
        return(
            <div>
                <input type="text" id="name" onChange={this.eventHandler} placeholder="E-mail"/>
                <input type="password" id="password" onChange={this.eventHandler} placeholder="Password"/>
                <button onClick={this.sendData}>Login</button>
                <Auth name={name} password={password}/>
            </div>
        )
    }
}