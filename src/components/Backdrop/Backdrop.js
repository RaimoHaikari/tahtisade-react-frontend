import React from 'react';

import './backdrop.css';

/*
 * Komponentti, jonka avulla luodaan jonkin toimenpiteen ajaksi 
 * läpinäkyvä tausta, jonka avulla estetään muiden komponenttien
 * käyttö tilapäisesti.
 */
const Backdrop = (props) => {

    return (
        <div className="backdrop" onClick={props.click}></div>
    );
}

export default Backdrop;