import React from 'react';
import {Link} from 'react-router-dom';

import Rating from 'react-rating';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './moviesPageMovieCard.css';

/*
 * <div className="card mt-2 mr-2 mb-2 ml-2">
 */
const MoviesPageMovieCard = ({nimi, kuva, id, ensiIlta, avg}) => {

    const imgUrl = `http://www.tahtisadetta.fi/mongoDBImages/${kuva}`;
    const imgAlt = `Juliste: ${nimi}`
    

    const eiDate = new Date(ensiIlta);
    const strEI = `${eiDate.getDate()}.${eiDate.getMonth()+1}.${eiDate.getUTCFullYear()}`

    const visualizeStars = () => {

        let val = [];

        for(let i = 0; i < Math.floor(avg); i ++){
            val.push(<FontAwesomeIcon icon="star" size="2x"  style={{color: "navy", margin: "2px", background: "none"}}/>)
        }

        if(avg % 1 >= 0.5){
            val.push(<FontAwesomeIcon icon="star-half" size="2x"  style={{color: "navy", margin: "2px", background: "none"}}/>)
        }

        return val;

    }

    return(
        <Col lg={3} className="mb-5">
            <Card>
                <Card.Header className="text-truncate">{nimi}</Card.Header>
                <Card.Body>
                    <Image src={imgUrl} rounded fluid />
                    <Card.Text className="mt-2">
                        <span className="font-weight-bold mr-2">Ensi-ilta:</span>{strEI}
                    </Card.Text>
                    <Card.Text className="mt-2">
                        {visualizeStars()}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )   

}

export default MoviesPageMovieCard;