import React from 'react';

import mrJones from '../assets/mrJones.jpg';

const Banner = () => {

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-3 text-right pt-4">
                    <h1>Daily Tuition</h1>
                    <p>Learn with Us!</p>
                </div>

                <div className="col-1"></div>

                <div className="col-8">
                    <img className="img-fluid pl-2 py-2" src={mrJones} alt="Meester Jones" />
                </div>
            </div>
        </div>
    );
}

export default Banner;