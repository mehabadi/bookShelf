import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getBooks } from '../actions';
import BookItem from '../widgetsUI/book_item'

class HomeContainer extends Component {

  state = {       
    amount: 1
  }

  componentWillMount(){
    this.requestForData(0, this.state.amount, null);
  }

  requestForData = (start, end, list) => {    
    this.props.getBooks(start,end,'desc', list);
  }

  loadmore = () => {
    let count = this.props.books.list.length;   
    this.requestForData(count, this.state.amount, this.props.books.list);
  }

  renderItems = (books) => {
    return books.list ? 
      books.list.map((item, i) => (
          <BookItem {...item} key={item._id}/>
        )
      )
    : null;
  }

  render() {      
    return (
      <div>
        {this.renderItems(this.props.books)}
        <div 
          className="loadmore"
          onClick={this.loadmore}
        >Load More</div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getBooks: getBooks
  }, dispatch);
}

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)