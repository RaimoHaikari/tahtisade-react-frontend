import React, {useRef, useEffect, useState} from 'react';

import './reusableDonut.css';
import barChart from './reusable.js'

import {select, max} from "d3";

/*
 * var runningChart = barChart().barPadding(2);
    d3.select('#runningHistory')
            .datum(milesRun)
            .call(runningChart);
 */
const ReusableDonut = ({data, options}) => {

    const [runningChart, setRunningChart] = useState(null);

    const svgRef = useRef();

    const setupChart = (data) => {

        let a = barChart()
            .width(700)
            .data(data);

        select(svgRef.current)
            .call(a);

        return a

    }


    useEffect(() => {

        const x = setupChart(data)

        //drawChart(svgRef.current, data, options) 

    }, [data, options]);

    return(
        <div ref={svgRef} style={{ marginLeft: 10 }}></div>
    )
}

export default ReusableDonut;