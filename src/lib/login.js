import React from "react";
import {Form, Icon, Input, Button, Checkbox} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Formik} from "formik";
import {withRouter} from "react-router-dom";
import {postLogin} from "../actions/auth";
import { Redirect } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import { API_KEY } from "../util/api";
import './login.css';

class loginForm extends React.Component{

    constructor(props) {
        super(props);
    
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
        redirect: false,
        username: "",
        isLoading: false,
        error: ""
        
        };
        
      }
    
    componentWillReceiveProps(nextProps){
        const {
            login: {data}
        } = nextProps;

        if(data.isValid){
            this.props.history.push("/dashboard")
        }else{
            alert("Wrong Password");
        }
    }


    onSubmit(e){
        e.preventDefault();
        this.isLoggedIn();
        this.setState({ isLoading: true, error:"" });
     
            
     
    }

    handleChange(e) {
        this.setState({ username: e.target.value.toUpperCase() });
      }

    renderRedirect = () => {
        return <Redirect to="/dashboard" />;
      };
    
      redirectt=()=>{
        return<Redirect to="/register"/>;
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
    

    render(){
        return(
            <Formik 
            initialValues={{username:""}}
            onSubmit={(values, {setSubmitting}) => {
                this.props.dispatch(postLogin(values));
               
            }}
             
            validate={values=>{
                console.log("values", values);
                const errors = {};
                if(!values.username){
                    errors.username = "Fill in the username";
                }
               
            }}
            >
                {props => {
                    console.log("props",props);
                    const {
                        values: {username},
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset
                    } = props;

                return(
                    <Form onSubmit = {this.onSubmit} className= "login-form">
                        <Form.Item>
                        <Input
                        value= {username}
                        onChange={handleChange}
                        //onBlur = {handleBlur}
                        id="username"
                        prefix={
                            <Icon type="user" style={{color:"rgba(0,0,0.25)"}}/>
                        }         
                        placeholder="Username"            
                        />
                        {errors.username && touched.username &&(
                            <div className="invalid-feedback">{errors.username}</div>
                        )} 
                        </Form.Item>
                        {/* <Form.Item>
                            <Input
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="password"
                            prefix={
                                <Icon type="lock" style ={{color:"rgba(0,0,0.25)"}}/>
                            }
                            type="password"
                            placeholder="Password"
                            />
                            {errors.password && touched.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                        </Form.Item> */}
                        <Form.Item>
                            <Checkbox>Remember me</Checkbox>
                            {/* <a className="login-form-forgot" href="">
                            Forgot password
                            </a> */}
                            <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            >
                            Log in
                            </Button>
                            Or <Link to="register">register now!</Link>
                        </Form.Item>




                    </Form>
                );
                }}
            </Formik>
        )
    }
}


function mapStateToProps(state){
    console.log("state",state)
    return{
        login: state.loginUser
    };
}

export default withRouter(connect(mapStateToProps)(loginForm)) ;