import React, {useState, useEffect, useMemo}  from 'react';

import _ from 'lodash';
import merge from 'lodash/merge';
import keyBy from 'lodash/keyBy';
import values from 'lodash/values';

import {useParams} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SettingsHolder from "../Accordion"
import ComparisonList from "../../components/SingleCritic/ComparisonList";
import ReviewsTable from "../../components/SingleCritic/reviewsTable";

import Clapper from "../../components/Shared/clap";

import useFullPageLoader from "../../hooks/useFullPageLoader";

import criticService from '../../services/critics';

import './singleCritic.css';

const SingleCritic = () => {

    /*
     * Mitä muut ovat antatneet samoille elokuville,
     * keneen vertaillaan
     */ 
    const defaultCompsetId = "muutKriitikot";

    const [activeCompId, setActiveCompId] = useState(defaultCompsetId);

    const [data, setData] = useState({

        status: "loading",
        reviewerWithShardItems: [],
        reviews: []
    });


    const [compset, setCompset] = useState([])

    /*
     * Taulukon otsikkosarake
     */
    const [headers, setHeaders] = useState([
        { name: "No#", field: "id", sortable: false },
        { name: "Elokuva", field: "elokuvanNimi", sortable: true },
        { name: "Tähdet", field: "stars", sortable: true },
        { name: "Lähde", field: "link", sortable: false },
        { name: "Muut", field: "compStars", sortable: true },
    ])

    /*
     * Talukossa esitettävien arvostelujen lajittelu
     */
    const [sorting, setSorting] = useState({field: "", order: ""})

    /*
     * Latausanimaatio
     */
    const [loader, showLoader, hideLoader] = useFullPageLoader();



    /*
     * dummy-muuttuja, jonka avulla saadaan sisältö päivittymään tilanteessa,
     * jossa vertailuun haetan sellaisen kriitkon aineisto, joka löytyy muistista
     * jo entuudestaan.
     */
    const [counter, setCounter] = useState(0);

    /*
     * Kritiikkien taulukkomuotoinen esittäminen
     */ 
    const ITEMS_PER_PAGE = 20;

    let critcId = useParams().id;

    /*
     * Ladataan arvosteluista koottu yhteenveto
     */
    const fetchCriticData = () => {

        showLoader();

        criticService.getReviewerData(critcId)
            .then(critcData => {

                console.log(critcData.reviewerWithShardItems);
                hideLoader();

                /*
                 * Liitetään oletusvertailusetti, eli mitä muut olivat keskimäärin
                 * antaneet niille elokuville, joita aktiivinen kriitikko oli 
                 * arvostellut.
                 */
                setCompset(compset.concat({
                    id: defaultCompsetId,
                    reviews: critcData.defCompSet
                }));

                critcData.reviewerWithShardItems = critcData.reviewerWithShardItems.map(r => {
                    return({
                        ...r,
                        active: false
                    })
                })

                setData({
                    /* status: "ready",*/
                    reviews: critcData.reviews,
                    reviewerWithShardItems: critcData.reviewerWithShardItems                    
                })


            })
            .catch(err => {

                hideLoader();

                setData({
                    ...data,
                    status: "error",
                })

            })

    }

    /*
     * Vertailuun valitun kriitikon dataa ei vielä löydy,
     * haetaan se palvelimelta.
     */
    const fetchCompData = (compId) => {

        showLoader();
  
        criticService.getCompData(critcId, compId)
            .then(critcData => {

                hideLoader();

                setActiveCompId(compId);

                setCompset(compset.concat({
                    id: compId,
                    reviews: Object.values(critcData)
                }));

                setHeaders(getUpdatedHeaders(compId));
            })
            .catch(err => {

                hideLoader();

                console.log(err.response)

            })      
    }


    /*
     * Palatutetaan vertailussa esitettävät arvostelut
     * - nimetään samalla stars -ominaisuus uudelleen, koska
     *   aktiivinen arvostelusetti sisältää samannimisen
     *   muuttuja.
     * 
     */
    const getCompset = () => {

        let val = [];

        if(compset.length > 0 ){
            val = compset
                .filter(c => c.id === activeCompId)[0].reviews
                .map(m => {
                    return {
                      googleID: m.googleID,
                      compStars: m.stars
                    }
                  })
        }

        return val;

    }

    /*
     * Arvosanat listaavan otsikkorivi päivitettynä vertailuun valitun kriitikon 
     * nimellä.
     */
    const getUpdatedHeaders = (val) => {

        let n = data.reviewerWithShardItems
            .filter(d => d.id === val)[0].name;

        let h = headers.map(h => {
            if(h.field === "compStars"){
                return {
                    ...h,
                    name: n
                }
            }

            return h;
        })

        return h;
    }


    /*
     *
     */
    const reviews = useMemo(() => {

        let computedReviews = data.reviews;

        /*
         * - elokuvat, jotka ovat myös vertailussa oleva arvostelija on arvostellut
         */
         if(compset.length > 0) {

            // - yhteiset elokuvat
            const sharedMovies = getCompset();

            // - yhteisten elokuvien id-tunnukset
            const sharedIds = sharedMovies.map(d => d.googleID);

            // - tiputetaan aktiiviselta riitikolta "ylimääräiset elokuvat pois"
            computedReviews = computedReviews.filter(r => sharedIds.includes( r.googleID));

            // - liitetään vertailtavan kriitikon antamat arvosanat mukaan
            var merged = _.merge(_.keyBy(computedReviews, 'googleID'), _.keyBy(sharedMovies, 'googleID'));
            computedReviews = _.values(merged);
         }

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

    }, [data.reviews, sorting, compset, headers]);



    /*
     * myArray.map(function(e) { return e.hello; }).indexOf('stevie');
     */
    const selectCompHandler = (val) => {

        let x = compset
            .map(c => c.id)
            .indexOf(val);

        let n = data.reviewerWithShardItems
            .filter(d => d.id === val)[0]

        // Löytyykö entuudestaan
        if(x !== 0) {
            fetchCompData(val)
        }
        else {
            setActiveCompId(val);
            setHeaders(getUpdatedHeaders(val));
        }
    }

    /*
     * Valitaan tilan mukaan mitä tulostetaan.
     */
    const switchLayout = () => {

        switch(data.status){

            case "loading":
                return(

                    <Row>
                        <Col className="singleMovie-col">
                            <Clapper />
                        </Col>
                    </Row>

                )
            break;
            default:
                return(

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

                )
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
            {switchLayout()}
            {loader}
        </Container>
    );
}

export default SingleCritic;