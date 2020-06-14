import React from "react";
import Popup from "reactjs-popup";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './popup.css';

/*
 */
const FrontPageMovieDetails = (props) => {

  const arrEI = props.ensiIlta.split('T')[0].split('-');

  const strDay = parseInt(arrEI[2], 10);
  const strMonth = parseInt(arrEI[1], 10);
  //
  const strEI = `${strDay}.${strMonth}.${arrEI[0]}` 

    return (
      <div className="fbModal">
        <header className="modalHeader"><h1>{props.title}</h1></header>
        <p>{`Ensi-ilta: ${strEI}`}</p>
      </div>

    )
}

export default FrontPageMovieDetails;
