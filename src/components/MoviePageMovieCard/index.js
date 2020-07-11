import React, {useState, useEffect, useMemo} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

import {TableHeader, Pagination, Search} from '../DT'


import './moviePageMovieCard.css';

/*
 * Tulostetetaan aktiivisen elokuvan tiedot
 */
const MoviePageMovieCard = (props) => {

    const {nimi, kuva, nayttelijat, paiva, ensiIlta, imdb, kavi} = props;

    const imgUrl = `http://www.tahtisadetta.fi/mongoDBImages/${kuva}`;
    const imgAlt = `Juliste: ${nimi}`

    const eiDate = new Date(ensiIlta);
    const strEI = `${paiva} ${eiDate.getDate()}.${eiDate.getMonth()+1}.${eiDate.getUTCFullYear()}`

    const imdbLink = `https://www.imdb.com/title/${imdb}`;
    const kaviLink = `https://elonet.finna.fi/Record/${kavi}`

    const headers = [
        { name: "No#", field: "no", sortable: false },
        { name: "Nimi", field: "name", sortable: true },
        { name: "Tähdet", field: "stars", sortable: true },
        { name: "Lähde", field: "publisher", sortable: true }
    ];

    const [sorting, setSorting] = useState({field: "", order: "asc"})

    const getActors = (role) => {

        return (
            <ul className="moviePageMovieCard-ul">

                {
                    props[role].map((n, index) => {

                        let tmpNimi = role==="genret"?n.genre:n.nimi;
                        //tmpNimi = index===0?tmpNimi:`, ${tmpNimi}`;

                        return (
                            <li className="moviePageMovieCard-li" key={index}>
                                {tmpNimi}
                            </li>
                        )
                    })
                }

            </ul>
        )
    }


    /* 
     * Tulostettavan aineiston suodatus
     *
     * useMemo
     * - Pitäisi jotenkin nopeuttaa isojen aineistojen käsittelyä 
     * - toimii cachena
     */
    const reviewsData = useMemo(() => {

        let computedReviews = props.arvostelut;

        // Lajittelu
        if(sorting.field){

            const reversed = sorting.order === "asc" ? 1 : -1;

            computedReviews = computedReviews.sort((a,b) => {

                console.log(a)

                let val;

                switch (sorting.field) {
                    case "name":
                    case "publisher":
                      val = reversed * a[sorting.field].localeCompare(b[sorting.field])
                      break;
                    default:
                        val =  reversed * ((a[sorting.field] > b[sorting.field]) ? 1 : (a[sorting.field] < b[sorting.field]) ? -1 : 0)
                  }

                return(val)
            })

        }

        return computedReviews;

    }, [props.arvostelut, sorting]);


    const visualizeStars = (stars) => {

        let val = [];

        for(let i = 0; i < Math.floor(stars); i ++){
            val.push(<FontAwesomeIcon key={i} icon="star" style={{color: "navy", margin: "2px", background: "none"}}/>)
        }

        if(stars % 1 >= 0.5){
            val.push(<FontAwesomeIcon  key={6} icon="star-half"  style={{color: "navy", margin: "2px", background: "none"}}/>)
        }

        return val;

    }


    return (

        <Row className="moviePageMovieCard-row">

            <Col className="moviePageMovieCard-col">
                <Image alt={imgAlt} src={imgUrl} fluid rounded />
            </Col>

            <Col className="moviePageMovieCard-col" xs={8}>

                <Row className="moviePageMovieCard-dataRow">
                    <Col className="moviePageMovieCard-dataCol">
                        <h3>{nimi}</h3>
                    </Col>                   
                </Row>


                <Row className="moviePageMovieCard-dataRow">
                    <Col className="moviePageMovieCard-dataCol">
                        <strong>Ohjaus:</strong>
                    </Col>
                    <Col className="moviePageMovieCard-dataCol" xs={10}>
                        {getActors("ohjaajat")}
                    </Col>                   
                </Row>


                <Row className="moviePageMovieCard-dataRow">
                    <Col className="moviePageMovieCard-dataCol">
                        <strong>Näyttälijät:</strong>
                    </Col>
                    <Col className="moviePageMovieCard-dataCol" xs={10}>
                        {getActors("nayttelijat")}
                    </Col>                   
                </Row>

                <Row className="moviePageMovieCard-dataRow">
                    <Col className="moviePageMovieCard-dataCol">
                        <strong>Jakelija:</strong>
                    </Col>
                    <Col className="moviePageMovieCard-dataCol" xs={10}>
                        {getActors("jakelijat")}
                    </Col>                   
                </Row>     


                <Row className="moviePageMovieCard-dataRow">
                    <Col className="moviePageMovieCard-dataCol">
                        <strong>Genret:</strong>
                    </Col>
                    <Col className="moviePageMovieCard-dataCol" xs={10}>
                        {getActors("genret")}
                    </Col>                   
                </Row>   

                <Row className="moviePageMovieCard-dataRow">
                    <Col className="moviePageMovieCard-dataCol">
                        <strong>Ensi-ilta:</strong>
                    </Col>
                    <Col className="moviePageMovieCard-dataCol" xs={10}>
                        {strEI}
                    </Col>                   
                </Row>  

                <Row className="moviePageMovieCard-dataRow">
                    <Col className="moviePageMovieCard-dataCol">
                        <strong>Lisätietoa:</strong>
                    </Col>
                    <Col className="moviePageMovieCard-dataCol" xs={10}>
                        <Badge className="moviePageMovieCard-badge" variant="info">
                            <a href={imdbLink} target="_blank">IMDb</a>
                        </Badge>
                        <Badge className="moviePageMovieCard-badge" variant="info">
                            <a href={kaviLink} target="_blank">Elonet</a>
                        </Badge>                       
                    </Col>                   
                </Row>   

                <Row className="moviePageMovieCard-dataRow mt-3 mb-3">
                    <Col className="moviePageMovieCard-dataCol">
                        <h4>Arvostelut</h4>
                    </Col>                   
                </Row>   

                <Row className="moviePageMovieCard-dataRow">
                    <Col className="moviePageMovieCard-dataCol">

                        <Table striped bordered hover>

                            <TableHeader
                                onSorting = {(field, order) => setSorting({field, order})}
                                headers={headers}
                            />

                            <tbody>
                                {
                                    reviewsData.map((item, index) => {
                                        return(
                                            <tr key={index}>
                                                <th scope="row1">
                                                    {index + 1}
                                                </th>
                                                <td>{item.name}</td>
                                                <td>{visualizeStars(item.stars)}</td>
                                                <td>{item.link}</td>
                                            </tr>
                                        )
                                    })
                                }                       
                            </tbody>    

                        </Table>

                    </Col>                   
                </Row>                

            </Col>

        </Row>
    )
}

/*
                             {

*/

export default MoviePageMovieCard;
