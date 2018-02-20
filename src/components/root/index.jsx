import React,{ Component } from 'react'
import axios from 'axios'
import Element from './Element'
import {Link} from 'react-router'

export default class Index extends Component{
constructor(props){
super(props);
this.state={
  data:[],
  loading:true,
  datastatus:true,
  filterdata:[],
  searchData:'',
  username:'',
  password:''
}
this.onChange=this.onChange.bind(this);
this.onSubmit = this.onSubmit.bind(this);
this.searchFilter = this.searchFilter.bind(this);
}


data(){
  axios({
    method:'get',
    url:'http://jsonplaceholder.typicode.com/posts',
    params:{
      userId:1
    }
  })

  .then(response => {
    this.setState({
      data:response.data,
      loading:false,
      datastatus:false
    });
    console.log("Veriler başarıyla çekildi.")
  })
  .catch(e=>{
    console.log(e);
  });
}
dataPost(){
  axios.post('https://www.facebook.com/', {
    firstName:'emre',
    lastName:'orhan'
  })
  .then(r=>{
    console.log(r);
  })
  .catch(e=>{
    console.log(e);
  })
}
searchFilter(e){
  this.setState({
    searchData:e.target.value
  })
}
onChange(e){
  this.setState({
    [e.target.name]: e.target.value
  })
  console.log(this.state)
}
onSubmit(){
  console.log(this.state.username+this.state.password);
}
render(){
  const {loading,data,datastatus,filterdata} = this.state;
let content,content2,content3;
if(datastatus){
  content2=<div><button onClick={this.data.bind(this)}>Get Data</button></div>;
}
else{
  if(loading){
    content = <div>Loading...</div>
  }
  else{
    data.sort((a,b)=> a.id<b.id);
    data.filter((t)=>{
      if(t.id>5){
        filterdata.push(t);
      }
      return t;
    });
    content3 = filterdata.map((i)=>{
      return(
        <li key={i.id}>{i.title}</li>
      )
  })
    content = data.map((i,index)=>{
      return(
        <li key={index}><h3><i>{i.id}</i> - {i.title}</h3>{i.body}</li>
      )
    })
}
this.dataPost();
}
  return(
    <div>
      
      <input placeholder="Search..." value={this.state.searchData} onChange={this.searchFilter}/>
      <button>Search</button>
      {this.state.searchData}
      {content2}
    <ul>{content}</ul>
    <Element bgcolor="0073cf" txtcolor="fff" title="Hi">content</Element>
  5ten sonrası:
  {content3}
  <div>
    <input type="text" id="username" name="username" onChange={this.onChange}/>
    <input type="password" id="password" name="password" onChange={this.onChange}/>
    <button type="submit" onClick={this.onSubmit}>Register</button>
  </div>
    </div>
  );
}
}
