import React from 'react';

import {Link} from 'react-router-dom';
// import tsLogo from '../assets/tahtisade-logo.svg';
// import { ReactComponent as Logo } from '../../assets/tahtisade-logo.svg';


//import '../components/SlideDrawer/DrawerToggleButton';
import './toolbar.css';
import DrawerToggleButton from '../SlideDrawer/DrawerToggleButton';
import Logo from '../Logo'

const Toolbar = (props) => {

    return (
        <header className="toolbar"> 
            <nav className="toolbarNavigation">
                
                <div className="toolbarToggleButton">
                    <DrawerToggleButton click={props.drawerClickHandler} />
                </div>

                <div className="toolbarLogo">
                    <a href="/">
                        <Logo />
                    </a>
                </div>
                
                <div className="spacer" />

                <div className="toolbarNavigationItems">
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/elokuvat">Elokuvat</Link></li>
                    </ul>
                </div>

            </nav>
        </header>
    );
}

export default Toolbar;
