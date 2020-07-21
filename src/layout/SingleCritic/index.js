import React, {useState, useEffect, useMemo}  from 'react';

import {useParams} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SettingsHolder from "../Accordion"
import ComparisonList from "../../components/SingleCritic/comparisonList";
import ReviewsTable from "../../components/SingleCritic/reviewsTable";

import criticService from '../../services/critics';

import './singleCritic.css';

const SingleCritic = () => {

    const [data, setData] = useState({

        status: "loading",
        reviewerWithShardItems: [],
        reviews: []

    });

    /*
     * Mitä muut ovat antatneet samoille elokuville
     */ 
    const defaultCompsetId = "muutKriitikot";
    const [compset, setCompset] = useState([])




    const [sorting, setSorting] = useState({field: "", order: ""})

    /*
     * Kritiikkien taulukkomuotoinen esittäminen
     */ 
    const ITEMS_PER_PAGE = 20;

    const headers = [
        { name: "No#", field: "id", sortable: false },
        { name: "Elokuva", field: "elokuvanNimi", sortable: true },
        { name: "Tähdet", field: "stars", sortable: true },
        { name: "Lähde", field: "link", sortable: false }
    ]


    let critcId = useParams().id;

    /*
     * Ladataan arvosteluista koottu yhteenveto
     */
    const fetchCriticData = () => {


        criticService.getReviewerData(critcId)
            .then(critcData => {

                console.log(critcData)

                /*
                 * Liitetään oletusvertailusetti, eli mitä muut olivat keskimäärin
                 * antaneet niille elokuville, joita aktiivinen kriitikko oli 
                 * arvostellut.
                 */
                setCompset(compset.concat({
                    id: defaultCompsetId,
                    reviews: critcData.defCompSet
                }));

                setData({
                    status: "ready",
                    reviews: critcData.reviews,
                    reviewerWithShardItems: critcData.reviewerWithShardItems                    
                })


            })
            .catch(err => {

                console.log("ei onnistunut")

            })

    }

    const fetchCompData = (compId) => {
  
        criticService.getCompData(critcId, compId)
            .then(critcData => {

                console.log(critcData)

                /*
                 * Liitetään oletusvertailusetti, eli mitä muut olivat keskimäärin
                 * antaneet niille elokuville, joita aktiivinen kriitikko oli 
                 * arvostellut.
                 
                setCompset(compset.concat({
                    id: defaultCompsetId,
                    reviews: critcData.defCompSet
                }));

                */



            })
            .catch(err => {

                console.log("ei onnistunut")

            })      
    }

    /*
     *
     */
    const reviews = useMemo(() => {

        let computedReviews = data.reviews;

        if(sorting.field){

            const reversed = sorting.order === "asc" ? 1 : -1;

            computedReviews = computedReviews.sort((a,b) => {

                let val;

                switch (sorting.field) {
                    case "elokuvanNimi":            
                      val = reversed * a[sorting.field].localeCompare(b[sorting.field])
                      break;
                    default:
                      val = reversed * (a[sorting.field] - b[sorting.field]);
                  }

                return(val)
            })  

        }

        return computedReviews;

    }, [data.reviews, sorting])

    /*
     * myArray.map(function(e) { return e.hello; }).indexOf('stevie');
     */
    const selectCompHandler = (val) => {
        // Löytyykö entuudestaan

        let x = compset
            .map(c => c.id)
            .indexOf(val);

        if(x !== 0) {
            console.log("Pitäs hakea täydennystä");
            fetchCompData(val)
        }
    }

    /*
     * Arvostelut sisältävän taulukon lajittelu

     const [sorting, setSorting] = useState({field: "", order: ""})
     */
    const tableSortingHandler = (field, order) => {
        setSorting({field, order});
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

                <Col className="tahtisade-singleCritic-col">
                    <ReviewsTable 
                        headers= {headers}
                        reviews= {reviews}
                        sortHandler = {tableSortingHandler}
                    />
                </Col>

                <Col xs={2} className="tahtisade-singleCritic-col">3 of 3</Col>
            </Row>
        </Container>
    );
}

export default SingleCritic;