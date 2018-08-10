import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { getBookWithReviewer, clearBookWithReviewer } from '../../actions'

class BookView extends Component {

    componentWillMount = () => {        
        this.props.getBookWithReviewer(this.props.match.params.id);
    }
    
    componentWillUnmount() {
        this.props.clearBookWithReviewer();
    }
    renderBook = (books) => {
        const { book, reviewer } = books;
        return book ? 
            <div className="br_container">
                <div className="br_header">
                    <h2>{book.name}</h2>
                    <h5>{book.author}</h5>
                    <div className="br_reviewer">
                        <span>Review by:</span> {reviewer.name} {reviewer.lastname}
                    </div>
                </div>
                <div className="br_review">
                    {book.review}
                </div>
                <div className="br_box">
                    <div className="left">  
                        <div>
                            <span>Pages:</span> {book.pages}
                        </div>
                        <div>
                            <span>Price:</span> {book.price}
                        </div>
                    </div>
                    <div className="right">
                        <span>Rating:</span> 
                        <div>{book.rating}</div>
                    </div>
                </div>
            </div>
        : null;
    }
    render() {           
        return (
        <div>
            {this.renderBook(this.props.books)}
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getBookWithReviewer,
        clearBookWithReviewer
    }, dispatch);
}   

const mapStateToProps = ( state ) => {
    return {
        books: state.books
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookView);