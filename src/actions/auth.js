import axios from 'axios';
import Cookies from 'cookies-js';
import {API_ID} from '../util/api';
import Axios from 'axios';

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';


export function loginSubmit(data){
    return {
        type: LOGIN_SUBMIT,
        data,
    };
}

export function postLogin(data){
    return (dispatch) =>{
        return  Axios.post(API_ID, { email: data.username })
        .then(
            ({ data }) => {
                console.log('res', data)
                Cookies.set('set', data.token)
                Cookies.set('data',JSON.stringify({email:data.email }));

                dispatch(loginSubmit(data));
            }
        );
};
}