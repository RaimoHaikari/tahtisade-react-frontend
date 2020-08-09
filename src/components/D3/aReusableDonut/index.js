import React, {useRef, useEffect, useState} from 'react';

import './aReusableDonut.css';

import ReusableD3Donut from './aReusableDonut';

let vis;

/*

         width,
        height,
        margin = {top: 10, right: 10, bottom: 10, left: 10},
        colour = d3.scaleOrdinal(d3.schemeCategory20c), // colour scheme
        variable, // value in data that will dictate proportions on chart
        category, // compare data by
        padAngle, // effectively dictates the gap between slices
        transTime, // transition time
        updateData,
        floatFormat = d3.format('.4r'),
        cornerRadius, // sets how rounded the corners are on each slice
        percentFormat = d3.format(',.2%');


 */
export default function ReactComponent({data, sata, options, handler}){

    const [width, setWidth] = useState(960);
    const [height, setHeight] = useState(500);
    const [cornerRadius, setCornerRadius] = useState(10);// sets how rounded the corners are on each slice
    const [padAngle, setPadAngle] = useState(0.015);    // effectively dictates the gap between slices
    const [variable, setVariable] = useState('Probability');    
    const [category, setCategory] = useState('Species');
    const [transTime, setTranstime] = useState(750)


    const refElement = useRef(null);

    /*
     * Alustetaan d3 komponentti
     */ 
    function initVis() {
        
        if(data && data.length) {
            
            const d3Props = {
                data,
                width,
                height,
                cornerRadius,
                padAngle,
                transTime,
                variable,
                category
            };
            
            vis = new ReusableD3Donut(refElement.current, d3Props);
        }
        
    }

    const clickHanler = () => {

        const x = data.filter(d => d < 80)

        vis && vis.updateData(x)
    }

    useEffect(initVis, []);

    useEffect(() => {   

        if(sata){
            vis && vis.updateData(sata)
        }

    }, [sata]);

    return (
        <div className='reusable-donut'>

            <div ref={refElement}></div>

            <div>
                <button 
                    onClick={() => handler()}
                >
                    Ulkoinen 
                </button>
            </div>

        </div>
    )

};