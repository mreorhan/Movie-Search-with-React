import React,{Component} from 'react'
import axios from 'axios'
import * as actions from '../../actions/index'
import '../../styles/style.css'
//import ReactLoading from 'react-loading'
//import {Link} from 'react-router-dom'
import {Media,Button,Col,Modal,ButtonToolbar,Row} from 'react-bootstrap'

export default class MoviesDetails extends Component{
constructor(props){
  super(props)
  this.state = {
    show: this.props.showw,
    cast:[],
    trailers: []
  }
  this.handleClose = this.handleClose.bind(this)
}
componentDidMount(){
  this.setState({ show: this.props.showw,cast:[],trailers:[] });
  axios.get('https://api.themoviedb.org/3/movie/'+this.props.articles.id+'/videos?api_key=b6014b39e92000bb705eb8fdbbb9d11d&language=en-US')
  .then((re)=>{
   this.setState({trailers:re.data.results})
   //console.log(this.state.trailers);
  })
  axios.get('https://api.themoviedb.org/3/movie/'+this.props.articles.id+'/credits?api_key=b6014b39e92000bb705eb8fdbbb9d11d&language=en-US')
  .then((r)=>{
  this.setState({cast:r.data.cast})
  //console.log(nextProps.articles.title, nextState);
  })
}/*
componentDidCatch(){
  alert("catch"+this.props.articles.title)
}
componentWillUpdate(){//öğe açılınca öncekini kapattığında şimdikini çağırıyor
  alert("willupdate"+this.props.articles.title)
}
*/
componentWillMount(){
  this.props.fetchData("/bankAccount/list", "fetch_bank_accounts");
  let formData = {}
  console.log("cevap"+formData.bank.opening_balance)
}
    componentWillReceiveProps(nextProps, nextState){//sadece başlangıçta bir önceki öğeyi gösteriyor
      alert("willreceiveden dolayı")
      this.setState({ show: true,cast:[],trailers:[] });
      axios.get('https://api.themoviedb.org/3/movie/'+nextProps.articles.id+'/videos?api_key=b6014b39e92000bb705eb8fdbbb9d11d&language=en-US')
      .then((re)=>{
       this.setState({trailers:re.data.results})
      })
      axios.get('https://api.themoviedb.org/3/movie/'+nextProps.articles.id+'/credits?api_key=b6014b39e92000bb705eb8fdbbb9d11d&language=en-US')
      .then((r)=>{
      this.setState({cast:r.data.cast})
      })
    }
    
    handleClose(){
      this.setState({ show: false });
    }
 
      
    render(){
      
      const {articles} = this.props
      const {cast,trailers} = this.state// süslü parantezleri sakın unutma,okumuyor yoksa!
      let lCast,lTrailers;
      if(trailers){
        lTrailers =trailers.map((i,index)=>(
          i.key+","
        ))
      }
    
      if(cast){
        lCast = cast.map((i,index)=>{
         if(i.profile_path){
          return(
          <Col xs={12} md={6} key={index}>
          <Media>
          <Media.Left>
          <img alt={i.poster_path} width="120px" src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${i.profile_path}`}/>
           </Media.Left>
           <Media.Body>
           {i.name}<br/><i>{i.character}</i><br/> 
           </Media.Body>
            </Media>
            <br/>
            </Col>
          )}
          return 1 
        }
    )
      }
      else{
        lCast = <div>Loading</div>
      }
    return(
    <div>
        <ButtonToolbar>
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleClose}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
            Details of {articles.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Media className="customMedia">
            <Media.Left>
            <img className="cover" alt={articles.poster_path} src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${articles.poster_path}`}/>
            <img className="backCover" alt={articles.poster_path} src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${articles.backdrop_path}`}/>
            <div className="backTransparent"></div>
            </Media.Left>
            <Media.Body className="customMediaBody">
            <p>
            Points: {articles.vote_average}<br/>
            Relase Date: {articles.release_date}<br/>
            Vote: {articles.vote_count}<br/>
            Popularity: {articles.popularity}<br/>
            Original Language: {articles.original_language}<br/>
            {articles.overview}
           </p>
          
          </Media.Body>
        </Media>
        <Media>
        <Media.Body>
        <iframe title="Trailers" width="100%" height="315" src={`https://www.youtube.com/embed?playlist=${lTrailers}`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <h3>Cast</h3>
        <Row className="show-grid">
        {lCast}</Row>
        </Media.Body>
        </Media>
        <br/>
          
          </Modal.Body>
          
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    </div>
)}
}
