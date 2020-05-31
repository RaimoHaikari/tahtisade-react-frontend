import axios from 'axios'

const baseUrl = 'https://mighty-harbor-98163.herokuapp.com/'

/*
 * Haetaan etusivulla esitettävä listaus uusimmista elokuvista
 */
const getFrontPageMovies = () => {

    const request = axios.get(`${baseUrl}api/latestMovies`);

    return request.then(response => {

console.log(response.status);

        return response.data
    })
}

export default { 
    getFrontPageMovies
}