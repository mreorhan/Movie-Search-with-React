import React,{Component} from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import {Carousel,Col,Button} from 'react-bootstrap'
export default class NYPostv2 extends Component{
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
                    if(k[0])
                    return(
                        <Carousel.Item>
                        {k[0]}<Carousel.Caption>
                        <h3>{i.snippet}</h3>
                        <p><i>{i.source}</i></p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    )
                    return 1
                }
            
            )
            }
        return(
            <div>
            <input type="text" onChange={this.onChange}/>{this.state.text}
            <Button onClick={this.getData}>Search</Button><br/><br/>
                <Col xs={12} md={9}>
                <Carousel>{data}</Carousel>
                </Col>
            </div>
        )
    }
}