import React, {useState, useEffect}  from 'react';
import {Link} from 'react-router-dom';

import movieService from '../services/movies';

import '../App.css';

function Home(){

    const [items, setItems] = useState({
        message: '',
        loading: true,
        movies: [],
        error: false,
        phase: 'loading'
    });


    const fetchItems = async () => {
        movieService
            .getFrontPageMovies()
            .then(data => {

                console.log(data);

                const newItems = {
                    ...items,
                    phase: 'ready',
                    loading: false,
                    movies: data
                };

                setItems(newItems);

            })
            .catch(err => {

console.log("......... e r r o r ........");
console.log("statusText: ", err.response.statusText);
console.log("error: ",err.response.data.error);
console.log("............................");

                const newItems = {
                    ...items,
                    loading: false,
                    phase: 'error',
                    message: 'Aineiston lukeminen epäonnistui.',
                    error: true
                };

                setItems(newItems);              
            })
    }
    
    /* 
     * Ladataan etusivulla esitettävä aineisto palvelimelta
     */
    useEffect(() => {
        fetchItems();
    }, []);

    const printContent = () => {

        switch(items.phase) {

            case 'loading':
                return (<p>Ladataan</p>)
                break;
            case 'ready':
                return (<p>Aineisto valmis esitettäväksi</p>)
                break;
            case 'error':
                return (<p>Tapahtui virhe</p>)
                break;               
            default:
            // code block
            } 

    }


    return(
        <div>
            <h1>Home Page</h1>
            { printContent() }
        </div>
			
    )
}

export default Home;