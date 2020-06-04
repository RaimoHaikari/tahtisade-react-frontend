import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';


import tsLogo from '../assets/tahtisade-logo.svg';


function Nav(){

    return(
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark navbar-toggleable-md">

            <a className="navbar-brand" href="/">
                <img width="80" height="80" className="img-fluid pl-2 py-2" src={tsLogo} alt="Tähtisadetta" />
            </a>


            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav">

                <Link to="/about">About</Link>
                <Link to="/elokuvat">Elokuvat</Link>
                <Link to="/etusivu">T Y Ö N  A L L A</Link>

                </div>
            </div>

        </nav>
    )
}

export default Nav;
