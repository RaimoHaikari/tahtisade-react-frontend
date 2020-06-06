import axios from 'axios'

const baseUrl = 'https://mighty-harbor-98163.herokuapp.com/'

/*
 * Haetaan etusivulla esitettävä listaus uusimmista elokuvista
 * - https://mighty-harbor-98163.herokuapp.com/api/movies?include=latest
 */
const getFrontPageMovies = () => {

    const request = axios.get(`${baseUrl}api/movies?include=latest`);

    return request.then(response => {

        console.log("- getFrontPageMovies status", response.status);

        return response.data
    })
}

/*
 * Haetaan kaikki kantaan tallennetut elokuvat
 * -https://mighty-harbor-98163.herokuapp.com/api/movies
 */
const getMovieListing = () => {

    const request = axios.get(`${baseUrl}api/movies`);

    return request.then(response => {

        console.log("- getFrontPageMovies status", response.status);

        return response.data
    })
}

export default { 
    getFrontPageMovies,
    getMovieListing
}