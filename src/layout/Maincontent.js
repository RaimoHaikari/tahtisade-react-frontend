import React from 'react';

import aikaJonkaSain from '../assets/aikaJonkaSain.jpg';
import laBelleEpoque from '../assets/laBelleEpoque.jpg';

const MainContent = () => {

    return (
        <div className="container">
            <div className="row">

                {/* Left Sidebar */}
                <div className="col-3 border-2 bcolor">
                    <div className="w-100 text-center p-4">
                        <h5 className="p-2">Vetävä otsikko</h5>
                        <img className="img-fluid mt-3" src={aikaJonkaSain} alt="Aika jonka sain" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-6">
                    <div className="border-2 p-2 px-4">
                        <h4>Kumpi ompi parempi, Tampere vai Helsinki?</h4>
                        <img className="img-fluid" src={laBelleEpoque} alt="Kyllä Turku on parempi" />
                        <p className="p-2">Muutossokeudella tarkoitetaan ilmiötä, että emme havaitse kaikkia näkökentässämme tapahtuvia muutoksia. Jotain uutta saattaa ilmestyä, jokin saattaa vaihtaa paikkaa tai poistua, emmekä huomaa muutosta. Esimerkkinä kirjassa kerrotaan mm. koejärjestelystä, jossa koehenkilöille näytettiin kuvamateriaalia kahden ihmisen ravintolakeskustelusta, jonka aikana keskustelijoiden vaatetuksessa tai ruokailuvälineissä tapahtui muutoksia koehenkilöiden näitä kuitenkaan huomaamatta.</p>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="col-3 border-2 bcolor">

                    <div className="w-100 text-center p-1">
                        <h5 className="p-2 border-bt text-danger">
                            Urho N. Voltti
                        </h5>
                    </div>

                    <div className="mt-1">
                        <h5 className="border-2">Recent</h5>
                        <div className="d-flex flex-column p-2 mt-3">


                            <div className="d-flex flex-row">
                                <img className="img-fluid w-50" src={laBelleEpoque} alt="Kyllä Turku on parempi" />
                                <p>Kauppias esitti päivän rajun tarjouksen.</p>
                            </div>

                            <div className="d-flex flex-row mt-3">
                                <img className="img-fluid w-50" src={laBelleEpoque} alt="Kyllä Turku on parempi" />
                                <p>Kauppias esitti päivän rajun tarjouksen.</p>
                            </div>

                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
}

export default MainContent;