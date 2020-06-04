import React from 'react';

import Banner from '../components/Banner/Banner';
import FrontPageMovies from '../components/FrontPageMovies/FrontPageMovies';

import LatestMovies from '../components/LatestMovies';

import './frontPage.css';

const FrontPage = () => {

    /*
     * <Banner />
     */
    return (
        <>
            <FrontPageMovies />
        </>
    );
}

export default FrontPage;