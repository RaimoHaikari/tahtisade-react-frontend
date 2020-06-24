import React from 'react';
import './navbar.css';

import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import Nav from "react-bootstrap/Nav";
import Navlink from "react-bootstrap/NavLink";

/*
         <Sivupohja>
            Hei
        </Sivupohja>
 */
const Navigation = (props) => {

    return(
        <Navbar bg="light" expand="lg">
            <NavbarBrand href="/">
                React-Bootstrap
            </NavbarBrand>
            <NavbarToggle aria-controls="basic-navbar-nav" />
            <NavbarCollapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Navlink href="/">Home</Navlink>
                    <Navlink href="/elokuvat">Elokuvat</Navlink>
                    <Navlink href="/genret">Genret</Navlink>
                    <Navlink href="/about">About</Navlink>
                </Nav>
            </NavbarCollapse>
        </Navbar>
    )
}

export default Navigation;