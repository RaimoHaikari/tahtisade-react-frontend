import axios from 'axios'

const baseUrl = 'https://mighty-harbor-98163.herokuapp.com/'

/*
 * Desimaalifunktion pyöristämisessä käyettävä apufunktio
 *
 * Lähde:
 * ---------------------------------------------------------------------------------------------
 * How do you round to 1 decimal place in Javascript?
 * https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
 */
const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

var days = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];

/*
 * Keskiarvon laskeva funktio
 *
 * Lähde:
 * 
 * How to compute the sum and average of elements in an array?
 * - https://stackoverflow.com/questions/10359907/how-to-compute-the-sum-and-average-of-elements-in-an-array
 */
const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

const getComments = () => {
    const request = axios.get(`https://jsonplaceholder.typicode.com/comments`);

    return request.then(response => {

        console.log("- getComments status", response.status);

        return response.data;
    })
}


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
                active: true,
                id: i
            }
        })

        console.log("- getGenreList status", response.status);

        return x
    })
}



/*
 * Haetaan yhteenveto arvostelijoiden antamista tähdistä
 */
const getCriticsSummary = () => {
    const request = axios.get(`${baseUrl}api/reviews?include=general`);

    return request.then(response => {

        const x = response.data.map((r,i) => {

            return {
                ...r,
                starsAverage: round(r.starsAverage, 2)
            }

        })

        console.log("- getCriticsSummary status", response.status);
        return x;

    })
}

/*
 * Haetaan luettelo elokuvien luokitteluissa käytetyistä genreistä
 */
const getGenreSummary = () => {

    const request = axios.get(`${baseUrl}api/genres?include=general`);

    return request.then(response => {

        const x = response.data.map((r,i) => {

            return {
                ...r,
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
 * round(r.starsAverage, 2)
 */
const getMovieListing = () => {

    const request = axios.get(`${baseUrl}api/movies?include=general`);

    return request.then(response => {

        console.log("- getMoviePageMovies status", response.status);
        console.log(response.data);

        const x = response.data.map((r,i) => {

            return {
                ...r,
                numberOfReviews: r.stars.length, 
                averageOfReviews: (r.stars.length===0?0:round(average( r.stars),2)),
                id: i,
                ensiIlta: new Date(r.ensiIlta),
                month: (new Date(r.ensiIlta).getMonth() + 1),
                year: new Date(r.ensiIlta).getFullYear(),
                date: new Date(r.ensiIlta).getDate(),
                day: days[new Date(r.ensiIlta).getDay()]
            }

        })

        return x
    })
}

export default { 
    getComments,
    getGenreList,
    getCriticsSummary,
    getGenreSummary,
    getFrontPageMovies,
    getMovieListing
}