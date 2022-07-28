import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
} from './types';
import {USER_SERVER} from '../components/Config';

export function loginUser(dataTosubmit){

    const request = axios.post(`${USER_SERVER}/login`, dataTosubmit)
        .then(response => response.data) // 서버에서 받은 데이터를 request에 담기

    return { //reducer로 넘겨주기
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataTosubmit){

    const request = axios.post(`${USER_SERVER}/register`, dataTosubmit)
        .then(response => response.data) 

    return { 
        type: REGISTER_USER,
        payload: request
    }
} 

export function auth(){

    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data) 

    return { 
        type: AUTH_USER,
        payload: request
    }
} 

export function logoutUser(){

    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data) 

    return { 
        type: LOGOUT_USER,
        payload: request
    }
} 

export function addToCart(id){

    let body = {
        productId : id

    }

    const request = axios.post(`${USER_SERVER}/addToCart`, body)
        .then(response => response.data) 

    return { 
        type: ADD_TO_CART,
        payload: request
    }
} 

