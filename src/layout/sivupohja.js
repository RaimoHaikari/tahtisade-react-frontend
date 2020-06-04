import React from 'react';

import Banner from './Banner';
import Maincontent from './Maincontent';
import Footer from './Footer';

import '../styles/sivupohjaStyles.css';


const Sivupohja = (props) => {

    return(
        <React.Fragment>
            <Banner />
            <Maincontent />
            <Footer />
        </React.Fragment>
    )

}

export default Sivupohja;