export const spotifySearch = (state = {}, action) => {

    switch (action.type) {

        case 'SEARCH_ARTIST':
            return { ...state, 'search_artist': action.payload }

        case 'SEARCH_SONG':
            return { ...state, 'search_song': action.payload }

        default:
            return state;
    }
}