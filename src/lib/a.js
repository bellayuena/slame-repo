import React, { Component } from "react";
import { Redirect,Link } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import { API_KEY } from "../util/api";
import "./login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      redirect: false,
      userName: "",
      isLoading: false,
      error: ""
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.isLoggedIn();
    this.setState({ isLoading: true, error:"" });
  }

  handleChange(e) {
    this.setState({ userName: e.target.value.toUpperCase() });
  }

  renderRedirect = () => {
    return <Redirect to="/dashboard" />;
  };


  isLoggedIn() {
    CometChat.login(this.state.userName, API_KEY).then(
      User => {
        console.log("Login Successful:", { User });
        this.setState({ redirect: true });
      },
      error => {
        console.log("Login failed with exception:", { error });
        this.setState({
          error: "Login failed, please enter a valid username",
          isLoading: false
        });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="login">
          <h3>Welcome to Your React Chat App | Log in to start chatting</h3>
          {!this.state.redirect ? "" : this.renderRedirect()}
          <div>
            <form onSubmit={this.onSubmit}>
              <div>
                <input
                  className="groupname"
                  placeholder="Enter Your Username"
                  onChange={this.handleChange}
                />
              </div>
              <button className="button modalbutton"  type="primary"
                            htmlType="submit">Login</button>  Or <Link to="register">register now!</Link>
              {/* <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            >
                            Log in
                            </Button>
                            Or <Link to="register">register now!</Link> */}
            </form>
            <div className="error">{this.state.error}</div>
            
          </div>
        </div>
      </React.Fragment>
    );
  }
}
