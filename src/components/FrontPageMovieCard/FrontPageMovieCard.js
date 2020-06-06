import React from 'react';
import {Link} from 'react-router-dom';

import './frontPageMovieCard.css';

/*
 *
 */
const FrontPageMovieCard = ({id, nimi, kuva}) => {

    const imgUrl = `http://www.tahtisadetta.fi/mongoDBImages/${kuva}`;

    console.log(imgUrl)

    return(
<div className="card">

    <div className="card-image">
        <Link to={`/elokuvat/${id}`}>
            <img src={imgUrl} alt="Dippaa daa" className="card-img-top" />
        </Link>
    </div>


    <div className="card-body text-dark">
        <h4 className="card-title">{nimi}</h4>
        <Link to={`/elokuvat/${id}`}>Näytä tiedot</Link>
    </div>

</div>
    )

}

export default FrontPageMovieCard;