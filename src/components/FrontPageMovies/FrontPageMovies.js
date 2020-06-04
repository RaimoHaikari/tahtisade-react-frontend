import React, {useState, useEffect}  from 'react';

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
        error: false,
        phase: 'loading'
    });


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
                return printFrontPageMovieCards();
                break;
            case 'error':
                return (<p>Tapahtui virhe</p>)
                break;               
            default:
            // code block
        } 
    }

    /*
     * Tulostetaan etusivulla näytettävät uusimpien elokuvien kuvakkeet
     */
    const printFrontPageMovieCards = () => {
        return(
            items.movies.map((movie) => {
                return (
                    <FrontPageMovieCard
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