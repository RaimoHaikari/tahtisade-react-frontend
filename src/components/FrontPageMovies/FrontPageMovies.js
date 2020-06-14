import React, {useState, useEffect}  from 'react';

import FrontPageMovieDetails from '../FrontPageMovieDetails';
import Backdrop from '../Backdrop/Backdrop';

import FrontPageMovieCard from '../FrontPageMovieCard/FrontPageMovieCard'
import movieService from '../../services/movies';

import './frontPageMovies.css';

/*
 * Etusivulla tulostettava listaus uusimmista elokuvista.
 */
const FrontPageMovies = (props) => {

    const [items, setItems] = useState({
        message: '',
        loading: true,
        movies: [],
        activeMovie: null,
        error: false,
        phase: 'loading',
        showModal: false
    });

    const backdropClickHandler = () => {
        const newItems = {
            ...items,
            showModal: false,
            activeMovie: null
        };

        setItems(newItems); 
    }

    const iconClickHandler = (googleID) => {    

        const newItems = {
            ...items,
            showModal: true,
            activeMovie: items.movies.filter(movie => movie.googleID === googleID)[0]
        };

        setItems(newItems); 
    }


    /*
     * Haetaan uusimmat elokuvat palvelimelta
     *
     * - HUOM. Ny napataan talteen kolme ekaa...
     */
    const fetchItems = async () => {
        movieService
            .getFrontPageMovies()
            .then(data => {


                const newItems = {
                    ...items,
                    phase: 'ready',
                    loading: false,
                    movies: data
                };

                setItems(newItems);

            })
            .catch(err => {

console.log("......... e r r o r ........");
console.log("statusText: ", err.response.statusText);
console.log("error: ",err.response.data.error);
console.log("............................");

                const newItems = {
                    ...items,
                    loading: false,
                    phase: 'error',
                    message: 'Aineiston lukeminen epäonnistui.',
                    error: true
                };

                setItems(newItems);              
            })
    }
    
    /* 
     * Ladataan etusivulla esitettävä aineisto palvelimelta
     */
    useEffect(() => {
        fetchItems();
    }, []);

    /*
     * Valitaan mitä tulostetaan riippuen siitä:
     * - ollaanko hakemassa aineistoa
     * - tulostamassa aineistoa
     * - tulostamassa virheilmoitusta 
     */
    const printContent = () => {

        switch(items.phase) {

            case 'loading':
                return (<p>Ladataan</p>)
                break;
            case 'ready':
                return printMovieCardsContainer();
                break;
            case 'error':
                return (<p>Tapahtui virhe</p>)
                break;               
            default:
            // code block
        } 
    }

    /*
     * - Kun showModal on true, on myös activeMovie asetettu
     */
    const printMovieCardsContainer = () => {

        return (
            <div className="container fbContainer">

                {items.showModal === true && <Backdrop click={backdropClickHandler}/>}
                {items.showModal === true && <FrontPageMovieDetails 
                    title={items.activeMovie?items.activeMovie.nimi:''}
                    ensiIlta={items.activeMovie?items.activeMovie.ensiIlta:''}
                    />
                }

                <div className="row fbRow">
                    {printFrontPageMovieCards(items.movies.slice(0,3))}
                </div>
                <div className="row fbRow">
                    {printFrontPageMovieCards(items.movies.slice(3,6))}
                </div>

            </div>
        )

    }

    /*
     * Tulostetaan etusivulla näytettävät uusimpien elokuvien kuvakkeet
     */
    const printFrontPageMovieCards = (m) => {

        return(
            m.map((movie) => {

                return (

                    <FrontPageMovieCard
                        iconClick={iconClickHandler} 
                        kuva={movie.img} 
                        nimi={movie.nimi}
                        id={movie.googleID}
                        key={movie.id} 
                        
                    />
                )

            })
        )
    }

    return (
        <section>

                { printContent() }

        </section>
    );
}

export default FrontPageMovies;