import React,{Component} from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
export default class NYPost extends Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        
    }
    state={
        text:'',
        articles:[],
        loading:false,
        apiKey: 'fbb07d1a4e4f6f90c4509b27c2bc6938:9:73594931'
    }
onChange= (e)=>{
    this.setState({
        text: e.target.value,
    })
    //this.getData()
}
getData = ()=>{
    this.setState({
        loading: true
    })
    axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + this.state.text + '&api-key=' + this.state.apiKey)
    .then((r)=> {
        this.setState({
            articles: r.data.response.docs,
            loading: false
            
        })
    })
    .catch((e)=>{
        alert(e)
    })
    
   
    console.log(this.state.loading)
}

    render(){
        const {articles,loading} = this.state;
        let data;
            if(loading){
                data=<div>Yukle<ReactLoading type="spin" color="#4285f4" width="30px" /></div>
            }
            else{
                data = articles.map((i,index)=>{
                    const k = i.multimedia.map((j)=>(
                        <img alt={j.url} src={`https://www.nytimes.com/${j.url}`}/>
                    ))
                    return(
                        <div key={index}>{i.snippet}<br/><i>{i.source}</i>{i.pub_date} {k[0] ||'No thumbnail'}</div>
                    )
                })
            }
        return(
            <div>
            <input type="text" onChange={this.onChange}/>{this.state.text}
            <button onClick={this.getData}>Search</button>
            {data}
            </div>
        )
    }
}