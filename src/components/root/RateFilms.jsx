import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';
import axios from 'axios';
export default class RateFilms extends Component{
    constructor(props){
        super(props);
        this.getRate = this.getRate.bind(this)
        this.getRateDel = this.getRateDel.bind(this)
    }
    state={
        data:''
    }
    
    getRate(){
        axios.post('https://api.themoviedb.org/3/movie/12/rating?api_key=b6014b39e92000bb705eb8fdbbb9d11d&guest_session_id=04d794b50ace942c1f5a221a0bf53e5e',{
            value: 8.5
        })
        .then(r=>{
             this.setState({
                data: r.data.status_message
            })
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    getRateDel(){
        axios.delete('https://api.themoviedb.org/3/movie/12/rating?api_key=b6014b39e92000bb705eb8fdbbb9d11d&guest_session_id=04d794b50ace942c1f5a221a0bf53e5e')
        .then(r=>{
             this.setState({
                data: r.data.status_message
            })
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    render(){
        const {data} = this.state
        return(
            <div>ok<br/>
                <button onClick={this.getRate}>Vote</button>
                <button onClick={this.getRateDel}>Del</button>
            <Alert bsStyle="warning">
            {data}
            </Alert>
            </div>
        )
    }
}