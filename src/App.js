import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import React from 'react';
import register from './lib/register';
//import login from './lib/login';
 import login from './lib/a';
import { Provider } from 'react-redux';
import dashboard from './lib/dashboard';
import chatbox from './components/chatbox/chat';
import creategroup from "./components/create-group/create-group";

import "./App.css";
import { CometChat } from "@cometchat-pro/chat";
import { API_ID } from "./util/api";
import configureStore from "./store/configStore";


const store = configureStore();


class App extends React.Component{

  constructor(props){
    super(props);
    CometChat.init(API_ID).then(
      hasInit => {
        console.log("success", hasInit);
      },
      error=> {
        console.log("failed", error);
      }
    );
  };

  render(){
    return(
      
      <div>
                <Provider store={store}>
                    <Router>
                     <Switch>
                      <Route exact path="/" component ={login}/>  
                        <Route path="/dashboard" component = {dashboard}/>
                        <Route path="/register" component = {register}/>
                        <Route path= "/chat" component = {chatbox}/>
                        <Route path= "/creategroup" component = {creategroup}/>
                     </Switch>
                    </Router>
                </Provider>
            </div>
    )
  }
}

export default App;
