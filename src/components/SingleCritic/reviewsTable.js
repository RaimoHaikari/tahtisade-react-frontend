import React from 'react';
import {Link} from 'react-router-dom';

import {TableHeader, Pagination, Search} from '../DT';

import './reviewsTable.css';

const ReviewsTable = (({headers, reviews, sortHandler}) => {

    /*
     *  
     */
    return(
        
        <table className="table table-striped">

            <TableHeader 
                onSorting = {(field, order) => sortHandler(field, order)}
                headers = {headers}
            />

            <tbody>
            
            {   
                reviews.map((review, index) => {
                    return(
                        <tr key={review.googleID}>
                            <th scope="row1">
                                {index+1}
                            </th>
                            <td>
                                <Link to={`/elokuvat/${review.googleID}`}>{review.elokuvanNimi}</Link>
                            </td>
                            <td>{review.stars}</td>
                            <td>{review.link}</td>
                        </tr>
                    )
                })
            }

            </tbody>

        </table>
    )
});

export default ReviewsTable;