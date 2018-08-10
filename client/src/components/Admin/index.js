import React from 'react';

const User = (props) => {    
    if(!props.user.login){
        return <div></div>
    }
    const { name, lastname, email } = props.user.login;
    return (
        <div className="user_container">
            <div className="avatar">
                <img alt="avatar" src="/images/avatar.png"/>
            </div>
            <div className="nfo">
                <div><span>Name:</span> {name}</div>
                <div><span>Lastname:</span> {lastname}</div>
                <div><span>Email:</span> {email}</div>
            </div>
        </div>
    )
}

export default User
