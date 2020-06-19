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
 * Haetaan luettelo elokuvien luokitteluissa käytetyistä genreistä
 */
const getGenreList = () => {
    const request = axios.get(`${baseUrl}api/genres`);

    return request.then(response => {

        const x = response.data.map((r,i) => {
            return {
                name: r,
                active: false,
                id: i
            }
        })

        console.log("- getGenreList status", response.status);

        return x
    })
}

/*
 * Haetaan kaikki kantaan tallennetut elokuvat
 * -https://mighty-harbor-98163.herokuapp.com/api/movies
 */
const getMovieListing = () => {

    const request = axios.get(`${baseUrl}api/movies?include=general`);

    return request.then(response => {

        console.log("- getFrontPageMovies status", response.status);

        return response.data
    })
}

export default { 
    getGenreList,
    getFrontPageMovies,
    getMovieListing
}