import axios from 'axios'

const baseUrl = 'https://mighty-harbor-98163.herokuapp.com/'

/*
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
 */
const getFrontPageMovies = () => {

    const request = axios.get(`${baseUrl}api/movies`);

    return request.then(response => {

        console.log(response.status);

        return response.data
    })
}

export default { 
    getFrontPageMovies
}