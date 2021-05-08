import React  from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { set } from 'd3';

import './about.css';

/*
 * https://www.toptal.com/d3-js/towards-reusable-d3-js-charts
 */
const About = (props) => {


    return(

        <Container fluid>
            <Row className="mb-5">
                <Col sm={4} className="bg-A">
                    Liirum laarum harakka huttua keittää, hännällänsä hämmentää.
                </Col>
                <Col sm={4} className="bg-B">
                    Kielitoimiston sanakirjan mukaan sanalla "puppu" viitataan roskapuheeseen, pötyyn tai valeeseen
                </Col>
                <Col sm={4} className="bg-C">
                    Tuotettu osana Suomen elokuvasäätiön, AVEKin ja Ylen Yhden yön juttu -lyhytelokuvahanketta
                </Col>
            </Row>
            <Row>
                <Col className="bg-A col-12 col-sm-4">
                    Liirum laarum harakka huttua keittää, hännällänsä hämmentää.
                </Col>
                <Col className="bg-B col-12 col-sm-4">
                    Kielitoimiston sanakirjan mukaan sanalla "puppu" viitataan roskapuheeseen, pötyyn tai valeeseen
                </Col>
                <Col className="bg-C col-12 col-sm-4">
                    Tuotettu osana Suomen elokuvasäätiön, AVEKin ja Ylen Yhden yön juttu -lyhytelokuvahanketta
                </Col>
            </Row>
        </Container>
    )
}

export default About;