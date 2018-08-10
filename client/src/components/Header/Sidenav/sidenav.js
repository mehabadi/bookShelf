import React from 'react';
import SideNav from 'react-simple-sidenav';

import SidenavItems from './sidenav_items'

const Nav = (props) => {
    return (
        <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}   
            onShowNav={props.onShowNav}         
            navStyle={{
                background:'#242424',
                maxWidth: '200px'
            }}
        >
            <SidenavItems onClick={props.onHideNav} />
        </SideNav>
    )
}

export default Nav
