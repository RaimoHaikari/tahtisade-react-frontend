import React, {useState,useEffect, useMemo} from 'react';

import movieService from '../../services/movies';

import './genres.css';

import {TableHeader, Pagination, Search} from '../../components/DT'


const Genres = () => {

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const ITEMS_PER_PAGE = 5;

    const headers = [
        { name: "No#", field: "id", sortable: false },
        { name: "Nimi", field: "genre", sortable: true },
        { name: "Keskiarvo", field: "numberOfMovies", sortable: true },
        { name: "Elokuvien määrä", field: "numberOfReviews", sortable: false },
        { name: "Arvostelujen määrä", field: "starsAverage", sortable: false }
    ];

    const [genres, setGenres] = useState({

        loading: true,
        genres: [],
        error: false
        
    })

    /*
     * Pitäisi jotenkin nopeuttaa isojen aineistojen käsittelyä 
     * - toimii cachena
     */
    const genresData = useMemo(() => {
        let computedGenres = genres.genres;

        if(search) {

            computedGenres = computedGenres.filter(

               genre => genre.genre.toLowercase().includes(search.toLowerCase()) 
            )

        }

        setTotalItems(computedGenres.length)

        return computedGenres.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );

    }, [genres.genres, currentPage, search])


    /*
     * Ladataan genre-luettelo
     */
    const fetchGenres = () => {

        movieService.getGenreSummary()
            .then(gnrs => {

                console.log(gnrs)

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
     * <CoinTable sortBy={sortHandler} data={genres.genres} />
     */
    return (
        <>
            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">

                    <div className="row">

                        <div className="col-md-6">

                            <Pagination 
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />

                        </div>

                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Search 
                                onSearch={(value) => {
                                    setSearch(value)
                                    setCurrentPage(1)
                                }}
                            />
                        </div>
                    </div>

                    <table className="table table-striped">

                        <TableHeader 
                            headers={headers}
                        />

                        <tbody>

                        {
                            genresData.map(g => {
                                return(
                                    <tr key={g.id}>
                                        <th scope="row1">
                                            {g.id}
                                        </th>
                                        <td>{g.genre}</td>
                                        <td>{g.numberOfMovies}</td>
                                        <td>{g.numberOfReviews}</td>
                                        <td>{g.starsAverage}</td>
                                    </tr>
                                )
                            })
                        }

                        </tbody>

                    </table>

                </div>
            </div>
        </>
    );
}

/*
    const headers = [
        { name: "No#", field: "id", sortable: false },
        { name: "Nimi", field: "genre", sortable: true },
        { name: "Keskiarvo", field: "numberOfMovies", sortable: true },
        { name: "Elokuvien määrä", field: "numberOfReviews", sortable: false },
        { name: "Arvostelujen määrä", field: "starsAverage", sortable: false }
    ];

*/

export default Genres;