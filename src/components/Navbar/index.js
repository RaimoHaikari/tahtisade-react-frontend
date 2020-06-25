import React from 'react';
import './navbar.css';

import Logo from "../Logo"

import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import Nav from "react-bootstrap/Nav";
import Navlink from "react-bootstrap/NavLink";

const Navigation = (props) => {

    return(
        <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
            <NavbarBrand href="/">
                <div className="toolbarLogo">
                    <Logo />
                </div>
            </NavbarBrand>
            <NavbarToggle aria-controls="basic-navbar-nav" />
            <NavbarCollapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Navlink href="/elokuvat">Elokuvat</Navlink>
                    <Navlink href="/genret">Genret</Navlink>
                    <Navlink href="/critics">Kriitikot</Navlink>
                    <Navlink href="/about">About</Navlink>
                </Nav>
            </NavbarCollapse>
        </Navbar>
    )
}

export default Navigation;