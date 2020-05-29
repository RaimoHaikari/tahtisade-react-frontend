import React, { Component } from 'react';
import Card from './Card';

const Cards = ({frontPageMovies}) => {

    console.log(frontPageMovies)

    return(
        <div className="container-fluid d-flex justify-content-center">

            <div className="row">
                {
                    frontPageMovies.map((movie) => {
                        return(
                            <div key={movie.id} className="col-md-4">
                                <Card id={movie.id} nimi={movie.nimi} kuva={movie.img} />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )

}

export default Cards;