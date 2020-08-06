import React, {useRef, useEffect, useState} from 'react';

import './barChart.css';
import {select, axisBottom, axisRight, scaleLinear, scaleBand, entries} from "d3";

const BarChart = ({data}) => {

    const width = 300;
    const height = 150;
    const margin = 20;
    const tooltipMargin = 5;

    const useResizeObserver = ref => {
        const [dimensions, setDimensions] = useState(null);

        useEffect(() => {

            const observeTarget = ref.current;
            const resizeObserver = new ResizeObserver(entries => {
                // ... ei ole ku yksi
                entries.forEach(entry => {
                    setDimensions(entry.contentRect)
                })
            })

            resizeObserver.observe(observeTarget);

            return () => {
                resizeObserver.unobserve(observeTarget)
            }

        }, [ref])

        return dimensions
    }

    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    /*
     * -
     */
    useEffect(() => {
    
        if(!dimensions)
            return;

        console.log(dimensions.height)

        let svg = select(svgRef.current)
                .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
                .attr("width", "100%");

        const xScale = scaleBand()
            .domain(data.map((val, index) => index))
            //.range([0, (width-margin)])
            .range([0, (dimensions.width-margin)])
            .padding(0.3)

        const yScale = scaleLinear()
            .domain([0, (dimensions.height-margin)])
            .range([(dimensions.height-margin), 0])

        const colorScale = scaleLinear()
            .domain([((height-margin)/2), 100, (height-margin)])
            .range(["green","orange", "red"])
            .clamp(true)

        const xAxis = axisBottom(xScale)
            .ticks(data.length)
            .tickFormat(index => index)

        svg
            .select(".x-axis")
            .style("transform",`translateY(${dimensions.height-margin}px)`)
            .call(xAxis);

        const yAxis = axisRight(yScale);

        svg
            .select(".y-axis")
            .style("transform", `translatex(${dimensions.width-margin}px)`)
            .call(yAxis)

        /*
         * - scale(1,-1) & -(height-margin) jotta animointi sulavaa (piirto ylhäältä alas...)
         */
        svg
            .selectAll(".bar")
            .data(data)
            .join("rect")
                .attr("class", "bar")
                .style("transform","scale(1,-1)")
                .attr("x", (val, index) => xScale(index))
                .attr("y", -(dimensions.height-margin))
                .attr("width", xScale.bandwidth())
            .on("mouseenter", (value, index) => {
                svg
                    .selectAll(".d3Tooltip")
                    .data([value])
                    .join("text")
                        .attr("class", "d3Tooltip")
                        .text(value)
                        .attr("x", xScale(index) +  xScale.bandwidth()/2) // huom. viittaa mouseenter index arvoon
                        .attr("y",  yScale(value) - tooltipMargin)
                        .attr("text-anchor", "middle")

            })
            .on("mouseleave", () => svg.select(".d3Tooltip").remove())
            .transition()
                .attr("height", value => (dimensions.height-margin) - yScale(value))
                .attr("fill", colorScale)


    }, [data,dimensions]);

    return(
        <>
        <div  ref={wrapperRef} className="wrapperDiv">
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
        </div>
        <div>
            <button
                onClick={() => console.log("Tilu lilu")}
            >
                Päivitä
            </button>
            <button
                onClick={() => console.log("Tilu lilu")}
            >
                Filter
            </button>       
            <button
                onClick={() => {
                    console.log("Tilu lilu")
                }}
            >
                Add
            </button> 
        </div>
        </>
    )
}

/*
 setData(data.map(value => value * 1.1))
 setData(data.filter(value => value < 35))
 setData(data.concat(Math.floor(Math.random() * 100) + 1))
 */

export default BarChart;