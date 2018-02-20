import React,{Component} from 'react'
import {Router,Route,Switch} from 'react-router'
import Home from '../root/index'
import Element from '../root/Element'

const Main = () => {
    <Switch>
        <Route path="/" component={Home}/>
        <Route path="/element" component={Element}/>
    </Switch>
}
export default Main;