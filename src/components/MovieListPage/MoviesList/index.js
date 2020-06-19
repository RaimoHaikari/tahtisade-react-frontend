import React, {useState, useEffect}  from 'react';

import MoviesPageMovieCard from '../MoviesPageMovieCard'
import movieService from '../../../services/movies';


import './movieList.css';

const MovieList = () => {

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
            .getMovieListing()
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
                return printMoviesPageMovieCards();
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
    const printMoviesPageMovieCards = () => {
        return(

            items.movies.map((movie) => {

                return (
                    <MoviesPageMovieCard 
                        key={movie.id} 
                        nimi={movie.nimi} 
                        kuva={movie.img} 
                        ensiIlta={movie.ensiIlta} 
                        id={movie.googleID}
                    />
                )
            })

        )
    }

    /*
     * 
     */
    return (
        <section>
            <div className="container">
                <div className="row">
                    { printContent() }
                </div>
            </div>
        </section>
    );
}

export default MovieList;