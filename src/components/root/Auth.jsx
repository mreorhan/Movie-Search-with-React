import React,{Component} from 'react'

export default class Auth extends Component{
    constructor(props){
        super(props);
      this.state={
        token: Math.random().toString(36).substring(7),
        db: [
            {name:'emre',password:'1234'},
            {name:'orhan',password:'1'}
        ]
      }
      this.auth = this.auth.bind(this)
    }
    getToken() {
        return localStorage.token
      }
    auth(){
        
    }
    render(){
        const {name,password} = this.props;
        if(name==='emre' && password==="1234"){
            alert("ok")
        }
        return(
            <div>
                {this.props.name} {this.props.password}
                {this.state.db.map((i,index)=>{
                    return(
                        <ul key={index}>{i.name}</ul>
                    )
                })}
            </div>
        )
    }
}
