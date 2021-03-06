export const nowPlaying = (state = {}, action) => {

    switch (action.type) {

        case 'STARTED_PLAYING':
            return { ...state, 'playing': action.payload.flag, 'id': action.payload.id }
        
        case 'NOW_PLAYING':
            return { ...state, 'now_playing': action.payload }
        
        case 'LOCAL_PLAYLIST':
            return { ...state, 'local_playlist': action.payload }

        default:
            return state;
    }

}