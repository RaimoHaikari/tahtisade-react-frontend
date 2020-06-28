import React from 'react';

import SettingsHolder from "./layout/Accordion";
import Settings from "./components/CriticsListPage/Settings"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import './App.css';
import About from './components/About';

import Movies from './layout/Movies/Movies';
/*

import Movies from './layout/Movies/Movies';
import Genres from './layout/Genres'
import Critics from './layout/Critics'
import Elokuva from './components/Elokuva';


import FrontPage from './layout/FrontPage/index';
// import Toolbar from './components/Toolbar/Toolbar';
import Navigation from './components/Navbar'


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SlideDrawer from './components/SlideDrawer/SlideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
*/


const FooBar = (props) => {

    return (
        
        <Container fluid>
            <Row>

                <Col xs={2}>
                    <SettingsHolder>
                        <Settings />
                    </SettingsHolder>
                </Col>

                <Col>
                </Col>
            </Row>
        </Container>
    
    );
}

export default FooBar;