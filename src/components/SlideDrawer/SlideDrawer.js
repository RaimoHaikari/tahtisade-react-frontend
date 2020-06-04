import React from 'react';

import {Link} from 'react-router-dom';

import './slideDrawer.css';

const SlideDrawer = (props) => {

    let drawerClasses = 'slideDrawer';

    if(props.show) {
        drawerClasses = 'slideDrawer slideDrawerOpen';
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/elokuvat">Elokuvat</Link></li>
            </ul>
        </nav>
    );
}

export default SlideDrawer;