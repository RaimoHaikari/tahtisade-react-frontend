import React, {useRef, useEffect, useState} from 'react';

import './donut.css';

import {select, scaleOrdinal, pie, entries, arc} from "d3";

/*
0: Object { val: "Parempi", lkm: 3, ids: (3) […] }
​
1: Object { val: "Sama", lkm: 3, ids: (3) […] }
​
2: Object { val: "Huonompi", lkm: 6, ids: (6) […] }
 */

const Donut = ({osuudet}) => {

    const[data, setData] = useState([
        { val: "Parempi", lkm: 3, ids: [5,29,36]},
        { val: "Sama", lkm: 3, ids: [18,24,32]},
        { val: "Huonompi", lkm: 6, ids:[6,20,23,31,34,38] }
    ]);

    const width = 450;
    const height = 450;
    const margin = 40;

    // Piirakan säde
    const radius = Math.min(width, height) / 2 - margin;

    const svgRef = useRef();
 
    useEffect(() => {

        // Väriasteikko
        const color = scaleOrdinal()
            .domain(osuudet.map(o => o.val))
            .range(["green", "blue", "red"]);

        // kuinka aineisto jakaantuu piirakan sisään
        let aPie = pie()
            .value(function(d) {return d.lkm; })
            .sort(null);

        let dataReady = aPie(osuudet);
        
        let svg = select(svgRef.current)
                .attr("viewBox", `0 0 ${width} ${height}`)
                .attr("width", "100%");

        let g = svg
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            
        let slices = g
            .selectAll('whatEver')
            .data(dataReady);
        
        slices
            .enter()
            .append('path')
                .attr('d', arc()
                    .innerRadius(100)
                    .outerRadius(radius)
                )
                .attr('fill', d => color(d.data.val))
                .attr("stroke", "black")
                .style("stroke-width","2px")
                .style("opacity", 0.7)


    }, [osuudet]);

    /*
     *
     */
    return(
        <>
            <svg ref={svgRef}>
            </svg>
        </>
    )
}

export default Donut;