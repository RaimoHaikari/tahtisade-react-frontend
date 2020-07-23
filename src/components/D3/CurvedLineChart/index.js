import React, {useRef, useEffect, useState} from 'react';

import './curvedLineChart.css';

import {select, line, curveCardinal} from "d3";

const CurvedLineChart = (props) => {

    const[data, setData] = useState([20, 30, 4, 60, 30, 20, 60, 75]);

    const svgRef = useRef();

    useEffect(() => {
        console.log(svgRef)

        const svg = select(svgRef.current);

        const myLine = line()
                        .x((value, index) => index * 50)
                        .y((value) => 150 - value)
                        .curve(curveCardinal)


        svg
            .selectAll("path")
            .data([data])
            .join("path")
                .attr("d", val => myLine(val))
                .attr("fill", "none")
                .attr("stroke", "blue")

        /*
        svg
            .selectAll("circle")
            .data(data)
            .join(
                enter => enter
                    .append("circle")
                    .attr("class", "new"),
                update => update
                    .attr("class", "updated"),
                exit => exit.remove()
            )
            .attr("r", value => value)
            .attr("cy", value => value * 3)
            .attr("cx", value => value * 2)
            .attr("stroke","red")
        */

    }, [data]);

    return(
        <>
            <svg ref={svgRef}></svg>
            <hr />
            <button
                onClick={() => setData(data.map(value => value * 2))}
            >
                Päivitä
            </button>
            <button
                onClick={() => setData(data.filter(value => value < 35))}
            >
                Filter
            </button>            
        </>
    )
}

export default CurvedLineChart;