import React, {useState, useEffect}  from 'react';

import {useParams} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SettingsHolder from "../Accordion"
import ComparisonList from "../../components/SingleCritic/comparisonList";

import criticService from '../../services/critics';

import './singleCritic.css';

const SingleCritic = () => {

    const [data, setData] = useState({

        status: "loading",
        reviewerWithShardItems: []

    });


    let critcId = useParams().id;

   /*
     * Ladataan arvosteluista koottu yhteenveto
     */
    const fetchCriticData = () => {


        criticService.getReviewerData(critcId)
            .then(critcData => {

                console.log(critcData)

                setData({
                    status: "ready",
                    reviewerWithShardItems: critcData.reviewerWithShardItems                    
                })


            })
            .catch(err => {

                console.log("ei onnistunut")

            })

    }

    /*
     * 
     */
    const selectCompHandler = (val) => {
        console.log("Pitäs näyttää: ", val)
    }

    useEffect(() => {
        fetchCriticData();
    }, [])

    return (
        <Container className="tahtisade-singleCritic-container">
            <Row className="tahtisade-singleCritic-row">

                <Col xs={2} className="tahtisade-singleCritic-col">
                    <SettingsHolder>
                        <ComparisonList 
                            clickHandler = {selectCompHandler}
                            data = {data.reviewerWithShardItems}
                        />
                    </SettingsHolder>
                </Col>

                <Col className="tahtisade-singleCritic-col">2 of 3</Col>

                <Col xs={2} className="tahtisade-singleCritic-col">3 of 3</Col>
            </Row>
        </Container>
    );
}

export default SingleCritic;