import{
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Form,
    Icon,
    Input,
    Select,
    Tooltip,
    Col,
    Row
} from "antd";
import React from 'react';
import {Formik} from 'formik';
import "./register.css";
import { format } from "url";

const {Option} = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component{
    state = {
        confirmDirty:false,
        autoCompleteResult: []
    };

    handleSubmit = e =>{
        e.preventDefault();
        this.props.Form.validateFieldAndScroll((err,values) =>{
            if (!err){
                console.log("Received values of form:", values);
            }
        });
    };

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value})
    
    };

    compareToFirstPassword = (rule,value,callback) => {
        const {Form} = this.props;
        if (value && value !== format.getFieldValue("password")){
            callback("Two passwords that you enter is inconsistent");
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule,value,callback) => {
        const {form} = this.props;
        if(value && this.state.confirmDirty){
            form.validateFields(["confirm"],{force:true});
        }
        callback();
    };

    handleWebsiteChange = value =>{
        let autoCompleteResult;
        if(!value){
            autoCompleteResult = [];
        } else {
            autoCompleteResult = [".com",".org",".net"].map(
                domain => `${value}${domain}`
            );
        }
        this.setState({autoCompleteResult});
    };

    handleSubmitForm(value){
        console.log("value submit",value);
    }

    onHandleCascaderChange(e,props){
        console.log('props-cascader value',e)
        console.log('props-cascader props', props)
        props.setFieldValue('location',e)
    }

    render(){
        const {autoCompleteResult} = this.state;
        const websiteOptions = autoCompleteResult.map(website =>(
            <AutoCompleteOption key ={website}>{website}</AutoCompleteOption>
        ) );

        return(
            <Formik
            initialValues= {{email:"", password:"", passwordConfirm:"",username:"",}}
            onSubmit={this.handleSubmitForm}
            validate= {values=>{
                console.log("values", values);
                var patt = new RegExp(/(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

                const errors = {};
                if(!values.email){
                    errors.email = "Fill in email";
                } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                ) {
                  errors.email = "Email not valid";
                }

                if(!values.password){
                    errors.password = "Fill in password";
                }
                if(!values.passwordConfirm){
                    errors.passwordConfirm ="The password is wrong"
                }
                if (values.passwordConfirm !== values.password){
                    errors.passwordConfirm = "It is not the same password";
                }
                if(!values.username){
                    errors.username = "Fill in username";
                }
                return errors;
            }}  
            >
                {props =>{
                    console.log("proptest", props);
                    const {
                        values: {
                            username,
                            website,
                            email,
                            password,
                            passwordConfirm,
                        },
                        touched, errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    } = props;

                    return(
                        <Form className="regist-form" onSubmit={handleSubmit}>
                            <Form.Item label ="E-mail">
                            <Input
                            value= {email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="email"
                            />
                            {errors.email && touched.email && (
                                <div className="invalid-feedback">{errors.email}</div>
                            )}
                            </Form.Item>
                            <Form.Item label="Password" hasFeedback>
                                <Input.Password
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="password"/>
                                {errors.password && touched.password && (
                                    <div className ="invalid-feedback"> {errors.password}</div>
                                )}
                            </Form.Item>
                            <Form.Item label="Confirm Password" hasFeedback>
                                <Input.Password
                                value={passwordConfirm}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="passwordConfirm"
                                />
                                {errors.passwordConfirm && touched.passwordConfirm &&(
                                    <div className="invalid-feedback">{errors.passwordConfirm}</div>
                                )}
                            </Form.Item>    
                            <Form.Item
                            label={<span>
                                Username&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o"/>
                                </Tooltip>
                            </span>
                            }
                            >
                                <Input
                                value ={username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="username"
                                />
                                {errors.username && touched.username&&(
                                    <div className="invalid-feedback">{errors.username}</div>
                                )}
                            </Form.Item>

                            <Form.Item>
                                <Checkbox>
                                    I have read the agreement
                                </Checkbox>
                            </Form.Item>
                            <Form.Item>
                            <Button type="primary" htmlType="submit">
                            Register
                            </Button>
                            </Form.Item>
                        </Form>
                    )
                }}


            </Formik>
        )
    }
}


export default RegistrationForm;