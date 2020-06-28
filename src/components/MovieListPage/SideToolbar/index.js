import React, {useState, useRef} from 'react';

import Chevron from "./Chevron";

import './sideToolbar.css';
import './chkbox.css';


const SideToolbar = ({title, data, click, toggleClick, btnClick}) => {

    const [activeState, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion_icon")

    const content = useRef(null);

    function toggleAccordion() {
        setActiveState(activeState === "" ? "active": "");
        setHeightState(activeState === "active" ? "0px" : `${content.current.scrollHeight}px`)
        setRotateState(activeState==="active" ? "accordion_icon" : "accordion_icon rotate");
    }


    return (

        <div className="accordion_section">

            <button onClick={toggleAccordion} className={`st-accordion ${activeState}`}>
                <p className="accordion_title">
                    {title}
                </p>
                <Chevron 
                    className={`${setRotate}`}
                    width={10} 
                    fill={"#777"}
                />
            </button>

            <div ref={content} style={{maxHeight: `${setHeight}`}} className="accordion_content">

                <div className="actionBtnContainer">
                    <button className="gListBtn" onClick={() => toggleClick(true)}>Valitse kaikki</button>
                    <button className="gListBtn" onClick={() => toggleClick(false)}>Tyhjennä valinnat</button>
                </div>

                <hr />

                <div className="gListContainer">
                    {
                        data.genres.map((d,i) => {
                            return (

                                <label key={d.id} className="gListItem">{d.name}
                                    <input  onChange={() => click(d.id)} type="checkbox" checked={d.active} />
                                    <span className="checkmark"></span>
                                </label>

                            )
                        })
                    }
                </div>

                <hr />

                <div className="actionBtnContainer">
                    <button onClick={() => btnClick()} type="button" className="block">Päivitä lista</button>
                </div>               

            </div>
        </div>
    );
}

/*
<label class="container">One
  <input type="checkbox" checked="checked">
  <span class="checkmark"></span>
</label>
*/

export default SideToolbar;