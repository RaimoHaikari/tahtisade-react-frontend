import React  from 'react';

import './pagination.css';

const Pagination = ({moviesPerPage, totalMovies, paginate, currentPage}) => {

    let pageNumbers = [];

 console.log("Auki sivu", currentPage)   

    for(let i = 1; i <= Math.ceil(totalMovies/moviesPerPage); i++){
        pageNumbers.push(i);
    }

  



    /*
            <a href="#">&laquo;</a>
            <a href="#">1</a>
            <a href="#" class="active">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a href="#">&raquo;</a>
     */
    return (
        <div className="mListPagination">
            {
                pageNumbers.map(number => {
                   return(
                    <a 
                        className={number===currentPage && 'active'}
                        href={void(0)} 
                        onClick={() => paginate(number)} 
                        key={number}
                    >
                        {number}
                    </a>
                   )
                })
            }
        </div>
    );
}

export default Pagination;