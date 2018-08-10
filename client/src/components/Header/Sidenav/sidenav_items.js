import React from 'react';
import { Link } from 'react-router-dom';
import Fontawesome from 'react-fontawesome';
import { connect } from 'react-redux'

const SidenavItems = (props) => {

    const items = [
        {
            type: 'navItem',
            icon: 'home',
            text: 'Home',
            link: '/',
            restricted: false
        }, 
        {       
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My profile',
            link: '/user',
            restricted: true
        },        
        {       
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add Admins',
            link: '/user/register',
            restricted: true
        },   
        {       
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Login',
            link: '/login',
            restricted: false,
            exclude: true
        },      
        {       
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My reviews',
            link: '/user/user-reviews',
            restricted: true
        },      
        {       
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add review',
            link: '/user/add-review',
            restricted: true
        },    
        {       
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Logout',
            link: '/user/logout',
            restricted: true
        }  
    ];

    const element = (item, i) => (
        <div key={i} className={item.type} onClick={props.onClick}>
            <Link to={item.link} >
                <Fontawesome name={item.icon} />
                {item.text}
            </Link>
        </div>
    )

    const showItems = () => (
        props.user.login ?
            items.map((item, i)=>{
                if(props.user.login.isAuth){
                    //restricted = true
                    return !item.exclude ? 
                            element(item, i)
                            : null
                }else{
                    //restricted: false
                    return !item.restricted ? element(item, i) :null
                }
                
                // return           
            })
        : null
    )
    
    return (
        <div>
            {showItems()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(SidenavItems)
