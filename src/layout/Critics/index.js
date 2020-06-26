import React, {useState,useEffect, useMemo} from 'react';

import movieService from '../../services/movies';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {TableHeader, Pagination, Search} from '../../components/DT'
import useFullPageLoader from "../../hooks/useFullPageLoader";

import './critics.css';

const Critics = () => {

    const [items, setItems] = useState({

        loading: true,
        critcs: [],
        error: false
    
    });

    const [loader, showLoader, hideLoader] = useFullPageLoader();

    /*
     * Ladataan genre-luettelo
     */
    const fetchItems= () => {

        showLoader();

        movieService.getCriticsSummary()
            .then(critcs => {

                console.log(critcs)
                hideLoader();

                const newItems = {
                    ...items,
                    critcs: critcs,
                    loading: false
                }

                setItems(newItems);

            })
            .catch(err => {
                
                hideLoader();

                const newItems = {
                    ...items,
                    error: true,
                    loading: false
                }

                setItems(newItems);
            })

    }



    useEffect(() => {
        fetchItems();
    }, [])

    /*
     * <Banner />
     */
    return (

        <Container fluid>
            <Row>
                <Col xs={2}>2 of 3 (wider)</Col>
                <Col>3 of 3</Col>
            </Row>
            {loader}
        </Container>

    );
}

export default Critics;