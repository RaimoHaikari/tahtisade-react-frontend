import React from 'react';
import {Link} from 'react-router-dom';

import '../styles/cardStyles.css';


const Card = ({id, nimi, kuva}) => {

    const imgUrl = `http://www.tahtisadetta.fi/mongoDBImages/${kuva}`;

    return(

        <div className="card text-center mb-3">

            <div className="overflow">
                <img src={imgUrl} alt="Dippaa daa" className="card-img-top" />
            </div>

            <div className="card-body text-dark">
                <h4 className="card-title">{nimi}</h4>


                <Link to={`/elokuvat/${id}`}>Näytä tiedot</Link>



            </div>

        </div>

    )

}

export default Card;