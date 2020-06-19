import React, {useState,useEffect} from 'react';

import MovieList from '../components/MovieListPage/MoviesList';
import SideToolbar from '../components/MovieListPage/SideToolbar'

import movieService from '../services/movies';

import './movies.css';

const Movies = () => {

    const [genres, setGenres] = useState({

        loading: true,
        genres: [],
        error: false
        
    })

    /*
     * Ladataan genre-luettelo
     */
    const fetchGenres = () => {

        movieService.getGenreList()
            .then(gnrs => {

                const newGenres = {
                    ...genres,
                    genres: gnrs,
                    loading: false
                }

                setGenres(newGenres);

            })
            .catch(err => {
                const newGenres = {
                    ...genres,
                    error: true,
                    loading: false
                }

                setGenres(newGenres);
            })

    }

    useEffect(() => {
        console.log('effect');

        fetchGenres();
        
    }, [])


    /*
     * Vaihdetaan id-tunnuksen määrittämän genren näkyvyysasetus
     */
    const chkBoxHandler = (id) => {

        let gnrs = genres.genres.map((g) => {

            let a = (g.id === id ? !g.active : g.active);

            return {
                ...g,
                active: a
            }

        })

        const newGenres = {
            ...genres,
            genres: gnrs
        }

        setGenres(newGenres);     

    }

    /*
     * Pikavalintapainikkeet, joilla voidaan valita tai tyhjentää kerralla kaikki genret
     */
    const btnToggleGenresHandler = (checked) => {

        let gnrs = genres.genres.map((g) => {

            return {
                ...g,
                active: checked
            }

        })

        const newGenres = {
            ...genres,
            genres: gnrs
        }

        setGenres(newGenres);
    }

    const updateMovieListToMatchSelectedGenres = () => {
        console.log("Pitäs päivittää elokuvalista...")
    }

    /*
     * 
     */
    return (
        <div className="container containerMovies">

            <div className="row rowMovies">

                <div className="col-3 colMovies">
                    <SideToolbar 
                        title="Genret" 
                        data={genres}
                        click={chkBoxHandler}
                        btnClick={updateMovieListToMatchSelectedGenres}
                        toggleClick={btnToggleGenresHandler}
                    />
                </div>

                <div className="col-9 colMovies">
                    <MovieList />
                </div>   

            </div>
        </div>
    );
}

export default Movies;