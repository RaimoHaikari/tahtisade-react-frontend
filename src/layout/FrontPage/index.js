import React from 'react';

import Banner from '../../components/Banner/Banner';
import FrontPageMovies from '../../components/FrontPageMovies/FrontPageMovies';

import './frontPage.css';

const FrontPage = () => {

    /*
     * <Banner />
     */
    return (
        <>
            <Banner />
            <FrontPageMovies />
        </>
    );
}

export default FrontPage;