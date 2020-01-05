import { spotifyApi } from "../apis/calls";

export const playSong = id => async dispatch => {

    dispatch({ type: '_REQUEST' })

    const playerOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.playerToken
        }
    }

    const body = {
        'uris': [id]
    }

    
    await spotifyApi.put(`/me/player/play?device_id=${window.deviceId}`, body, playerOptions)
        .then(response => {
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'STARTED_PLAYING', payload: { 'flag': true, 'id': body.uris[0].split(':')[2] } });
        })
        .catch(error => {
            console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const getCurrentPlaying = () => async dispatch => {
        
        window.player.getCurrentState().then(response => {
            
            if (!response) {
            console.error('User is not playing music through the Web Playback SDK');
            return;
        }
        

        dispatch({ type: 'NOW_PLAYING', payload: response });
    });
}