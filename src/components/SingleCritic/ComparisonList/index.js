import React from 'react';

import './comparisonList.css';

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
/*
 *
 */
const ComparisonList = ({data, clickHandler}) => {


    /*
     *
     */
    return(
        <ListGroup>
            {
                data.map(d => {
                    let shared = d.count===1?`${d.count} yhteinen arvostelu`:`${d.count} yhteistä arvostelua`;
                    let cName = (d.active!==true)?"tahtisade-criticPage-list-group-item":"tahtisade-criticPage-list-group-item tahtisade-criticPage-list-group-itemActive";

                    return (
                    <ListGroup.Item 
                        key={d.id}
                        onClick={() => clickHandler(d.id)}
                        className={cName}
                    >
                        {d.name} 
                        <br />
                        <small className="tahtisade-criticPage-text-muted">{shared}</small>

                    </ListGroup.Item>
                    )
                })
            }
        </ListGroup>
    )
}

export default ComparisonList;