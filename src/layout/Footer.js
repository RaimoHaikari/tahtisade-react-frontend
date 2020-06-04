import React from 'react';

const Footer = () => {

    return (
        <footer>
            <div className="container p-5 black border-2">
                <div className="row">

                    <div className="col-4">
                        <div className="d-flex flex-column">
                            <h5 className="white">NewsLetter</h5>
                        </div>                       
                    </div>


                    <div className="col-4">
                        <div className="d-flex flex-column p-3 border-2 white">
                            <h5 className="white">Categories</h5>
                            <ul>
                                <li>Maanantai</li>
                                <li>Tiista-i</li>
                                <li>Ke-skiviikko</li>
                            </ul>
                        </div>                       
                    </div>  

                    <div className="col-4">
                        <div className="d-flex flex-column">
                            <h5 className="white">Contact Us</h5>
                        </div>                       
                    </div>                 

                </div>
            </div>
        </footer>
    );
}

export default Footer;