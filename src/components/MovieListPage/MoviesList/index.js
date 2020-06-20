import React  from 'react';

import MoviesPageMovieCard from '../MoviesPageMovieCard'
import movieService from '../../../services/movies';


import './movieList.css';

const MovieList = ({loadingPhase, movies}) => {

    /*
    const getVisibleMovies = () => {
        console.log("-----------------------")
        console.log(genres);
        console.log(movies);
        console.log("......... A C T I V E .........,..")

        const activeGenres =  genres
            .filter(genre => genre.active === true)
            .map(ac => ac.name)

        console.log(activeGenres);

        console.log("------------ M O V I E S-----------")

        const activeMovies = movies.filter((movies) => {

            const gList = movies.genre;
            const found = gList.some(g => activeGenres.indexOf(g) >= 0)
        
        
            return found;
        
        }) 

        console.log(activeMovies);
    }
    */

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