import React from 'react';
import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './frontPageMovieCard.css';

/*
 * <FontAwesomeIcon icon="info-circle" size="3x" />

 
 */
const FrontPageMovieCard = ({id, nimi, kuva, iconClick}) => {

    const imgUrl = `http://www.tahtisadetta.fi/mongoDBImages/${kuva}`;

    const imgAlt = `Juliste: ${nimi}`

    return(
        
<div className="col-md fbCol">

    <div className="card fbCard">

        <div className="card-header bg-white">
            <FontAwesomeIcon
                onClick={() => iconClick(id)} 
                icon="info-circle" 
                size="2x" 
                style={{color: "red", margin: "2px"}}
            />
        </div>

        <div className="card-image">
            <Link to={`/elokuvat/${id}`}>
                <img src={imgUrl} alt={imgAlt} className="card-img-top" />
            </Link>
        </div>

    </div>

</div>

    )

}

export default FrontPageMovieCard;