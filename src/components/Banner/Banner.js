import React from 'react';

import './banner.css';

/*
 * Etusivulla tulostettava koko sivun täyttävä Banner-kuva
 */
const Banner = (props) => {

    return (
        <div id="banner">
            <h1>Tähtisadetta</h1>
            <h3>Katsaus ammattikriitikkojen antamiin elokuva-arvosteluihin</h3>
        </div>	       
    );
}

export default Banner;