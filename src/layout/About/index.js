import React, {useState} from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ADonut from "../../components/D3/aDonut"
import AReusableDonut from "../../components/D3/aReusableDonut";

import { set } from 'd3';

/*
 * https://www.toptal.com/d3-js/towards-reusable-d3-js-charts
 */
const About = (props) => {

    const sSata = [
        {Species: "Halobacillus halophilus", Probability: 0.10069108308662117, Error: 0.045296463390387814},
        {Species: "Staphylococcus epidermidis", Probability: 0.04076903848429238, Error: 0.0096463390387814},
        {Species: "Chromobacterium violaceum", Probability: 0.10318269548054262, Error: 0.03390387814},
        {Species: "Pseudomonas TKP", Probability: 0.05880239155316942, Error: 0.0045296463390387745},
        {Species: "Bacillus subtilis", Probability: 0.1908578484310064, Error: 0.0765387676},
        {Species: "Pseudomonas fluorescens", Probability: 0.10663641563053275, Error: 0.0045296463390387676},
        {Species: "Micrococcus luteus", Probability: 0.04523420524963677, Error: 0.006463390387814},
        {Species: "Pseudoalteromonas SM9913", Probability: 0.08033880363132218, Error: 0.05296463390387814},
        {Species: "Escherichia coli", Probability: 0.2736142561673217, Error: 0.100646339038795},
    ]

    const kSata = [
        {Species: "Halobacillus halophilus", Probability: 0.1908578484310064, Error: 0.045296463390387814},
        {Species: "Staphylococcus epidermidis", Probability: 0.2014657031774047, Error: 0.0096463390387814},
        {Species: "Chromobacterium violaceum", Probability: 0.08033880363132218, Error: 0.03390387814},
        {Species: "Pseudomonas TKP", Probability: 0.05880239155316942, Error: 0.0045296463390387745},
        {Species: "Bacillus subtilis", Probability:0.10069108308662117, Error: 0.0765387676},
        {Species: "Pseudomonas fluorescens", Probability: 0.10663641563053275, Error: 0.0045296463390387676},
        {Species: "Micrococcus luteus", Probability: 0.04523420524963677, Error: 0.006463390387814},
        {Species: "Pseudoalteromonas SM9913", Probability: 0.10318269548054262, Error: 0.05296463390387814},
        {Species: "Enterococcus faecalis", Probability: 0.07214855298991701, Error: 0.0077390387814},
        {Species: "Escherichia coli", Probability: 0.04076903848429238, Error: 0.100646339038795},
    ]

    const milesRun = [2,5,4,1,2,6,5];
    const runningOptions = {arPadding: 2}

    const highTemperatures = [77, 71, 82, 87, 84, 78, 80, 84, 86, 72, 71, 68];
    const weatherOptions = {fillColor: 'coral'};

    const [data, setData] = useState(milesRun);
    const [sata, setSata] = useState(null);
    

    const clickHanler = () => {
        setSata(kSata)
    }

    /*
        <ADonut
            handler = {clickHanler}
            //data = {highTemperatures}
            //options = {weatherOptions}
            sata = {sata}
            data = {sSata}
            options = {runningOptions}
        />   

    */
    return(

        <Container fluid>
            <Row>
                <Col>
                    <AReusableDonut
                        handler = {clickHanler}
                        //data = {highTemperatures}
                        //options = {weatherOptions}
                        sata = {sata}
                        data = {sSata}
                        options = {runningOptions}
                    />   
                </Col>
            </Row>
        </Container>
    )
}

export default About;