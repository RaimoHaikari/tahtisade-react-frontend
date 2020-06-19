import React from 'react';
import {Link} from 'react-router-dom';

import './moviesPageMovieCard.css';

/*
 * <div className="card mt-2 mr-2 mb-2 ml-2">
 */
const MoviesPageMovieCard = ({nimi, kuva, id, ensiIlta}) => {

    const imgUrl = `http://www.tahtisadetta.fi/mongoDBImages/${kuva}`;
    const imgAlt = `Juliste: ${nimi}`
    

    const eiDate = new Date(ensiIlta);
    const strEI = `${eiDate.getDate()}.${eiDate.getMonth()+1}.${eiDate.getUTCFullYear()}`

    return(
        <div className="col-lg-3 mb-5">

            <div className="card">

                <div className="card-header text-truncate">
                    {nimi}
                </div>

                <div className="card-body">
                    <div className="card-image">
                        <Link to={`/elokuvat/${id}`}>
                            <img src={imgUrl} alt={imgAlt} className="card-img-top" />
                        </Link>
                    </div>

                    <p className="card-text mt-2">
                        <span className="font-weight-bold mr-2">Ensi-ilta:</span>{strEI}
                    </p>

                </div>

            </div>       
        
        </div>

    )

}

export default MoviesPageMovieCard;