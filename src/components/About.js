import React, {useState} from 'react';
import '../App.css';

import FrontPageMovieDetails from './FrontPageMovieDetails';
import Backdrop from './Backdrop/Backdrop';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


/*
         <Sivupohja>
            Hei
        </Sivupohja>
 */
const About = (props) => {

    const [state, setState] = useState({
        showModal: false
    });

    const iconClickHandler = () => {    
        setState({showModal: true})
    }

    const backdropClickHandler = () => {
        setState({showModal: false})
    }

    return(
        <>
            <FontAwesomeIcon 
                onClick={iconClickHandler}
                icon="info-circle" 
                size="2x" 
                style={{color: "red", margin: "10px"}}
            />
            {state.showModal === true && <Backdrop click={backdropClickHandler}/>}
            {state.showModal === true && <FrontPageMovieDetails title="Näkemiiin Neuvostoliitto" />}
        </>
    )
}

export default About;