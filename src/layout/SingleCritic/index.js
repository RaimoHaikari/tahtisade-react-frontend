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

import Basics from "../../components/D3/Basics"
import CurvedLineChart from "../../components/D3/CurvedLineChart";
import BarChart from "../../components/D3/BarChart";
//import Donut from "../../components/D3/Donut";

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
        reviews: [],
        name: ""
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
     * Osuudet kuinka monelle elokuvalle:
     * - aktiivinen kriitittko on antanut paremman arvosanan
     * - vertailussa oleva kriitikko on antanut paremman arvosanan..
     */
    const [shares, setShares] = useState([
        {val: "Parempi", lkm: 0, ids:[]},	// Arvostelia antoi paremman arvosanan kuin...
        {val: "Sama", lkm: 0, ids:[]},
        {val: "Huonompi", lkm: 0, ids:[]}       
    ])

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
     * D3 BarChart data....
     */
    const [bcData, setBcData] = useState([25,30,45,60,10,65,75])

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

                console.log(critcData);
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
                    reviewerWithShardItems: getUpdatedCompList(defaultCompsetId, critcData.reviewerWithShardItems),
                    name: critcData.reviewerData.name           
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

                setData({
                    ...data,
                    reviewerWithShardItems: getUpdatedCompList(compId)
                })

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
     * Karsitaan aktiivisen kriitikon elokuva listalle ne elokuvat, joita myös
     * vertailussa mukana oleva kriitikko on arvostellut
     * 
     * @param revs aktiivisen arvostelijan antamat arvosanat. 
     *             Siltä varalta, että listaa olisi jo suodatettu
     *             välitetään vallitseva tilanne parametrinä
     */
    const getMoviesReviewedByBoth = (revs) => {
        // - yhteiset elokuvat
        const sharedMovies = getCompset();

        // - yhteisten elokuvien id-tunnukset
        const sharedIds = sharedMovies.map(d => d.googleID);

        // - tiputetaan aktiiviselta riitikolta "ylimääräiset elokuvat pois"
        let prunedRevs = revs.filter(r => sharedIds.includes( r.googleID));

        // - liitetään vertailtavan kriitikon antamat arvosanat mukaan
        var merged = _.merge(_.keyBy(prunedRevs, 'googleID'), _.keyBy(sharedMovies, 'googleID'));

        return _.values(merged);
    }

    /*
     * Lasketaan taulukko, kuinka monelle elokuvalle arvostelija / vertailussa oleva kriitikko 
     * on antanut paremman arvosana.
     * data.reviews, sorting, compset, headers
     */
    const foobar = useMemo(() => {

        let osuudet = [
            {val: "Parempi", lkm: 0, ids:[]},	// Arvostelia antoi paremman arvosanan kuin...
            {val: "Sama", lkm: 0, ids:[]},
            {val: "Huonompi", lkm: 0, ids:[]}       
        ]


        /*
         * - elokuvat, jotka ovat myös vertailussa oleva arvostelija on arvostellut
         */
         if(compset.length > 0) {
            let movies = getMoviesReviewedByBoth(data.reviews);

            
            for(var i = 0; i < movies.length; i++){

                let filmId = movies[i].googleID;
                
                let compGrade = Number(movies[i].compStars);
                let actGrade = Number(movies[i].stars);
                
                //compGrade = Math.floor(compGrade) + Math.ceil(compGrade % 1)/2;
                //actGrade = Math.floor(actGrade) +  Math.ceil(actGrade % 1)/2;
                
                if(actGrade > compGrade){
                    osuudet[0].ids.push(filmId);
                    osuudet[0].lkm += 1; 
                }
                else if(actGrade < compGrade){
                    osuudet[2].ids.push(filmId);
                    osuudet[2].lkm += 1;
                }
                else {
                    osuudet[1].ids.push(filmId);
                    osuudet[1].lkm += 1;
                }
            }

         }

        return osuudet;

    }, [data.reviews, compset]);

    const getShares = () => {

        let osuudet = [
            {val: "Parempi", lkm: 0, ids:[]},	// Arvostelia antoi paremman arvosanan kuin...
            {val: "Sama", lkm: 0, ids:[]},
            {val: "Huonompi", lkm: 0, ids:[]}       
        ]

        let movies = getMoviesReviewedByBoth(data.reviews);

        for(var i = 0; i < movies.length; i++){

            let filmId = movies[i].googleID;
            
            let compGrade = Number(movies[i].compStars);
            let actGrade = Number(movies[i].stars);
            
            //compGrade = Math.floor(compGrade) + Math.ceil(compGrade % 1)/2;
            //actGrade = Math.floor(actGrade) +  Math.ceil(actGrade % 1)/2;
            
            if(actGrade > compGrade){
                osuudet[0].ids.push(filmId);
                osuudet[0].lkm += 1; 
            }
            else if(actGrade < compGrade){
                osuudet[2].ids.push(filmId);
                osuudet[2].lkm += 1;
            }
            else {
                osuudet[1].ids.push(filmId);
                osuudet[1].lkm += 1;
            }
        }

        return osuudet;
    }

    /*
     * Päivitetään vertailulista nimet
     * - vertailtavan active -ominaisuus saa arvon true,
     *   kun muilla em. ominaisuus on false
     */
    const getUpdatedCompList = (val, list=null) => {

        let n = list === null?data.reviewerWithShardItems:list;

        n = n
            .map(d =>  {
                return({
                    ...d,
                    active: d.id===val?true:false
                })

            })

        return n;
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
            computedReviews = getMoviesReviewedByBoth(computedReviews)
            /*
            // - yhteiset elokuvat
            const sharedMovies = getCompset();

            // - yhteisten elokuvien id-tunnukset
            const sharedIds = sharedMovies.map(d => d.googleID);

            // - tiputetaan aktiiviselta riitikolta "ylimääräiset elokuvat pois"
            computedReviews = computedReviews.filter(r => sharedIds.includes( r.googleID));

            // - liitetään vertailtavan kriitikon antamat arvosanat mukaan
            var merged = _.merge(_.keyBy(computedReviews, 'googleID'), _.keyBy(sharedMovies, 'googleID'));
            computedReviews = _.values(merged);
            */
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

        // Löytyykö entuudestaan
        if(x !== 0) {
            fetchCompData(val)
        }
        else {
            setActiveCompId(val);
            setHeaders(getUpdatedHeaders(val));

            setData({
                ...data,
                reviewerWithShardItems: getUpdatedCompList(val)
            })
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
                    <>

                <h3>{data.name}</h3>

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
    
                    <Col xs={4} className="tahtisade-singleCritic-col">
                        <BarChart 
                            data={bcData}
                        />

                    </Col>
                </Row>   

</>
                )
        }

    }

    /*
     * 
                         <Donut 
                            osuudet = {foobar}
                        />

     
     Arvostelut sisältävän taulukon lajittelu



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