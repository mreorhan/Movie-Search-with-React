import React,{Component} from 'react'
import '../../styles/style.css'
//import axios from 'axios'
//import ReactLoading from 'react-loading'
//import {Link} from 'react-router-dom'
import {Media,Button,Modal,ButtonToolbar} from 'react-bootstrap'

export default class MoviesDetails extends Component{
constructor(props){
  super(props)
  this.state = {
    show: this.props.showw
  }

  this.handleClose = this.handleClose.bind(this)
}
    componentWillReceiveProps(){
      this.setState({ show: this.props.showw });
    }
    
    handleClose(){
      this.setState({ show: false });
    }
    render(){
      const {articles} = this.props
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
            <p>
            <Media>
            <Media.Left>
            <img  alt={articles.poster_path} src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${articles.poster_path}`}/>
            <img classNmae="backColor" alt={articles.poster_path} src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${articles.backdrop_path}`}/>
            </Media.Left>
            <Media.Body>
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
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    </div>
)}
}
