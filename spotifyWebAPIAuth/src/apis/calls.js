import axios from 'axios';

const mocky =  axios.create({
        baseURL: 'http://www.mocky.io/v2'
});


const restApi = axios.create({
        baseURL: 'http://localhost:3001'
});

const spotifyApi = axios.create({
        baseURL: 'https://api.spotify.com/v1'
});
   
export { mocky, restApi, spotifyApi };