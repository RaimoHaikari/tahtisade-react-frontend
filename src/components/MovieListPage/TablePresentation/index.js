import React from 'react';
import './tablePresentation.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import {TableHeader, Pagination, Search} from '../../DT';

/*
 * @movies: suodatetut elokuvat 
 *          (huomio millä sivulla ollaan, joten pienempi kuin suodatetut elokuvat kaikkiaan)
 * 
 * @itemsOverAll: monenko elokuvan tiedot kaikenkaikkiaan on 
 * @totalItems: hakuehdot täyttävien elokuvien kokonaismmäärä
 * @itemsPerPage: aktiivisella sivulla näytettäven elokuvien kokonaismäärä
 * 
 */
const TablePresentation = (
    {movies, itemsOverAll, totalItems, itemsPerPage, currentPage, onSorting, search, setSearch, setCurrentPage}
    ) => {

    const headers = [
        { name: "No#", field: "no", sortable: false },
        { name: "Nimi", field: "nimi", sortable: true },
        { name: "Arvosteluja yht.", field: "numberOfReviews",  sortable: true},
        { name: "Keskiarvo", field: "averageOfReviews",  sortable: true},
        { name: "Ensi-ilta", field: "ensiIlta",  sortable: true}
    ];
    
    return (

        <Container fluid>

            <Row>
                <Col className="pb-3">
                    <h4>{`Tietokannassa yhteensä ${itemsOverAll} elokuvaa`}</h4>
                </Col>
            </Row>

            <Row>
                <Col>
                
                    <Table striped bordered hover>

                        <TableHeader
                            onSorting = {onSorting}
                            headers={headers}
                        />

                        <tbody>
                                
                            {
                                movies.map((item, index) => {

                                    let pmv = `${item.day} ${item.date}.${item.month}.${item.year}`;

                                    return(
                                        <tr key={item.id}>
                                            <th scope="row1">
                                                {index + 1}
                                            </th>
                                            <td>{item.nimi}</td>
                                            <td>{item.numberOfReviews}</td>
                                            <td>{item.averageOfReviews}</td>
                                            <td>{pmv}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody> 

                    </Table>

                </Col>
            </Row>

        </Container>

    );
}

export default TablePresentation;