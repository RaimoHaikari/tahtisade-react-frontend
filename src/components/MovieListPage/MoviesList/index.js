import React  from 'react';

import MoviesPageMovieCard from '../MoviesPageMovieCard'
import movieService from '../../../services/movies';


import './movieList.css';

const MovieList = ({loadingPhase, movies}) => {


   /*
     * Valitaan mitä tulostetaan riippuen siitä:
     * - ollaanko hakemassa aineistoa
     * - tulostamassa aineistoa
     * - tulostamassa virheilmoitusta 
     * 
     */
    const printContent = () => {

        switch(loadingPhase) {

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

            movies.map((movie) => {

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