import axios from 'axios';
import { 
    USER_LOGIN, 
    USER_AUTH,
    GET_USER_REVIEWS,
    GET_USERS,
    REGISTER_USER
} from './action_types';

export const loginUser = ({email, password}) => {
    const request = axios.post(`/api/user/login`, {email, password});   
    return (dispatch) => {
        request.then(({data}) => {
                    dispatch({
                        type: USER_LOGIN,
                        payload: data
                    });
                })
                .catch(err => console.log(err));
    }
}

export const auth = () => {
    const request = axios.get('/api/user/auth');

    return (dispatch) => {        
        request.then( ({data}) => {
                    dispatch({
                        type: USER_AUTH,
                        payload: data
                    });             
                })
                .catch(err => console.log(err));        
    }
}

export const getUserReviews = (userId) => {
    return (dispatch) => {
        axios.get(`/api/user/posts?user=${userId}`)
            .then( ({data}) => {
                dispatch({
                    type: GET_USER_REVIEWS,
                    payload: data
                })
            })
            .catch(err => console.log(err));
    }
}

export const getUsers = () => {
    return (dispatch) => {
        axios
            .get('/api/user/all')
            .then( ({data}) => {
                dispatch({
                    type: GET_USERS,
                    payload: data
                });
            })
            .catch(err => console.log(err));
    }    
}

export const registerUser = (user, userList) => {
    return (dispatch) => {
        axios
            .post('/api/user/register', user)
            .then( ({data}) => {
                let users = data.success ? [...userList, data.user] : userList;
                let response = {
                    success: data.success,
                    users: users
                }
                dispatch({
                    type: REGISTER_USER,
                    payload: response
                })
            })
            .catch(err => console.log(err));
    }
}