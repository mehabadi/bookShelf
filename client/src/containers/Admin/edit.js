import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, clearBook, deleteBook } from '../../actions';

class EditBook extends PureComponent {

    state = {
        formdata: {
            _id: this.props.match.params.id,
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '',
            price: '',
            ownerId: ''
        }
    }

    componentWillMount = () => {
        this.props.getBook(this.state.formdata._id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formdata: nextProps.books.book
        });        
    }
    
    componentWillUnmount() {
        this.props.clearBook();
    }

    handleInput = (event, name) => {
        const newFormdata = {
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value;

        this.setState({
            formdata: newFormdata
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.updateBook(this.state.formdata);
    }

    deletePost = () => {
        const {_id } = this.state.formdata;
        this.props.deleteBook(_id);
    }

    redirectUser = () => {
        setTimeout( () => {
            this.props.history.push('/user/user-reviews')
        }, 1000)
    }

    render() {       
        let data = this.state.formdata;       
        return (
        <div className="rl_container article">
            {
                this.props.books.updateBook ? 
                    <div className="edit_confirm">
                        post updates, <Link to={`/books/${this.props.books.book._id}`}>
                            Click here to see your post
                        </Link>
                    </div>
                : null
            }
            {
                this.props.books.bookDeleted ? 
                    <div className="red_tag">
                        Post Deleted
                        {this.redirectUser()}
                    </div>
                : null
            }
            <form onSubmit={this.submitForm}>
                <h2>Edit a review</h2>
                <div className="form_element">
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={data.name}
                        onChange={ (event) => this.handleInput(event, 'name')}
                    />                    
                </div>
                <div className="form_element">                    
                    <input
                        type="text"
                        placeholder="Enter author"
                        value={data.author}
                        onChange={ (event) => this.handleInput(event, 'author')}
                        />                   
                </div>
                <div className="form_element">                    
                    <textarea
                        value={data.review}
                        onChange={ (event) => this.handleInput(event, 'review')}
                        />                  
                </div>
                <div className="form_element">                    
                    <input
                        type="number"
                        placeholder="Enter pages"
                        value={data.pages}
                        onChange={ (event) => this.handleInput(event, 'pages')}
                    />
                </div>
                <div className="form_element">                    
                    <select
                        value={data.rating}
                        onChange={ (event) => this.handleInput(event, 'rating')}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="form_element">                    
                    <input
                        type="number"
                        placeholder="Enter price"
                        value={data.price}
                        onChange={ (event) => this.handleInput(event, 'price')}
                    />
                </div>
                <button type="submit">Edit review</button>
                <div className="delete_post">
                    <div className="button"
                        onClick={this.deletePost}
                    >
                        Delete review
                    </div>
                </div>               
            </form>
        </div>
        )
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getBook,
        updateBook,
        deleteBook,
        clearBook
    }, dispatch);
}

const mapStateToProps = (state) => {   
    return {
        books: state.books
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);