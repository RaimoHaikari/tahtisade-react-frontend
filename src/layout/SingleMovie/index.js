import React, {useState, useEffect}  from 'react';
import {useParams} from "react-router-dom";

import movieService from '../../services/movies';

import useFullPageLoader from "../../hooks/useFullPageLoader";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MoviePageMovieCard from '../../components/MoviePageMovieCard'

const SingleMovie = () => {

    let movieId = useParams().id;

    const [movie, setMovie] = useState({

        status: "loading",
        data: []

    });

    
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    /*
     * Ladataan arvosteluista koottu yhteenveto
     */
    const fetchMovieData = () => {

        showLoader();

        movieService.getMovieData(movieId)
            .then(movieData => {

                console.log(movieData)
                hideLoader();

                const newMovie = {
                    ...movie,
                    status: "ready",
                    data: movieData
                }

                setMovie(newMovie);

            })
            .catch(err => {

                hideLoader();

                const newMovie = {
                    ...movie,
                    status: "error",
                }

                setMovie(newMovie);
            })

    }

    useEffect(() => {
        fetchMovieData();
    }, [])

    const switchLayout = () => {

        switch(movie.status) {
            case "loading":

                return (
                    <p>Ladataan</p>
                );
                
                break;
            case "error":

                return (
                    <p>Virhe</p>
                );

                break;

            default:
                return (
                    <MoviePageMovieCard
                        genret={movie.data.genres}
                        imdb={movie.data.imdb}
                        kavi={movie.data.kavi}
                        ensiIlta={movie.data.ensiIlta} 
                        paiva={movie.data.day}
                        kuva={movie.data.img}
                        nimi={movie.data.nimi}
                        nayttelijat={movie.data.actors}
                        ohjaajat={movie.data.directors}
                        jakelijat={movie.data.distributors}
                        arvostelut={movie.data.reviews}
                    />
                );

          } 

    }
    

    return(
        <Container>
            {switchLayout()}
            {loader}
        </Container>
    )
}

export default SingleMovie;