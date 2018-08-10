import {
    USER_LOGIN, 
    USER_AUTH,
    GET_USER_REVIEWS,
    GET_USERS,
    REGISTER_USER
} from '../actions/action_types';

const INITIAL_STATE = {
    login: null,
    reviews: null
}

export default function(state = INITIAL_STATE, action){

    switch (action.type) {
        case USER_LOGIN:
            return {...state, login: action.payload};
    
        case USER_AUTH:           
            return {...state, login: action.payload};
        
        case GET_USER_REVIEWS:        
            return {...state, reviews: action.payload}
        
        case GET_USERS:
            return { ...state, users: action.payload }
        
        case REGISTER_USER:
            return { 
                ...state,
                register: action.payload.success, 
                users: action.payload.users
            }

        default:
            return state;        
    }
    
}; 