import { spotifyApi } from "../apis/calls";
import { alertActions } from "./alert.action";
import history from '../history';

const accessToken = window.accessToken;

const options = {
    headers: {
        'Authorization': 'Bearer ' + accessToken
    }
}

export const fetchNewReleases = () => async dispatch => {

    dispatch({type:'_REQUEST'})

    await spotifyApi.get('/browse/new-releases?country=US', options)
                    .then(response => {
                        dispatch({type:'_SUCCESS'});
                        dispatch({ type: 'NEW_RELEASES', payload: response.data.albums });
                    })
                    .catch(error => {
                        //console.log(error);
                        dispatch({type:'_FAILURE'});
                    })
}

export const fetchArtist = artistId => async dispatch => {

    dispatch({type:'_REQUEST'})

    await spotifyApi.get(`/artists/${artistId}`, options)
                    .then(response => {
                        dispatch({type:'_SUCCESS'});
                        dispatch({ type: 'ARTIST_INFO', payload: response.data });
                    })
                    .catch(error => {
                        //console.log(error);
                        dispatch({type:'_FAILURE'});
                    })
}

export const fetchArtistTopTracks = artistId => async dispatch => {

    dispatch({type:'_REQUEST'})

    await spotifyApi.get(`/artists/${artistId}/top-tracks?country=US`, options)
                    .then(response => {
                        //console.log(response);
                        dispatch({type:'_SUCCESS'});
                        dispatch({ type: 'ARTIST_TOP_TRACKS', payload: response.data.tracks });
                    })
                    .catch(error => {
                        //console.log(error);
                        dispatch({type:'_FAILURE'});
                    })
}

export const fetchArtistAlbums = artistId => async dispatch => {

    dispatch({type:'_REQUEST'})

    await spotifyApi.get(`/artists/${artistId}/albums?include_groups=album`, options)
                    .then(response => {
                        //console.log(response);
                        dispatch({type:'_SUCCESS'});
                        dispatch({ type: 'ARTIST_ALBUMS', payload: response.data.items });
                    })
                    .catch(error => {
                        //console.log(error);
                        dispatch({type:'_FAILURE'});
                    })
}

export const fetchArtistAppearsON = artistId => async dispatch => {

    dispatch({type:'_REQUEST'})

    await spotifyApi.get(`/artists/${artistId}/albums?include_groups=appears_on`, options)
                    .then(response => {
                        //console.log(response);
                        dispatch({type:'_SUCCESS'});
                        dispatch({ type: 'ARTIST_APPEARSON', payload: response.data.items });
                    })
                    .catch(error => {
                        //console.log(error);
                        dispatch({type:'_FAILURE'});
                    })
}


export const fetchCategories = () => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.get('/browse/categories', options)
        .then(response => {
            //console.log(response);
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'CATEGORIES', payload: response.data.categories.items });
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const fetchCategoriesDetails = (category_id) => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.get(`/browse/categories/${category_id}/playlists`, options)
        .then(response => {
            //console.log(response);
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'CATEGORIES_DETAILS', payload: response.data.playlists.items });
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const fetchRecommendations = () => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.get('/recommendations?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=70', options)
        .then(response => {
            //console.log(response.data.tracks);
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'RECOMMENDATION', payload: response.data.tracks });
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const fetchGenres = () => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.get('/recommendations/available-genre-seeds', options)
        .then(response => {
            //console.log(response);
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'GENRES', payload: response.data.genres });
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const fetchFeaturedPlaylists = () => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.get('/browse/featured-playlists', options)
        .then(response => {
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'FEATURED_PLAYLISTS', payload: response.data.playlists.items });
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const fetchPlayListDetails = id => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.get(`/playlists/${id}`, options)
        .then(response => {
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'PLAYLIST_DETAIL', payload: response.data });
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const fetchAlbum = id => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.get(`/albums/${id}`, options)
        .then(response => {
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'ALBUM', payload: response.data });
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const addSongToUserPlaylists = (playlist_id, songs) => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.post(`/playlists/${playlist_id}/tracks`, songs, options)
        .then(response => {
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'USER_PLAYLISTS', payload: response.data });
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const followArtists = (artistId) => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.put(`me/following?type=artist&ids=${artistId}`, {}, options)
        .then(response => {
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'FOLLOWING', payload: [true] });
            //console.log(response);
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const checkIfFollowingArtist = (artistId) => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.get(`me/following/contains?type=artist&ids=${artistId}`, options)
        .then(response => {
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'FOLLOWING', payload: response.data });
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const removefollowArtists = (artistId) => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.delete(`me/following?type=artist&ids=${artistId}`, options)
        .then(response => {
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'FOLLOWING', payload: [false] });
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const fetchMyPlaylists = () => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.get(`me/playlists`, options)
        .then(response => {
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'MY_PLAYLIST', payload: response.data.items });
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}

export const fetchFollowingArtists = () => async dispatch => {

    dispatch({ type: '_REQUEST' })

    await spotifyApi.get(`me/following?type=artist`, options)
        .then(response => {
            dispatch({ type: '_SUCCESS' });
            dispatch({ type: 'FOLLOWING_ARTISTS', payload: response.data.artists.items });
        })
        .catch(error => {
            //console.log(error);
            dispatch({ type: '_FAILURE' });
        })
}