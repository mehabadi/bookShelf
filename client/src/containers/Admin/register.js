import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { getUsers, registerUser } from '../../actions'

class Register extends PureComponent {

    state = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        error: ''
    }

    componentWillMount = () => {
        this.props.getUsers();
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.user.register === false){
            this.setState({error: 'Error, try again'});
        }else{
            this.setState({
                name: '',
                lastname: '',
                email: '',
                password: '',
                error: ''
            })
        }
    }

    handleInputEmail = (event) => {
        this.setState({email: event.target.value})
    }
    handleInputPassword = (event) => {
        this.setState({password: event.target.value})
    }
    handleInputName = (event) => {
        this.setState({name: event.target.value})
    }
    handleInputLastname = (event) => {
        this.setState({lastname: event.target.value})
    }
    
    submitForm = (e) => {
        e.preventDefault();
        this.setState({error: ''});
        const { name, lastname, email, password } = this.state;
        this.props.registerUser({ name, lastname, email, password }, this.props.user.users);
    }

    showUsers = (user) => (
        user.users ? 
            user.users.map( item => (
                <tr key={item._id}>
                    <td>{item.name}</td>                   
                    <td>{item.lastname}</td>                   
                    <td>{item.email}</td>                   
                </tr>
            )) 
            :null
    )

    render() {       
        return (
        <div className="rl_container">
            <form onSubmit={this.submitForm}>
                <h2>Add User</h2>

                <div className="form_element">
                    <input 
                        type="text"
                        placeholder="Enter name"
                        value={this.state.name}
                        onChange={this.handleInputName}
                    />
                </div>
                
                <div className="form_element">
                    <input 
                        type="text"
                        placeholder="Enter lastname"
                        value={this.state.lastname}
                        onChange={this.handleInputLastname}
                    />
                </div>

                <div className="form_element">
                    <input 
                        type="text"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleInputEmail}
                    />
                </div>

                <div className="form_element">
                    <input 
                        type="text"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleInputPassword}
                    />
                </div>

                <button type="submit">Add user</button>
                <div className="error">
                    {this.state.error}
                </div>
            </form>
            <div className="current_users">
                <h4>Current users:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.showUsers(this.props.user)
                        }                       
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUsers,
        registerUser
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
