import React, {useRef, useEffect, useState} from 'react';

import './basics.css';

import {select} from "d3";

const About = (props) => {

    const[data, setData] = useState([20, 30, 4, 60, 30]);

    const svgRef = useRef();

    useEffect(() => {
        console.log(svgRef)

        const svg = select(svgRef.current);

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

export default About;