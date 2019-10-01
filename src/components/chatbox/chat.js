import React, {Component} from 'react';
import {CometChat} from '@cometchat-pro/chat';
import "./chat.css";

 class Chatbox extends React.Component{
    constructor(props){
        super(props);

        this.state={
            receiverID : this.props.state.group,
            messageText: null,
            groupMessage: [],
            user:{}
        };


        
    this.receiverID = this.state.receiverID;
    this.messageType = CometChat.MESSAGE_TYPE.TEXT;
    this.receiverType = CometChat.RECEIVER_TYPE.GROUP;
    this.limit=30;
    this.send= this.send.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.getUser = this.getUser.bind(this);
    }


    componentDidUpdate(){
        this.newstate = this.state.receiverID;
        if(this.newstate !== this.props.state.group){
            this.setState({receiverID: this.props.state.group}, ()=>{
                this.update();
                return {receiverID: this.props.state.group};
            });            
        } 
        else{

        }
    }

    componentDidMount(){
        this.getUser();
    }

    update(){
        this.messageReq = new CometChat.MessagesRequestBuilder()
        .setGUID(this.props.state.group)
        .setLimit(this.limit)
        .build();

        this.scrollToBottom();

        this.messageReq.fetchPrevious().then(
            messages => {
                this.setState({groupMessage:[]},() =>{
                    return{groupMessage:[]};
                });
                this.setState({groupMessage: messages}, () =>{
                    return{groupMessage: messages};
                });
            },
            error => {
            console.error("Message fetching failed with error", error);
            }
        );
    }


    send(){
        this.textMessage = new CometChat.TextMessage(
            this.state.receiverID,
            this.state.messageText,
            this.state.messageType,
            this.receiverType
        );

        CometChat.sendMessage(this.textMessage).then(
            message =>{
                console.log("Message sent successfully:", message);
                this.setState({messageText: null});
                this.update();
            },
            error=>{
                console.log("Message sending failed:", error);
            }
        );
    }

    scrollToBottom(){
        const chat = document.querySelectorAll(".chat")[0];
        chat.scrollTop = chat.scrollHeight;
    }

    handleSubmit(e){
        e.preventDefault();
        this.send();
        e.target.reset();
    }

    handleChange(e){
        this.setState({messageText: e.target.value});
    }

    getUser(){
        CometChat.getLoggedinUser().then(
            user=>{
                console.log("user details", {user});
                this.setState({user: user},()=>{
                    return {user: user};
                });
                return {user};
            }, error =>{
                console.log("error getting details",{error});
                return false;
            }
            
        );
    }

    render(){
        return(
            <div className="chatWindow">
          <ol className="chat">
            {this.state.groupMessage.map(data => (
              <div>            
                {this.state.user.uid === data.sender.uid ? (
                  <li className="self" key={data.id}>
                    <div className="msg">
                      <p>{data.sender.uid}</p>
                      <div className="message"> {data.data.text}</div>
                    </div>
                  </li>
                ) : (
                  <li class="other" key={data.id}>
                    <div class="msg">
                      <p>{data.sender.uid}</p>

                      <div className="message"> {data.data.text} </div>
                    </div>
                  </li>
                )}
              </div>
            ))}
          </ol>
         
          {this.props.state.startChatStatus ? (
            <div className="chatInputWrapper">
              <form onSubmit={this.handleSubmit}>
                <input
                  className="textarea input"
                  type="text"
                  placeholder="Type a message..."
                  onChange={this.handleChange}
                />
              </form>

              <div className="emojis" />
            </div>
          ) : (
            "Please, choose a group to start chatting..."
          )}
        </div>
        );
    }
}

export default Chatbox;