/***********
 * ŞUAN ÇALIŞMIYOR 
 * 401 HATASI DÖNDÜRÜYOR!
 * 
 * 
 */

import React,{Component} from 'react'
import axios from 'axios'
export default class Hurriyet extends Component{
    state={
        text:'',
        articles:[],
        apiKey: 'cb5d7e72bdb64e94b55466ed128c1dc1'
    }
onChange= (e)=>{
    this.setState({
        text: e.target.value,
        

    })
    this.getData()
}
getData = ()=>{
    axios({
        headers: {
        "accept": "application/json",
        "apikey": "cb5d7e72bdb64e94b55466ed128c1dc1",
        },
        url: 'https://api.hurriyet.com.tr/v1/search/' + this.state.text,
        method: 'GET'
    })
    .then((r)=> {
        this.setState({
            articles: r
        })
    })
    console.log(this.state.articles)

}

    render(){
        const {articles} = this.state;
       
        return(
            <div>
            <input type="text" onChange={this.onChange}/>{this.state.text}
            <button onClick={this.getData}>Search</button>
            {
    this.state.articles.map((i,index)=>{
        const k = i.Files.map((j)=>(
            <img src={`${j.url}`}/>
        ))
        return(
            <div key={index}>{i.Description}<br/> {k[0] ||'no thmub'}</div>
        )
    })
}
            </div>
        )
    }
}