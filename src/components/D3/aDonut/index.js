import React, {useRef, useEffect, useState} from 'react';

import './aDonut.css';

import D3Donut from './d3Donut';

let vis;

/*
 *
 */
export default function ReactComponent({data, sata, options, handler}){

    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(500);
    const [cornerRadius, setCornerRadius] = useState(3);// sets how rounded the corners are on each slice
    const [padAngle, setPadAngle] = useState(0.015);    // effectively dictates the gap between slices
    const [variable, setVariable] = useState('Probability');    
    const [category, setCategory] = useState('Species');


    const refElement = useRef(null);

    function initVis() {
        
        if(data && data.length) {
            
            const d3Props = {
                data,
                width,
                height,
                cornerRadius,
                padAngle,
                variable,
                category
            };
            
            vis = new D3Donut(refElement.current, d3Props);
        }
        
    }

    const clickHanler = () => {

        const x = data.filter(d => d < 80)

        vis && vis.updateData(x)
    }

    useEffect(initVis, []);

    useEffect(() => {   

        if(sata){
            console.log("Data vaihtu")
            vis && vis.updateData(sata)
        }

    }, [sata]);

    return (
        <div className='reusable-donut'>

            <div ref={refElement}></div>

            <div>
                <button 
                    onClick={() => clickHanler()}
                >
                    Sisäinen 
                </button>
            </div>

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