import { spotifyApi } from '../apis/calls';
import history from '../history';

const accessToken = window.accessToken;

const options = {
    headers: {
        'Authorization': 'Bearer ' + accessToken
    }
}


export const searchArtist = artistName => async dispatch => {

    dispatch({ type: 'REQUEST' })

    await spotifyApi.get(`/search?q=${artistName}*&type=artist&limit=5`, options)
        .then(response => {
            console.log(response);
            dispatch({ type: 'SUCCESS' });
            dispatch({ type: 'SEARCH_ARTIST', payload: response.data.artists.items });
        })
        .catch(error => {
            console.log(error);
            dispatch({ type: 'FAILURE' });
        })
}

export const searchSong = songName => async dispatch => {

    dispatch({ type: 'REQUEST' })

    await spotifyApi.get(`/search?q=${songName}&type=track&limit=5`, options)
        .then(response => {
            console.log(response);
            dispatch({ type: 'SUCCESS' });
            dispatch({ type: 'SEARCH_SONG', payload: response.data.tracks.items });
        })
        .catch(error => {
            console.log(error);
            dispatch({ type: 'FAILURE' });
        })
}
