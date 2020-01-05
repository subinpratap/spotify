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

spotifyApi.interceptors.request.use(function (config) {
        //config.headers.Authorization = `Bearer ${window.accessToken}`; 
        //can use this function to add auth headers to outgoing requests instead of appending headers while making the requests
        return config
});
   
export { mocky, restApi, spotifyApi };