import React  from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MoviesPageMovieCard from '../MoviesPageMovieCard'
import {TableHeader, Pagination, Search} from '../../DT';

import movieService from '../../../services/movies';


import './movieList.css';

/*
                                total={totalItems}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}

{movies, itemsOverAll, totalItems, itemsPerPage, currentPage, onSorting, search, setSearch, setCurrentPage}
*/

const MovieList = ({movies, itemsOverAll, totalItems, itemsPerPage, search, currentPage, setCurrentPage, setSearch, loadingPhase}) => {


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
                        avg={movie.averageOfReviews} 
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
        <section>
            <div className="container">
                <div className="row">
                { printContent() }
                </div>
            </div>
        </section> 
     */
    return (
        <Container fluid>
            <Row>
                { printMoviesPageMovieCards() }
            </Row>
        </Container>
    );
}

export default MovieList;