import React from 'react';

import './drawerToggleButton.css';

const DrawerToggleButton = (props) => {

    return (
        <button className="toggleButton" onClick={props.click}>
            <div className="toggleButtonLine"></div>
            <div className="toggleButtonLine"></div>
            <div className="toggleButtonLine"></div>
        </button>
    );
}

export default DrawerToggleButton;