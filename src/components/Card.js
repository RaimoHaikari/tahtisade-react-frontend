import React from 'react';
import {Link} from 'react-router-dom';

import img1 from '../assets/bamse.jpg'
import '../styles/cardStyles.css';


const Card = ({id, nimi, kuva}) => {

    return(

        <div className="card text-center">

            <div className="overflow">
                <img src={img1} alt="Dippaa daa" className="card-img-top" />
            </div>

            <div className="card-body text-dark">
                <h4 className="card-title">{nimi}</h4>
                <p className="card-text text-secondary">
                    Huikeeta settiä hei!
                </p>

                <Link to={`/elokuvat/${id}`}>Näytä tiedot</Link>



            </div>

        </div>

    )

}

export default Card;