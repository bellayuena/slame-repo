
import { async } from 'q';
import Axios from 'axios';


const API_ID = "8636350546c20e";
const API_KEY = "6bf0e6fd364bb255368817263e9981c723fbb435";
const BASE_URL = "http://18.223.162.119:3008/api"
const BASE_URL_MOCK = "http://5d60ae24c2ca490014b27087.mockapi.io/api/v1"


export {API_ID,API_KEY};

export const getResponse = async params =>{
    const  data  = await Axios.get(`${BASE_URL}${params}`)
    .then(({data}) => data);
    return data;
};

export const postResponse = (url,data)=>
Axios.post(`${BASE_URL}${url}`, data)
.then(res => res)
.catch(error => Promise.reject(error))

