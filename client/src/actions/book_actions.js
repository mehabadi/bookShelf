import axios from 'axios';
import { 
    GET_BOOKS, 
    GET_BOOK_WITH_REVIEWER, 
    CLEAR_BOOK_WITH_REVIEWER,
    ADD_BOOK,
    CLEAR_NEW_BOOK_FORM,
    GET_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
    CLEAR_BOOK
} from './action_types';


export const getBooks = (        
        start = 0,
        limit = 10,
        order = 'asc',
        list = null
    ) => {       
    const request = axios
                .get(`/api/book/all?skip=${start}&limit=${limit}&order=${order}`)
                .then(res => {
                    if(list){
                        return [...list, ...res.data]
                    }else{
                        return res.data
                    }                            
                })
                .catch(err => console.log(err));

    return {
        type: GET_BOOKS,
        payload: request
    }
}

export const getBookWithReviewer = (id) => {
    const request = axios.get(`/api/book?id=${id}`)
                        // .then(res => res.data)
                        // .catch(err => console.log(err));
    // return {
    //     type: GET_BOOK_WITH_REVIEWER,
    //     payload: request
    // }
    //REWRITE WITH
    //REDUX THUNK
    return (dispatch) => {
        request.then(({data}) => {
                    let book = data;
                    
                    axios.get(`/api/user/reviewer?id=${book.ownerId}`)
                        .then(({data}) => {
                            let response = {
                                book,
                                reviewer: data
                            }
                            dispatch({
                                type: GET_BOOK_WITH_REVIEWER,
                                payload: response
                            })
                        })
                        .catch(err => console.log(err));                    
                })
               .catch(err => console.log(err));
    }
}

export const clearBookWithReviewer = (id) => {
    return {
        type: CLEAR_BOOK_WITH_REVIEWER,
        payload: {
            book: {},
            reviewer: {}
        }
    }    
}

export const addBook = (book) => {

    return (dispatch) => {
        axios.post('/api/book', book)
            .then( ({data}) => {
                dispatch({
                    type: ADD_BOOK,
                    payload: data
                })
            })
            .catch(err => console.log(err));
    }
}

export const clearBookForm = (book) => {
    return {
        type: CLEAR_NEW_BOOK_FORM,
        payload: {}
    };
}

export const getBook = (id) => {
    return (dispatch) => {
        axios.get(`/api/book?id=${id}`)
        .then( ({data}) => {
            dispatch({
                type: GET_BOOK,
                payload: data
            })            
        })
        .catch(err => console.log(err));
    }    
}

export const updateBook = (book) => {
    return (dispatch) => {
        axios.post('/api/book/update', book)
             .then(({data}) => {
                dispatch({
                    type: UPDATE_BOOK,
                    payload: data
                })  
             })
             .catch(err => console.log(err));
    }
}

export const deleteBook = (id) => {
    return (dispatch) => {
        axios.delete(`/api/book?id=${id}`)
             .then(({data}) => {
                dispatch({
                    type: DELETE_BOOK,
                    payload: data
                })  
             })
             .catch(err => console.log(err));
    }
}

export const clearBook = () => {
    return {
        type: CLEAR_BOOK,
        payload: {
            book: null,
            updateBook: false,
            bookDeleted: false
        }
    }
}