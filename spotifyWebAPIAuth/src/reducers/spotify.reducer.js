export const spotify = (state = {}, action) => {

    switch(action.type) {

        case 'NEW_RELEASES':
            return {...state, 'new_releases': action.payload }

        case 'ARTIST_INFO':
            return { ...state, 'artist_info': action.payload }    

        case 'ARTIST_TOP_TRACKS':
            return { ...state, 'artist_topTracks': action.payload }   

        case 'ARTIST_ALBUMS':
            return { ...state, 'artist_albums': action.payload }    
        
        case 'ARTIST_APPEARSON':
            return { ...state, 'artist_appearson': action.payload }    
        
        case 'RECOMMENDATION':
            return { ...state, 'recommendation': action.payload }    
        
        case 'FEATURED_PLAYLISTS':
            return { ...state, 'featured_playlist': action.payload }    
        
        case 'CATEGORIES':
            return { ...state, 'categories': action.payload }  

        case 'STARTED_PLAYING':
            return { ...state, 'playing': [action.payload] }    

        case 'CATEGORIES_DETAILS':
            return { ...state, 'featured_Categories': action.payload }    
        
        case 'PLAYLIST_DETAIL':
            return { ...state, 'playlist_detail': action.payload }   

        case 'ALBUM':
            return { ...state, 'album': action.payload }       
        
        case 'USER_PLAYLISTS':
            return { ...state, 'user-playlists': action.payload }       

        default: 
            return state;
    }

}