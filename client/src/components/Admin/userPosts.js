import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserReviews } from '../../actions';
import moment from 'moment-js';
import { Link } from 'react-router-dom'

class UserPosts extends Component {

    componentWillMount = () => {        
        this.props.getUserReviews(this.props.user.login.id);
    }

    showUserPosts = (user) => {                  
        return user.reviews ? 
                user.reviews.map( (item, i) => (
                    <tr key={item._id}>
                        <td>
                            <Link to={`/user/edit-post/${item._id}`}>
                                {item.name}
                            </Link>
                        </td>
                        <td>{item.author}</td>
                        <td>
                            {moment(item.createdAt).format("MM/DD/YY")}
                        </td>
                    </tr>
                    )
                )
                : null;
    };
    
    render() {          
        return (
        <div className="user_posts">
            <h4>Your reviews:</h4>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    { this.showUserPosts(this.props.user)}
                </tbody>
            </table>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserReviews
    }, dispatch);
}

const mapStateToProps = (state) => {   
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);