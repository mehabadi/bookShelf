import { 
    GET_BOOKS, 
    GET_BOOK,
    GET_BOOK_WITH_REVIEWER,
    CLEAR_BOOK_WITH_REVIEWER,
    ADD_BOOK,
    CLEAR_NEW_BOOK_FORM,
    UPDATE_BOOK,
    DELETE_BOOK,
    CLEAR_BOOK
} from '../actions/action_types';

const INITIAL_STATE = {
    books: {},
    book: {},
    reviewer: {},
    bookDeleted: false,
    updateBook: false
}

export default function(state = INITIAL_STATE, action){

    switch (action.type) {
        case GET_BOOKS:         
            return {...state, list: action.payload}
          
        case GET_BOOK:         
            return {...state, book: action.payload}
        
        case CLEAR_BOOK_WITH_REVIEWER:
        case GET_BOOK_WITH_REVIEWER:
            return {
                ...state, 
                book: action.payload.book,
                reviewer: action.payload.reviewer
            }
            
        case CLEAR_NEW_BOOK_FORM:
        case ADD_BOOK:        
            return { ...state , newbook: action.payload }
        
        case UPDATE_BOOK:
            return { 
                ...state, 
                updateBook: action.payload.success,
                book: action.payload.doc
            }
        
        case DELETE_BOOK:
            return { ...state, bookDeleted: action.payload }

        case CLEAR_BOOK:
            const { book, updateBook, bookDeleted } =  action.payload;
            return { ...state, book, updateBook, bookDeleted }    

        default:
           return state;
    }
}