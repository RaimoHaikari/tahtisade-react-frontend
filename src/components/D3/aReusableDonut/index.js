import React, {useRef, useEffect, useState} from 'react';
import {select} from "d3";

import './aReusableDonut.css';

import {updateableDonutChart}  from './updateableDonut'

let vis = null;

export default function ReactComponent({data, handler}){

    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(500);
    const [category, setCategory] = useState('val');
    const [cornerRadius, setCornerRadius] = useState(10);   // sets how rounded the corners are on each slice
    const [padAngle, setPadAngle] = useState(0.015);        // effectively dictates the gap between slices
    const [variable, setVariable] = useState('lkm');    
    const [transTime, setTranstime] = useState(750)


    const refElement = useRef(null);

    /*
     * Alustetaan d3 komponentti
     */ 
    function initVis() {
        
        vis = updateableDonutChart()
            .data(data)
            .height(height)
            .width(width)
            .cornerRadius(cornerRadius)
            .transTime(transTime)
            .padAngle(padAngle)
            .variable(variable)
            .category(category)
            .callBack((a) => handler(a))

        select(refElement.current)
            .call(vis)  
        
    }



    const updateDonut = () => {
        vis.data(data)
    }

    useEffect(() => {   

        if(data && data.length){

            if(vis === null)
                initVis()
            else
                updateDonut()
        }

    }, [data]);

    /*
            <div>
                <button 
                    onClick={() => handler()}
                >
                    Ulkoinen 
                </button>
            </div>
    */
    return (
        <div className='reusable-donut'>
            <div ref={refElement}></div>
        </div>
    )

};