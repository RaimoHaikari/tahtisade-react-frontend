import React from "react";

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
        { name: "Tähdet", field: "starsAverage", sortable: true },
        { name: "Lähde", field: "numbOfRevies", sortable: true }
    ];

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
                                onSorting = {() => console.log("tilu lilu")}
                                headers={headers}
                            />

                            <tbody>
                                {
                                    props.arvostelut.map((item, index) => {
                                        return(
                                            <tr key={index}>
                                                <th scope="row1">
                                                    {index + 1}
                                                </th>
                                                <td>{item.name}</td>
                                                <td>{item.stars}</td>
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
