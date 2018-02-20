import React,{Component} from 'react'
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom'
import axios from 'axios'
import ReactLoading from 'react-loading'
import MoviesDetail from './MoviesDetail'
import MoviesDetail2 from './MoviesDetail2'
import {Media,Button,Alert,FormControl,Glyphicon,Col,Row} from 'react-bootstrap'
import Sugar from 'sugar'
const Error = (p)=> (
    <Alert bsStyle="warning">
   {p.content}
  </Alert>
)
export default class Movies extends Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getPopularData= this.getPopularData.bind(this)
    }
    state={
        text:'',
        lang:'tr',
        articles:[],
        popularfilms:[],
        loading:false,
        err:'',
        apiKey: 'b6014b39e92000bb705eb8fdbbb9d11d'
    }
    componentDidMount(){
        this.getPopularData();
    }
onChange= (e)=>{
    this.setState({
        [e.target.id]: e.target.value,
    })
    //this.getData()
}
getPopularData = () => {
    const {apiKey,lang} = this.state;
    axios.get('https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language='+ lang+'&api_key='+apiKey)
    .then((r)=> {
        this.setState({
            popularfilms: r.data.results,
            loading: false,
            err:''
        })
        
    })
    .catch((e)=>{
        this.setState({
            err: e
        })
    })
   
    
}
getData = ()=>{
    const {apiKey,lang,text} = this.state;
    if(text){
    this.setState({
        loading: true
    })
    fetch('http://api.themoviedb.org/3/search/movie?api_key='+apiKey+'&language='+ lang+'&query='+text +'&page=1&include_adult=false')
    .then(res => res.json())
    .then((res)=> {
        this.setState({
            articles: res.results,
            loading: false,
            err:''
        })
    })
    .catch((e)=>{
        this.setState({
            err: e
        })
    })
}
else{
    this.setState({
        err: 'Write Something...'
    })
}
}

    render(){
        const {articles,loading,err,popularfilms} = this.state;
        let data, error;
        let popular;
        popular=popularfilms.map((i,index)=>(
            <Link key={index} to={`/movies/details2/${i.id}`}><img alt={i.poster_path} width="84px" src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${i.poster_path}`}/></Link>))
        
        if(err){
            error = <Error content={err}/>
        }
            if(loading){
                data = <div>Loading...<ReactLoading type="spin" color="#4285f4" width="30px" /></div>
            }
            else{
                let count=0;
                data = articles.map((i,index)=>{
                    if(i)
                    count++;
                    return(
                            <Media key={index}>
                                <Media.Left>
                                <img key={index} alt={i.poster_path} src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${i.poster_path}`}/>
                                </Media.Left>
                                <Media.Body>
                                <Media.Heading><Link to={`/movies/details/${i.id}`}>{i.title}</Link></Media.Heading>
                                <p>
                                Points: {i.vote_average}<br/>
                                Relase Date: {i.release_date}<br/>
                                {i.overview}
                                </p>
                                </Media.Body>
                            </Media>
                            
                    )
                })
                if(count===0)
                    error = <Error content="Sonuç Bulunamadı!"/>
            }
        return(
            <Switch>
            <Router>
            <div>
                 <Row className="show-grid">
                    <Col xs={12} md={3}><FormControl id="text" bsSize="small" type="text" onChange={this.onChange}/></Col>
                    <Col xs={12} md={2}><FormControl id="lang" bsSize="small" type="text" onChange={this.onChange} placeholder="Language"/></Col>
                    <Col xs={12} md={1}><Button bsSize="small" onClick={this.getData}>Search <Glyphicon glyph="search" /></Button></Col>
                    </Row>
                    <br/>
                    {popular}<br/><br/>
           {error}
            <div>{data}</div>
            {Sugar.Date.format(new Date(), '%d.%m.%Y - %R')}
            <Route path="/movies/details2/:id" component={PP} articles={popularfilms.find(g => g.id == this.props.id )} showw="true"/> )} />
            <Route path="/movies/details/:id" render={({match}) => (
                  <MoviesDetail articles={articles.find(g => g.id == match.params.id )} showw="true"/>
                )} />
            </div>
            </Router>
            
            </Switch>
        )
    }
}
class PP extends Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        console.log("----------tümü")
        console.log(this.props.articles)
    }
    render(){
        return(<div>>ok</div>)
    }
}