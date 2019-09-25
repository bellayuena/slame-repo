import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import React from 'react';
import register from './lib/register';
import login from './lib/login';
import dashboard from './lib/dashboard';
import chat from './components/chatbox/chat'
import './App.css';


class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component ={dashboard}/>
          <Route path="/login" component = {login}/>
          <Route path="/register" component = {register}/>
          <Route path= "/chat" component = {chat}/>
      </Switch>
    )
  }
}

export default App;
