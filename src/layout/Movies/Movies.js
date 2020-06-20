import React, {useState,useEffect} from 'react';

import Pagination from '../../components/MovieListPage/Pagination'

import MovieList from '../../components/MovieListPage/MoviesList';
import SideToolbar from '../../components/MovieListPage/SideToolbar'

import movieService from '../../services/movies';

import './movies.css';

const Movies = () => {

    const [genres, setGenres] = useState({

        loading: true,
        genres: [],
        error: false
        
    })

    // items.movies
    const [items, setItems] = useState({
        message: '',
        loading: true,
        allTheMovies: [],
        error: false,
        phase: 'loading'
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(10);

    let indexOfLastMovie = currentPage * moviesPerPage;
    let indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

    let filteredMovies;     // Suodatatetut elokuvat
    let visibleMovies;      // Aktiivisella sivulla näytettävät elokuvat

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
                    allTheMovies: data,
                    visibleMovies: data
                };

                setItems(newItems);

            })
            .catch(err => {


            debugger

console.log("......... e r r o r ........");
console.log("statusText: ", err.response.statusText);
console.log("error: ", err.response.data.error);
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
     * 1) erotetaan aktiivisena olevat genret
     * 2) poimitaan elokuvat, joiden genreluokittelut sisältyvät aktiivisten genrejen piiriin
     */
    const getActiveMovies = () => {

        const activeGenres =  genres.genres
            .filter(genre => genre.active === true)
            .map(ac => ac.name)

        const activeMovies = items.allTheMovies.filter((movies) => {

            const gList = movies.genre;
            const found = gList.some(g => activeGenres.indexOf(g) >= 0)
        
        
            return found;
        
        }) 

        return activeMovies;
    }

    /*
     * - valitaan elokuvalistalta ne, jotka näkyvät aktiivisella sivulla (pagination)
     */
    const getVisibleMovies = () => {

        const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie)
        return currentMovies;

    }

    /*
     * Vaihdetaan elokuvakuvakkeita esittävää sivua
     */
    const paginate = (number) => {
        setCurrentPage(number);
    }



    useEffect(() => {
        console.log('effect');

        fetchGenres();
        fetchItems();
        
    }, [])


    const updateMovieListToMatchSelectedGenres = () => {
        console.log("Pitäs päivittää elokuvalista...")
    }


    const setVisibleMovies = () => {

        filteredMovies = getActiveMovies();
        visibleMovies = getVisibleMovies();

    }

    setVisibleMovies();

    /*
     * 
     */
    return (
        <div className="container containerMovies">

            <div className="row rowTotalNumbOfMovies"> 
                <div className="col-3 colMovies"></div>
                <div className="col-9 colMovies">
                    <p className="summary">{`Yhteensä ${filteredMovies.length} elokuvaa`}</p>
                </div>
            </div>

            <div className="row rowPagination"> 
                <div className="col-3 colMovies"></div>
                <div className="col-9 colMovies">
                    <Pagination 
                        paginate={paginate}
                        moviesPerPage={moviesPerPage} 
                        totalMovies={filteredMovies.length} 
                    />
                </div>
            </div>

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
                    <MovieList 
                        movies = {visibleMovies}
                        loadingPhase = {items.phase}
                    />
                </div>   

            </div>
        </div>
    );
}

export default Movies;