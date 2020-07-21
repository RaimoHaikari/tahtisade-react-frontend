import axios from 'axios'

const baseUrl = 'https://mighty-harbor-98163.herokuapp.com/'

/*
 * http://localhost:3001/api/reviews/juhoTyppo?compId=kariSalminen
 */
const getReviewerData = (id) => {

    const request = axios.get(`${baseUrl}api/reviews/${id}`);

    return request.then(response => {

        console.log("- getReviewerData status", response.status);

        const data = response.data;

        return {
            ...data         
        }

    })
}

export default { 
    getReviewerData
}