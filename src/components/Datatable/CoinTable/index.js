import React from 'react';

const CoinTable = ({data, sortBy}) => {

    /*
     * 
     */
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>
                        <button onClick={() => sortBy('name')}>
                            Nimi
                        </button>
                    </th>
                    <th>Keskiarvo</th>
                    <th>Elokuvien määrä</th>
                    <th>Arvostelujen määrä</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((d,i)=> {
                        return (
                            <tr key={d.id}>
                                <td>{i+1}</td>
                                <td>{d.genre}</td>
                                <td>{d.starsAverage}</td>
                                <td>{d.numberOfMovies}</td>
                                <td>{d.numberOfReviews}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

export default CoinTable;