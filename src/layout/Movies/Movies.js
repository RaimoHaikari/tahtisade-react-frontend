import React, {useState,useEffect, useMemo} from 'react';

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import useFullPageLoader from "../../hooks/useFullPageLoader";

import TablePresentation from "../../components/MovieListPage/TablePresentation";
import {Pagination, Search} from '../../components/DT';

import MovieList from '../../components/MovieListPage/MoviesList';

import SettingsHolder from "../Accordion"
import Settings from "../../components/MovieListPage/Settings"

import movieService from '../../services/movies';

import './movies.css';

const Movies = () => {

    const [genres, setGenres] = useState({

        loading: true,
        genres: [],
        error: false
        
    })

    const [items, setItems] = useState({
        message: '',
        loading: true,
        allTheMovies: [],
        error: false,
        phase: 'loading'
    });

    const [totalItems, setTotalItems] = useState(0);
    const [moviesPerPage, setMoviesPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sorting, setSorting] = useState({field: "", order: "asc"});
    const [itemsPerPage, setItemsPerPage] = useState(20);

    const [loader, showLoader, hideLoader] = useFullPageLoader();


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

                hideLoader();

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
        .map((m) => m.googleID)

        return activeMovies;
    }


    /*
     * Vaihdetaan elokuvakuvakkeita esittävää sivua
     */
    const paginate = (number) => {
        setCurrentPage(number);
    }


    useEffect(() => {

        showLoader();

        fetchGenres();
        fetchItems();
        
    }, [])

   /* 
     * Tulostettavan aineiston suodatus
     *
     * useMemo
     * - Pitäisi jotenkin nopeuttaa isojen aineistojen käsittelyä 
     * - toimii cachena
     * 
     */
    const itemsData = useMemo(() => {

        let computedMovies = items.allTheMovies;

        /*
         * päivitetään näkyvyys Genre-määritysten ostalta
         */
        const genreFiltered = getActiveMovies();
        //setVisibleMovies();

        computedMovies = computedMovies.filter(item => genreFiltered.includes(item.googleID));


        /*
         * Haku kohdistuu nimeen.
         item => item.name.toLowercase().includes(search.toLowerCase()) 
         */
        if(search) {

            computedMovies = computedMovies.filter(item => {

                return (
                    item.nimi.toLowerCase().includes(search.toLowerCase()) 
                )

            })

        }

        // Lajittelu
        if(sorting.field){

            const reversed = sorting.order === "asc" ? 1 : -1;

            computedMovies = computedMovies.sort((a,b) => {

                let val;

                switch (sorting.field) {
                    case "name":
                      val = reversed * a[sorting.field].localeCompare(b[sorting.field])
                      break;
                    default:
                        val =  reversed * ((a[sorting.field] > b[sorting.field]) ? 1 : (a[sorting.field] < b[sorting.field]) ? -1 : 0)
                  }

                return(val)
            })

        }

        // - näytettävien objektien kokonaismäärä
        setTotalItems(computedMovies.length)

        return computedMovies.slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage
        );

    }, [items, genres, sorting, currentPage, search])


    /*
     *
     */
    return (
        <Container className="tahtisade-container">

            <Row>

                <Col>

                    <Row>
                        <Col>
                            <Pagination 
                                total={totalItems}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </Col>

                        <Col>
                            <Search 
                                onSearch={(value) => {
                                    setSearch(value)
                                    setCurrentPage(1)
                                }}
                            />
                        </Col>

                        <Col>
                            {search.length !== 0 && <span className="searchMsg">{`Hakuehdon täyttää ${totalItems} elokuvaa`}</span>}
                        </Col>
                    </Row>
                </Col>

            </Row>

            <Row>

                <Col xs={2}>
                    <SettingsHolder>
                        <Settings
                            toggle = {(val) => btnToggleGenresHandler(val)} 
                            click = {(id) => chkBoxHandler(id) }
                            genres = {genres.genres}
                        />
                    </SettingsHolder>
                </Col>

                <Col>

                    <Tabs className="movies-page-tabs" defaultActiveKey="home" id="movies-page-tab">
                    
                        <Tab eventKey="home" title="Taulukko" className="movies-page-tab">

                            <TablePresentation
                                itemsOverAll = {items.allTheMovies.length}
                                totalItems = {totalItems} 
                                itemsPerPage = {itemsPerPage}
                                setSearch = {setSearch}
                                setCurrentPage = {setCurrentPage}
                                currentPage = {currentPage}
                                search={search}
                                onSorting = {(field, order) => setSorting({field, order})}
                                movies = {itemsData}
                            />

                        </Tab>



                        <Tab eventKey="profile" title="Kuvakkeet" className="movies-page-tab">
                            <MovieList
                                itemsOverAll = {items.allTheMovies.length}
                                totalItems = {totalItems} 
                                itemsPerPage = {itemsPerPage}
                                setCurrentPage = {setCurrentPage}
                                setSearch = {setSearch}
                                search={search}
                                currentPage = {currentPage}
                                movies = {itemsData}
                                loadingPhase = {items.phase}
                            />
                        </Tab>


                    </Tabs>
                
                </Col>
            </Row>
            {loader}
        </Container>
    );
}

export default Movies;