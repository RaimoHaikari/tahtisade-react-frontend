import React, { useState, useEffect, useRef } from 'react';
import D3Component from './d3Component';

let vis = null; // independent d3 component

/*
 * https://medium.com/@stopyransky/react-hooks-and-d3-39be1d900fb
 */
export default function MyVisComponent() {

    const [data, setData] = useState(null);
    const [width, setWidth] = useState(300);
    const [height, setHeight] =  useState(300);
    const [active, setActive] = useState(null);
    
    const refElement = useRef(null);

    function fetchData() {
        Promise.resolve().then(() => setData(['a', 'b', 'c']));
    }

    function handleResizeEvent() {

        let resizeTimer;

        const handleResize = () => {
            clearTimeout(resizeTimer); 

            resizeTimer = setTimeout(function() {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
            }, 300);

        };  
    
        window.addEventListener("resize", handleResize);  
        
        return () => {
            window.removeEventListener("resize", handleResize);
        }     

    }

    function initVis() {

        if(data && data.length) {
          const d3Props = {
            data,
            width,
            height,
            onDatapointClick: setActive
          };
          vis = new D3Component(refElement.current, d3Props);
        }

    }

    function updateVisOnResize() {
        vis && vis.resize(width, height);
    }

    // 'component did mount' effect (notice empty brackets as second argument)
    useEffect(() => {
        // fetch data here, below is just mock.
        fetchData()
    }, []);

    useEffect(() => {  
        handleResizeEvent()
    }, []);

    // useEffect hook - creates new d3 component whenever data changes
    useEffect(() => {
        initVis()
    }, [ data ]);

    useEffect(() => {  
        updateVisOnResize()
    }, [ width, height ]);

    return (
        <div className='react-world'>
            <div>{active}</div>
            <div ref={refElement}/>
        </div>
    );

}