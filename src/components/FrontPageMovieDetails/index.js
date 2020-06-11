import React from "react";
import Popup from "reactjs-popup";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './popup.css';

/*
 */
const FrontPageMovieDetails = (props) => {

    return (
      <div className="fbModal">
        <header className="modalHeader"><h1>{props.title}</h1></header>
        <section className="modalContent">
          {props.children}
        </section>
        <section className="modalContent">
          {props.canCancel && <button className="btn">Cancel</button>}
        </section>
      </div>

    )
}

export default FrontPageMovieDetails;
