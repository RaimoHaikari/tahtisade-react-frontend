import React, { Component } from 'react';
import FrontPageMovieCard from './FrontPageMovieCard/FrontPageMovieCard'

/*
        <div className="container-fluid">

            <div className="row justify-content-center">
                {
                    frontPageMovies.map((movie, index) => {
                   
                        return(
                            <div key={movie.id} className="col-auto mb-3">
                                <Card key={movie.id} id={movie.id} nimi={movie.nimi} kuva={movie.img} />
                            </div>
                        )
                    })
                }

            </div>
        </div>
 */
/*
<div className="card" key={movie.id}>
  <div className="card-body">
    This is some text within a card body.
  </div>
</div>
*/
const Cards = ({frontPageMovies}) => {

    return(
        <>
            {
                frontPageMovies.map((movie, index) => {
                
                    return(
                        <FrontPageMovieCard key={movie.id} />
                    )
                })
            }
        </>
    )

}

export default Cards;