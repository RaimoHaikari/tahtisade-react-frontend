import React, {useState,useEffect, useMemo} from 'react';

import movieService from '../../services/movies';

import './genres.css';
import {TableHeader, Pagination, Search} from '../../components/DT'


const Genres = () => {

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({field: "", order: ""})


    const ITEMS_PER_PAGE = 10;

    /*
     * { name: "No#", field: "id", sortable: false },
     */
    const headers = [
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

        // Lajittelu
        if(sorting.field){

            const reversed = sorting.order === "asc" ? 1 : -1;

            computedGenres = computedGenres.sort((a,b) => {

                let val;

                switch (sorting.field) {
                    case "genre":
                      val = reversed * a[sorting.field].localeCompare(b[sorting.field])
                      break;
                    default:
                      val = reversed * (a[sorting.field] - b[sorting.field]);
                  }

                return(val)
            })

        }

        return computedGenres.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );

    }, [genres.genres, currentPage, search, sorting])




    /*
     * Ladataan genre-luettelo
     */
    const fetchGenres = () => {

        movieService.getGenreSummary()
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
     * <CoinTable sortBy={sortHandler} data={genres.genres} />

                                         <tr key={g.id}>
                                        <th scope="row1">
                                            {g.id}
                                        </th>
                                        <td>{g.genre}</td>
                                        <td>{g.starsAverage}</td>
                                        <td>{g.numberOfMovies}</td>
                                        <td>{g.numberOfReviews}</td>
                                    </tr>

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
                            onSorting = {(field, order) => setSorting({field, order})}
                            headers={headers}
                        />

                        <tbody>

                        {
                            genresData.map(g => {
                                return(
                                    <tr key={g.id}>
                                        <th scope="row1">{g.genre}</th>
                                        <td>{g.starsAverage}</td>
                                        <td>{g.numberOfMovies}</td>
                                        <td>{g.numberOfReviews}</td>
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


export default Genres;