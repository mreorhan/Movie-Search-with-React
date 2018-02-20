import React, { Component } from 'react'
import { MenuItem,Nav,Navbar,NavItem,NavDropdown,Grid,Row,Col,ListGroup,ListGroupItem } from 'react-bootstrap'
import { BrowserRouter as Router,Link, Route,Redirect,Switch } from 'react-router-dom'
import NF404 from './components/root/404'

import NYPost from './components/root/NYPost'
//import Hurriyet from './components/root/Hurriyet'
import Form from './components/root/Form'
import Auth from './components/root/Auth'
import About from './components/root/About'
import Github from './components/root/GitHub'
import NYPostv2 from './components/root/NYPostv2'
import Movies from './components/root/Movies'
import RateFilms from './components/root/RateFilms'
import MoviesDetail from './components/root/MoviesDetail'

class App extends Component {
  state={
    count:0
  }
  makeIncrementer = amount => () =>
    this.setState(prevState =>({
      count:prevState.count+amount
    }))
  increment = this.makeIncrementer(1)
  decrement = this.makeIncrementer(-1)
  render() {
    return (
      <Router>
    <div>
      
      <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#brand">Test</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href="#">
        Link
      </NavItem>
      <NavItem eventKey={2} href="#">
        Link
      </NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavItem eventKey={1} href="#">
        Link Right
      </NavItem>
      <NavItem eventKey={2} href="#">
        Link Right
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        <Grid>
          
          <Row className="show-grid">
            <Col xs={12} md={3}>
            <ListGroup>
              <ListGroupItem><Link to="/">Index</Link></ListGroupItem>
              <ListGroupItem><Link to="/about">Modal</Link></ListGroupItem>
              <ListGroupItem><Link to="/nypost">NYPost</Link></ListGroupItem>
              <ListGroupItem><Link to="/nypostv2"> NYPost V2 </Link></ListGroupItem>
              <ListGroupItem><Link to="/movies"> Movies </Link></ListGroupItem>
              <ListGroupItem><Link to="/ratefilms"> Rate Films </Link></ListGroupItem>
              <ListGroupItem><Link to="/hurriyet">hurriyet</Link></ListGroupItem>
              <ListGroupItem><Link to="/github">Github</Link></ListGroupItem>
              <ListGroupItem><Link to="/form">Form</Link></ListGroupItem>

            </ListGroup>

            </Col>
            <Col xs={12} md={9}>
            {this.state.count}
            <button onClick={this.increment}>Increment</button>
            <button onClick={this.decrement}>Decriment</button>
              <Switch>
              <Route exact={true} path="/" render={() => (
                <h1>Welcome</h1>
              )}/>
            
              <Route exact={true} path="/nypost" component={NYPost}/>
              <Route exact={true} path="/nypostv2" component={NYPostv2}/>
              <Route exact={true} path="/movies" component={Movies}/>
              <Route exact={true} path="/about" component={About}/>
              <Route exact={true} path="/details" component={MoviesDetail}/>
              <Route exact={true} path="/ratefilms" component={RateFilms}/>
              <Route path="/github" component={Github}/>
              <Route path="/form" component={Form}/>
              <Route exact  path="/auth" component={Auth}/>
              <Redirect from="/old-match" to="/will-match"/>
              <Route component={NF404}/>
              </Switch>
            </Col>
          </Row>
        </Grid>
      </div>
      </Router>
    );
  }
  
}




/*class LoadFile extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       content: null
    }
  }
  componentDidMount = () => {
    fetch(this.props.url)
      .then(res => res.text())
      .then(res => {
        this.setState({
          content: res
        })
      })
  }
  
  render() {
    const {content} = this.state
    return (
      <pre>
        <div dangerouslySetInnerHTML={{__html: content}} />
      </pre>
    )
  }
}*/




export default App;
